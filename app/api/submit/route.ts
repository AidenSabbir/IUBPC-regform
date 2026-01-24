import { NextRequest, NextResponse } from 'next/server';
import { fullRegistrationSchema } from '@/app/lib/validation';
import { appendToSheet, checkDuplicateStudentId } from '@/app/lib/google-sheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate data on server side
    const validationResult = fullRegistrationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validationResult.error.issues }, 
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check for duplicate Student ID
    const isDuplicate = await checkDuplicateStudentId(data.studentId);
    
    if (isDuplicate) {
      return NextResponse.json(
        { error: 'This Student ID has already been registered. Contact support if this is an error.' },
        { status: 409 }
      );
    }

    // Prepare row for Google Sheet
    // Order: Timestamp | Gender | Student ID | Name | Email | Phone | Facebook | Major | Semester | Skills
    const row = [
      data.timestamp,
      data.gender,
      data.studentId,
      data.name,
      data.email,
      `'${data.phone}`,
      data.facebook,
      data.major,
      data.semester,
      data.skills.join(', ')
    ];

    await appendToSheet(row);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Submission error:', error);
    
    // Provide more specific error messages
    const message = error.code === 429 || error.code === 'RATE_LIMIT_EXCEEDED'
      ? 'Too many registrations at once. Please try again in a moment.'
      : 'Failed to submit registration. Please try again.';
    
    return NextResponse.json(
      { error: message }, 
      { status: error.code === 429 ? 429 : 500 }
    );
  }
}
