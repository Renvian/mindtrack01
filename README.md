# Mind Track 

Mind Track is a lightweight, client-side mental health monitoring application implemented with plain HTML, CSS and vanilla JavaScript. The project implements user authentication, role-based dashboards (doctor / patient), standard mental-health assessments, mood and sleep logging, custom test creation/assignment, alerting, and visualizations.

> Flow: Authentication → Doctor dashboard → Patient management → Tests → Mood logs → Alerts → Visualization

## Login Credentials

Use the following test doctor account for development and testing:

- Email: **doc@test.com**
- Password: **123456**

These credentials are included for local testing only. Do not use them in production.

## Features

- Doctor login (role-based redirect to `doctor-dashboard.html`)
- Patient management (list, view profile, assign tests) — implemented in `doctor.js`
- Mood logging (`patient-dashboard.html` + `patient.js`) and sleep logging (`sleep.html`) ⚖️
- Standard assessments: PHQ-9, GAD-7, PSS-10 (`assessment-phq9.html`, `assessment-gad7.html`, `assessment-pss10.html`) with scoring logic in `assessments.js`
- Custom tests: create, save, assign, complete, and view results (`doctor-custom-tests.html`, `take-custom-test.html`, `doctor.js`, `patient.js`)
- Alerts: immediate alert insertion (see `assessments.js`) and patient status badges in `doctor-dashboard.html`
- Charts / visualizations: code uses Chart-style APIs (`charts-logic.js`, `doctor.js`) to render line/doughnut/bar charts for trends
- Utilities: optional AI summary helper (`gemini.js`) — requires an external API key
- Notes & records: simple records and export-oriented helpers (`records.js`)

## Tech stack 

- Frontend: Static HTML files (no framework) — files like `index.html`, `login.html`, `patient-dashboard.html`, `doctor-dashboard.html`
- Styling: Plain CSS (`styles.css` and `css/styles.css`)
- Client libraries included/used in code:
  - `@supabase/supabase-js` v2 (included via CDN in HTML files such as `login.html`, `patient-dashboard.html`, `doctor-dashboard.html`)
  - Chart rendering is implemented via the global `Chart` API in JS files (`charts-logic.js`, `doctor.js`) — the Chart.js usage appears in code, but the Chart.js library is not shipped in the repository HTML; include Chart.js via CDN if needed.
- Backend/service: Supabase (the repo includes `supabase-config.js` and uses `.from()` queries throughout)
- No package.json or npm-based build in this repo — the app is static and runs in the browser

Notes: All library usage is explicit in the source (see `login.html`/`doctor-dashboard.html` for Supabase). Where code calls `new Chart(...)`, it expects Chart.js to be available at runtime; add the Chart.js CDN to pages that render charts if necessary.

## Installation & running (minimal)

1. Clone the repository:

```bash
git clone https://github.com/Renvian/mindtrack01.git
cd mindtrack01
```


2. Configuration: Supabase

- The repository includes `supabase-config.js` with the Supabase URL and anon key used by the client code. For a secure deployment, replace or refactor this file to read from environment variables or your host's secrets.

- If you prefer an `.env` workflow, create a small script to inject env values into `js/supabase-config.js` during deployment — the repo does not provide one by default.

3. Charts 

- To enable charts, add Chart.js to pages that render charts. Example CDN include in the page `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

## Project structure 

- assessment-gad7.html
- assessment-phq9.html
- assessment-pss10.html
- assessments.js
- auth.js
- charts-logic.js
- doctor-custom-tests.html
- doctor-dashboard.html
- doctor.js
- gemini.js
- index.html
- login.html
- patient-dashboard.html
- patient-profile.html
- patient.js
- records.js
- register.html
- sleep.html
- styles.css
- supabase-config.js
- take-custom-test.html
- assets/ (empty)
- css/styles.css
- js/ (contains copies of some JS files)

## How the core flow works 

1. Authentication: Users sign up or log in via `register.html` / `login.html`. Supabase auth is used (`auth.js`). User role is stored in `user_metadata.role` and used to route to doctor or patient dashboards.
2. Doctor dashboard: `doctor-dashboard.html` + `doctor.js` loads patients, alerts and provides links to custom tests and patient profiles.
3. Patient management: Doctors can view patient details, assign custom tests, prescribe medications, and view alerts.
4. Tests: Standard tests (PHQ-9, GAD-7, PSS-10) calculate scores in `assessments.js`. Submissions insert records into Supabase tables and may create alerts.
5. Mood & sleep logging: Patients log mood and sleep; entries are saved to Supabase (`mood_logs`, `sleep_logs`) and shown in dashboards.
6. Alerts: Assessments trigger alert records which change patient status badges (Green / Orange / Red) visible to doctors.
7. Visualization: JS code uses Chart-style APIs to render trend charts (mood, assessments, sleep). Ensure Chart.js is included in pages where charts are rendered.

## Future improvements 

- Move secrets out of source: use environment variables and server-side proxy for Supabase keys.
- Include Chart.js CDN or bundle to guarantee chart rendering across pages.
- Add unit tests and a simple CI pipeline to validate pages (linting / link checks).
- Improve access control and add server-side validation for production use.

