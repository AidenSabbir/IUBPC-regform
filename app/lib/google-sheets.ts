import { google } from 'googleapis';

// Cached auth client for performance
let authClient: any = null;

async function getAuthClient() {
  if (authClient) return authClient;

  authClient = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return authClient;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function checkDuplicateStudentId(studentId: string): Promise<boolean> {
  const MAX_RETRIES = 3;
  let lastError: any;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const auth = await getAuthClient();
      const sheets = google.sheets({ version: 'v4', auth });

      // Fetch only column C (Student ID) - much faster than reading entire sheet
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!C:C', // Column C contains Student IDs
      });

      const values = response.data.values || [];

      // Skip header row (index 0) and check if studentId exists
      // values[0] = "Student ID" (header), values[1+] = actual student IDs
      const existingIds = values.slice(1).map(row => row[0]?.toString().trim());

      return existingIds.includes(studentId.trim());

    } catch (error: any) {
      lastError = error;

      const isRetryable =
        error.code === 429 ||
        error.code === 'RATE_LIMIT_EXCEEDED' ||
        (error.code >= 500 && error.code < 600) ||
        (error.errors && error.errors[0]?.reason === 'rateLimitExceeded');

      if (!isRetryable || attempt === MAX_RETRIES - 1) {
        console.error(`Error checking duplicate (Attempt ${attempt + 1}/${MAX_RETRIES}):`, error);
        throw error;
      }

      const delayMs = Math.pow(2, attempt) * 1000;
      console.log(`Retry duplicate check ${attempt + 1} after ${delayMs}ms`);
      await sleep(delayMs);
    }
  }

  throw lastError;
}

async function appendWithRetry(sheets: any, spreadsheetId: string, data: any) {
  const MAX_RETRIES = 3;
  let lastError: any;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [data],
        },
      });
    } catch (error: any) {
      lastError = error;

      const isRetryable =
        error.code === 429 ||
        error.code === 'RATE_LIMIT_EXCEEDED' ||
        (error.code >= 500 && error.code < 600) ||
        (error.errors && error.errors[0]?.reason === 'rateLimitExceeded');

      if (!isRetryable || attempt === MAX_RETRIES - 1) {
        throw error;
      }

      const delayMs = Math.pow(2, attempt) * 1000;
      await sleep(delayMs);
    }
  }

  throw lastError;
}

export async function appendToSheet(data: any) {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  // Background append for V2 (Fire and forget, suppresses errors)
  if (process.env.GOOGLE_SHEET_ID_V2) {
    appendWithRetry(sheets, process.env.GOOGLE_SHEET_ID_V2, data).catch((err) => {
      console.error('Error appending to V2 sheet:', err);
    });
  }

  // Primary append (Blocking, propagates errors)
  try {
    const response = await appendWithRetry(sheets, process.env.GOOGLE_SHEET_ID!, data);
    console.log(data);
    return response.data;
  } catch (error) {
    console.error('Error appending to primary sheet:', error);
    throw error;
  }
}
