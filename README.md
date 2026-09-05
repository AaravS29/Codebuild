# Emergency Intelligence — Vercel Full Stack

This project contains a static frontend and Vercel serverless backend.

## Structure

```text
index.html       frontend page
styles.css       frontend styles
app.js           frontend interactions
public/          frontend assets
api/index.js     backend health and hospital API
api/case.js      backend case tracking API
vercel.json      Vercel serverless configuration
package.json     project metadata
```

## Deploy to Vercel

Import the GitHub repository and use:

- Framework Preset: **Other**
- Root Directory: `./`
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: leave empty
- Environment Variables: none

Click **Deploy**. Vercel automatically serves `index.html` and deploys the files in `api/` as serverless functions.

## API endpoints

- `/api/health`
- `/api/hospitals`
- `/api/case?id=CASE-2026-000124`

The backend currently returns demo emergency-operation data. It is not connected to a real dispatch system.
