# Mind Track 

Mind Track is a lightweight client-side mental health tracking web app built with plain HTML, CSS, and JavaScript. It provides several standard assessments, per-user dashboards, basic records management, and a simple custom-test feature for clinicians.

## What the project offers

- Pre-built assessments: GAD-7, PHQ-9, and PSS-10.
- Patient and doctor dashboards to review results and records.
- Ability to take built-in assessments and custom tests.
- Local/Supabase-backed data storage (uses `supabase-config.js` as the integration point).

## How it works (brief)

- Authentication: Users register or log in via `register.html` / `login.html`. Authentication is implemented client-side and can be wired to Supabase.
- Patients: From `patient-dashboard.html` patients can take assessments, view past results, and update their profile.
- Doctors: From `doctor-dashboard.html` doctors can view patient records, results, and create or manage custom tests.
- Assessments: Each assessment page (e.g., `assessment-pss10.html`) renders questions, calculates a score, and stores the result (locally or via Supabase depending on configuration in `supabase-config.js`).
- Custom tests: The doctor UI (`doctor-custom-tests.html`) lets clinicians create simple custom tests which patients can take via `take-custom-test.html`.

## Important pages and files

- `index.html` — Landing page
- `login.html` / `register.html` — Authentication UI
- `patient-dashboard.html` — Patient view
- `doctor-dashboard.html` — Doctor view
- `doctor-custom-tests.html` — Create/manage custom tests
- `take-custom-test.html` — Patient-facing custom test runner
- `assessment-pss10.html`, `assessment-phq9.html`, `assessment-gad7.html` — Assessment pages
- `js/` — JavaScript source files (core logic)
  - `assessments.js` — Assessment logic and scoring
  - `auth.js` — Login/register helpers
  - `patient.js` / `doctor.js` — Dashboard logic
  - `records.js` — Records + persistence helpers
  - `charts-logic.js` — Charting and visualization helpers
  - `supabase-config.js` — Supabase config placeholder (replace with your keys)
- `styles.css` / `css/styles.css` — Styling and layout

## Doctor credentials (test account)

Use the following test account to sign in as a doctor (for local/testing only):

- Email: **doc@test.com**
- Password: **123456**

These credentials are provided for convenience while developing or testing locally. Do not use them in production.

## Custom tests — quick explanation

- The doctor interface provides a simple form to define custom tests (questions and answer options).
- Custom tests are stored the same way as standard assessments (locally or in Supabase) and show up for patients to take via `take-custom-test.html`.
- Results from custom tests are recorded and viewable on dashboards and in the records pages.

## Deployment / Running locally

1. Using a static server (recommended for local testing).

   - Python 3 built-in server:

     ```bash
     cd "path/to/project"
     python -m http.server 5500
     # open http://localhost:5500 in your browser
     ```

   - Node `http-server` (install once):

     ```bash
     npm install -g http-server
     http-server -p 5500
     ```

   - VS Code: install the Live Server extension and open the workspace, then click "Go Live".


## Security & privacy

- This project currently uses test credentials and client-side logic for demonstration. Do not store or transmit real PHI (personal health information) with this demo without implementing proper authentication, encryption, and privacy safeguards.


This repository does not include a license file. Add an appropriate license if you plan to publish or redistribute the code.

