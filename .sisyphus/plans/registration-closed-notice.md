# Registration Closed Notice

## TL;DR

> **Quick Summary**: Add a "Registration Closed" screen that displays when registration is disabled via an environment variable (`REG_STATUS=false`). When closed, users see only this notice with the IUBPC logo and social media links - no navigation, no splash screen, no access to the form.
> 
> **Deliverables**:
> - `RegistrationClosedScreen` component with retro pixel art styling
> - `REG_STATUS` environment variable in `.env.local`
> - Modified `RegistrationForm` to conditionally render based on registration status
> 
> **Estimated Effort**: Quick
> **Parallel Execution**: NO - sequential (3 dependent tasks)
> **Critical Path**: Task 1 → Task 2 → Task 3

---

## Context

### Original Request
Add a "Registration period is over please wait until further notice" message to the registration form. When registration is closed, users should see ONLY this notice - no navigation anywhere else, skip the splash screen entirely.

### Interview Summary
**Key Discussions**:
- **Message Text**: "Registration period is over please wait until further notice"
- **Display Location**: FIRST thing users see - before any other content
- **Navigation**: Completely blocked - users cannot go anywhere else
- **Splash Behavior**: SKIP splash entirely when closed - go directly to closed notice
- **Visual Design**: Match retro pixel art aesthetic (consistent with current design)
- **Branding**: YES - show IUBPC logo and club name
- **Social Media**: Facebook and Instagram ONLY (no Discord, no LinkedIn)
  - Facebook: https://www.facebook.com/iub.pc
  - Instagram: https://www.instagram.com/iub.pc

**Research Findings**:
- **Current Flow**: SplashScreen → StartScreen → Multi-step form (steps 0-7)
- **Entry Point**: `app/page.tsx` renders `RegistrationForm`
- **Control Logic**: All navigation is in `RegistrationForm.tsx` via `step` and `showSplash` states
- **Styling Patterns**: Existing components use cyan (#00FFFF), pixel borders, retro fonts
- **Social Pattern**: `SuccessScreen.tsx` has exact button pattern with `react-icons/fa`
- **Env File**: `.env.local` exists, currently has Google Sheets credentials

### Metis Review
**Identified Gaps** (addressed):
- **Environment variable exposure**: Next.js requires `NEXT_PUBLIC_` prefix for client-side access. Added to implementation approach.
- **Default value handling**: What if REG_STATUS is missing? Default to OPEN (true) to avoid accidentally locking out users.

---

## Work Objectives

### Core Objective
Add a registration closed notice that completely blocks access to the registration form when `NEXT_PUBLIC_REG_STATUS=false`.

### Concrete Deliverables
- New file: `app/components/registration/RegistrationClosedScreen.tsx`
- Modified: `.env.local` (add `NEXT_PUBLIC_REG_STATUS`)
- Modified: `app/components/RegistrationForm.tsx` (add closed check)

### Definition of Done
- [ ] When `NEXT_PUBLIC_REG_STATUS=false`: Users see ONLY RegistrationClosedScreen
- [ ] When `NEXT_PUBLIC_REG_STATUS=true` or missing: Normal registration flow
- [ ] Closed screen shows: IUBPC logo, club name, closed message, Facebook button, Instagram button
- [ ] No splash animation when registration is closed - immediate display
- [ ] Styling matches existing retro pixel art aesthetic (cyan accents, dark backgrounds)

### Must Have
- Message: "Registration period is over please wait until further notice"
- IUBPC logo displayed prominently
- Club name: "IUB PROGRAMMING CLUB"
- Facebook button linking to https://www.facebook.com/iub.pc
- Instagram button linking to https://www.instagram.com/iub.pc
- Complete navigation block (no access to any other screens)
- Environment variable control via `NEXT_PUBLIC_REG_STATUS`

### Must NOT Have (Guardrails)
- NO admin UI for toggling registration status (manual .env edit only)
- NO time-based automatic opening/closing
- NO email notifications about reopening
- NO Discord link (user explicitly excluded)
- NO LinkedIn link (user explicitly excluded)
- NO preview mode or partial form access
- NO splash screen animation when closed
- DO NOT modify Google Sheets integration or API routes
- DO NOT change existing form steps or validation

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.
> The executing agent DIRECTLY verifies using tools (Playwright, bash, etc.).

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: NO
- **Framework**: None
- **Agent-Executed QA**: YES (mandatory for all tasks)

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

All verification will be done by the agent using Playwright to open a browser, navigate, and verify the UI.

---

## Execution Strategy

### Sequential Execution

```
Task 1: Add REG_STATUS environment variable
    ↓
Task 2: Create RegistrationClosedScreen component
    ↓
Task 3: Modify RegistrationForm to conditionally render based on REG_STATUS
```

**No Parallel Execution**: Task 3 depends on both Tasks 1 and 2. Task 2 can technically run in parallel with Task 1, but the tight dependency chain makes sequential execution cleaner.

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3 | 2 (optional) |
| 2 | None | 3 | 1 (optional) |
| 3 | 1, 2 | None | None (final) |

### Agent Dispatch Summary

| Order | Task | Recommended Agents |
|-------|------|-------------------|
| 1 | Env Variable Setup | delegate_task(category="quick", load_skills=[]) |
| 2 | RegistrationClosedScreen | delegate_task(category="visual-engineering", load_skills=["frontend-ui-ux"]) |
| 3 | RegistrationForm Integration | delegate_task(category="quick", load_skills=["playwright"]) |

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info.

- [x] 1. Add REG_STATUS Environment Variable

  **What to do**:
  - Add `NEXT_PUBLIC_REG_STATUS=true` to `.env.local` file (line 5, after existing vars)
  - Use `NEXT_PUBLIC_` prefix so it's accessible on the client side in Next.js
  - Default value is `true` (registration open)
  - To close registration, change to `NEXT_PUBLIC_REG_STATUS=false`

  **Must NOT do**:
  - Do NOT modify existing environment variables
  - Do NOT create a separate .env file (use existing .env.local)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-line addition to an existing file - trivial change
  - **Skills**: `[]`
    - No special skills needed for env file edit

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2)
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Task 3
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `.env.local:1-4` - Existing environment variable format (key=value syntax)

  **Documentation References**:
  - Next.js env docs: `NEXT_PUBLIC_` prefix required for client-side access

  **WHY Each Reference Matters**:
  - `.env.local` shows the exact format to follow (no quotes around values)

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Verify REG_STATUS variable exists in env file
    Tool: Bash (cat/grep)
    Preconditions: None
    Steps:
      1. Read .env.local file
      2. Assert: File contains line starting with "NEXT_PUBLIC_REG_STATUS="
      3. Assert: Value is either "true" or "false"
    Expected Result: Environment variable properly configured
    Evidence: File content output

  Scenario: Verify Next.js can read the env variable
    Tool: Bash
    Preconditions: None
    Steps:
      1. Start dev server temporarily (or check next.config if present)
      2. The variable will be validated in Task 3's QA scenarios
    Expected Result: Variable accessible via process.env.NEXT_PUBLIC_REG_STATUS
    Evidence: Server starts without env-related errors
  ```

  **Commit**: YES
  - Message: `feat(config): add REG_STATUS environment variable for registration control`
  - Files: `.env.local`
  - Pre-commit: None (no tests)

---

- [x] 2. Create RegistrationClosedScreen Component

  **What to do**:
  - Create new file: `app/components/registration/RegistrationClosedScreen.tsx`
  - Component displays:
    - IUBPC logo (using existing `/iubpc.png`, same as SplashScreen/StartScreen)
    - Club name: "IUB PROGRAMMING CLUB" (same styling as StartScreen)
    - Message: "Registration period is over please wait until further notice"
    - Facebook button with FaFacebook icon (link: https://www.facebook.com/iub.pc)
    - Instagram button with FaInstagram icon (link: https://www.instagram.com/iub.pc)
  - Style to match retro pixel art aesthetic:
    - Dark background (bg-black or similar)
    - Cyan accents (#00FFFF) for message text
    - Use existing `PixelButton` component
    - Use existing font classes from other components
  - Full screen display (fixed inset-0 z-[100] like SplashScreen)
  - No interactivity beyond social media links

  **Must NOT do**:
  - Do NOT add Discord button
  - Do NOT add LinkedIn button
  - Do NOT add any navigation to other pages
  - Do NOT add any animation or "tap to continue" functionality
  - Do NOT add excessive decorations beyond logo/message/buttons

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component creation requiring styling to match existing aesthetic
  - **Skills**: `["frontend-ui-ux"]`
    - `frontend-ui-ux`: Needed for pixel art styling, visual consistency with existing design

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 1)
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 3
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References** (existing code to follow):
  - `app/components/registration/SplashScreen.tsx:22-46` - Full-screen overlay pattern with fixed inset-0 z-[100]
  - `app/components/registration/StartScreen.tsx:12-25` - Logo + club name layout pattern
  - `app/components/registration/SuccessScreen.tsx:31-53` - Social media button pattern with react-icons

  **API/Type References**:
  - `app/components/ui/PixelButton.tsx` - Button component API (variant="primary", className props)

  **External References**:
  - `react-icons/fa` - Already installed, use FaFacebook and FaInstagram

  **WHY Each Reference Matters**:
  - `SplashScreen.tsx` - Copy the full-screen overlay structure (fixed inset-0)
  - `StartScreen.tsx` - Copy the logo + club name styling exactly
  - `SuccessScreen.tsx` - Copy the social button pattern (shows exact icon usage with PixelButton)
  - `PixelButton.tsx` - Understand the component API for proper integration

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: RegistrationClosedScreen renders correctly in isolation
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:3000, temporarily import component directly
    Steps:
      1. Navigate to: http://localhost:3000 (with REG_STATUS=false set)
      2. Wait for: page load (timeout: 10s)
      3. Assert: IUBPC logo visible (img[alt="IUBPC Logo"])
      4. Assert: Text "IUB PROGRAMMING CLUB" visible
      5. Assert: Text "Registration period is over" visible (partial match)
      6. Assert: Facebook button visible with FaFacebook icon
      7. Assert: Instagram button visible with FaInstagram icon
      8. Assert: NO Discord button present
      9. Assert: NO LinkedIn button present
      10. Screenshot: .sisyphus/evidence/task-2-closed-screen.png
    Expected Result: Closed screen displays all required elements, excludes forbidden elements
    Evidence: .sisyphus/evidence/task-2-closed-screen.png

  Scenario: Social media links are correct
    Tool: Playwright (playwright skill)
    Preconditions: RegistrationClosedScreen rendered
    Steps:
      1. Find Facebook button/link element
      2. Assert: href contains "facebook.com/iub.pc"
      3. Find Instagram button/link element
      4. Assert: href contains "instagram.com/iub.pc"
    Expected Result: Links point to correct social media pages
    Evidence: DOM inspection output

  Scenario: No navigation elements present
    Tool: Playwright (playwright skill)
    Preconditions: RegistrationClosedScreen rendered
    Steps:
      1. Assert: No "START" button present
      2. Assert: No form inputs present
      3. Assert: No navigation arrows/buttons present (other than social)
      4. Assert: No "Tap anywhere" text present
    Expected Result: Only social media buttons are interactive
    Evidence: DOM inspection output
  ```

  **Commit**: YES
  - Message: `feat(registration): add RegistrationClosedScreen component with retro styling`
  - Files: `app/components/registration/RegistrationClosedScreen.tsx`
  - Pre-commit: None (no tests)

---

- [x] 3. Integrate Registration Status Check in RegistrationForm

  **What to do**:
  - Modify `app/components/RegistrationForm.tsx`:
    1. Import `RegistrationClosedScreen` at the top (line 6 area, with other registration imports)
    2. Read environment variable: `const isRegistrationOpen = process.env.NEXT_PUBLIC_REG_STATUS !== 'false'`
       - Note: Missing or "true" = OPEN, only explicit "false" = CLOSED
    3. Add conditional check BEFORE splash screen (around line 131):
       ```tsx
       // Check registration status first - before everything
       if (!isRegistrationOpen) {
         return <RegistrationClosedScreen />;
       }
       
       if (showSplash) {
         return <SplashScreen onComplete={() => setShowSplash(false)} />;
       }
       ```
  - This ensures:
    - When REG_STATUS=false: ONLY RegistrationClosedScreen shows (no splash, no form)
    - When REG_STATUS=true/missing: Normal flow (splash → start → form)

  **Must NOT do**:
  - Do NOT modify any existing step logic
  - Do NOT change form validation or submission
  - Do NOT modify API routes or Google Sheets integration
  - Do NOT change localStorage handling
  - Do NOT add admin UI or toggle buttons

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small, focused change - add import + conditional check
  - **Skills**: `["playwright"]`
    - `playwright`: Needed for comprehensive QA verification across both states

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (final task)
  - **Blocks**: None (final task)
  - **Blocked By**: Task 1 (env var), Task 2 (component)

  **References**:

  **Pattern References** (existing code to follow):
  - `app/components/RegistrationForm.tsx:129-133` - Current isLoaded and showSplash check pattern (add new check before these)
  - `app/components/RegistrationForm.tsx:5-15` - Import section pattern (add import in same style)

  **API/Type References**:
  - `process.env.NEXT_PUBLIC_REG_STATUS` - String value "true" or "false"

  **WHY Each Reference Matters**:
  - Line 129-133 shows the exact location to add the new check (before splash)
  - Import section shows the pattern for importing sibling components

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Registration CLOSED - shows only closed screen
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running with NEXT_PUBLIC_REG_STATUS=false
    Steps:
      1. Navigate to: http://localhost:3000
      2. Wait for: page load (timeout: 10s)
      3. Assert: Text "Registration period is over" visible
      4. Assert: IUBPC logo visible
      5. Assert: NO splash screen animation
      6. Assert: NO "Tap anywhere to enter" text
      7. Assert: NO "START" button
      8. Assert: Facebook button visible
      9. Assert: Instagram button visible
      10. Click anywhere on page (not on social buttons)
      11. Wait 2 seconds
      12. Assert: Page content unchanged (no navigation occurred)
      13. Screenshot: .sisyphus/evidence/task-3-closed-state.png
    Expected Result: Only closed screen visible, no navigation possible
    Failure Indicators: Splash screen appears, START button visible, form elements present
    Evidence: .sisyphus/evidence/task-3-closed-state.png

  Scenario: Registration CLOSED - social links work
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running with NEXT_PUBLIC_REG_STATUS=false
    Steps:
      1. Navigate to: http://localhost:3000
      2. Wait for: page load
      3. Right-click Facebook button → Get href attribute
      4. Assert: href is "https://www.facebook.com/iub.pc"
      5. Right-click Instagram button → Get href attribute
      6. Assert: href is "https://www.instagram.com/iub.pc"
    Expected Result: Social links point to correct URLs
    Evidence: DOM attribute values captured

  Scenario: Registration OPEN - normal flow works
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running with NEXT_PUBLIC_REG_STATUS=true (or not set)
    Steps:
      1. Navigate to: http://localhost:3000
      2. Wait for: page load (timeout: 10s)
      3. Assert: Splash screen visible (IUBPC logo with pulse animation)
      4. Assert: Text "Tap anywhere to enter" visible
      5. Click: anywhere on page
      6. Wait for: transition (1 second)
      7. Assert: Start screen visible (text "IUB PROGRAMMING CLUB" visible)
      8. Assert: "START" button visible
      9. Screenshot: .sisyphus/evidence/task-3-open-state.png
    Expected Result: Normal registration flow works - splash → start screen
    Failure Indicators: Closed screen appears, no splash animation
    Evidence: .sisyphus/evidence/task-3-open-state.png

  Scenario: Registration OPEN - can proceed through form
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running with NEXT_PUBLIC_REG_STATUS=true
    Steps:
      1. Navigate to: http://localhost:3000
      2. Click through splash screen
      3. Wait for: Start screen
      4. Click: "START" button
      5. Assert: Gender selection screen visible (step 1)
      6. Screenshot: .sisyphus/evidence/task-3-form-accessible.png
    Expected Result: Full form flow accessible when registration is open
    Evidence: .sisyphus/evidence/task-3-form-accessible.png

  Scenario: Missing REG_STATUS defaults to OPEN
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running with NEXT_PUBLIC_REG_STATUS removed from .env.local
    Steps:
      1. Navigate to: http://localhost:3000
      2. Wait for: page load
      3. Assert: Splash screen visible (NOT closed screen)
      4. Assert: Text "Tap anywhere to enter" visible
    Expected Result: Missing env var = registration open (safe default)
    Evidence: Visual confirmation of splash screen
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-3-closed-state.png - Closed screen when REG_STATUS=false
  - [ ] .sisyphus/evidence/task-3-open-state.png - Normal flow when REG_STATUS=true
  - [ ] .sisyphus/evidence/task-3-form-accessible.png - Form accessible when open

  **Commit**: YES
  - Message: `feat(registration): integrate REG_STATUS check to conditionally show closed notice`
  - Files: `app/components/RegistrationForm.tsx`
  - Pre-commit: None (no tests)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `feat(config): add REG_STATUS environment variable for registration control` | `.env.local` | File contains NEXT_PUBLIC_REG_STATUS |
| 2 | `feat(registration): add RegistrationClosedScreen component with retro styling` | `app/components/registration/RegistrationClosedScreen.tsx` | Component exists and renders |
| 3 | `feat(registration): integrate REG_STATUS check to conditionally show closed notice` | `app/components/RegistrationForm.tsx` | Playwright verification passes |

---

## Success Criteria

### Verification Commands
```bash
# Start dev server
npm run dev

# In another terminal, verify env file
grep "NEXT_PUBLIC_REG_STATUS" .env.local  # Should output the variable

# Component file exists
ls app/components/registration/RegistrationClosedScreen.tsx  # Should exist
```

### Final Checklist
- [ ] `NEXT_PUBLIC_REG_STATUS=false` → Only RegistrationClosedScreen visible
- [ ] `NEXT_PUBLIC_REG_STATUS=true` → Normal registration flow
- [ ] Missing `NEXT_PUBLIC_REG_STATUS` → Normal registration flow (default open)
- [ ] RegistrationClosedScreen shows: logo, club name, message, Facebook button, Instagram button
- [ ] RegistrationClosedScreen does NOT show: Discord, LinkedIn, START button, form inputs
- [ ] No splash animation when registration is closed
- [ ] Social media links work correctly
- [ ] All existing functionality preserved when registration is open
