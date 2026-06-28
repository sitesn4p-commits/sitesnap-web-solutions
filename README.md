# Sitesnap Web Solutions

Public website, backend API, and a private dashboard for Sitesnap Web Solutions.

## Run locally

```bash
npm start
```

Open:

- Public website: `http://127.0.0.1:4000/`
- Private dashboard: `http://127.0.0.1:4000/console`

## Free Render deploy

This project includes `render.yaml` for Render Blueprint deployment.

Set these environment values during deploy:

- `ADMIN_USER`: admin
- `ADMIN_PASSWORD`: choose a strong password
- `SESSION_SECRET`: Render can generate this automatically

The app uses `server/data/db.json` for local demo storage. Free hosting filesystems can reset on redeploy/restart, so connect a hosted database before using this for permanent client leads.
