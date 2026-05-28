# Mobile App - Backend Integration Guide

## Overview

This guide explains how to configure the Smart Plant Watering mobile app to connect to a backend API and how to make the setup clone-friendly for other developers.

## Backend URL Configuration

The mobile app reads the backend URL from `.env` using `EXPO_PUBLIC_API_URL`.

Open `Smart-Plant-Watering-System-Mobile/.env` and set:

```env
EXPO_PUBLIC_API_URL=http://<YOUR_BACKEND_IP>:8001
```

## Recommended Setup for Cloned Repositories

When someone clones this repo:

1. Copy or create `Smart-Plant-Watering-System-Mobile/.env`.
2. Set `EXPO_PUBLIC_API_URL` to the backend machine's LAN IP.
3. Do not commit `.env` to version control.
4. Restart Expo after updating `.env`.

Example:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.10:8001
```

## Local Device Rules

- **Physical mobile device on same Wi-Fi**: use the backend host's LAN IP.
- **Simulator/emulator on the same machine**: `http://localhost:8001` may work, but using the LAN IP is safer.
- **Android emulator**: if `localhost` does not work, try `http://10.0.2.2:8001`.
- **Expo tunnel**: use `npm start -- --tunnel` if your phone and computer are not on the same network.

## Why this is important

Hardcoding `localhost` breaks the app when the backend runs on a different machine. A clone-friendly setup means each developer or tester can use their own backend IP without changing source code.

## Running the Mobile App

```bash
cd "e:\Download\appdev\Smart-Plant-Watering-System-Mobile"
npm install
npm start
```

Then open the app in Expo Go or an emulator.

---

# FastAPI Backend - Complete Guide

## Overview

This backend service handles IoT telemetry, plant data, user authentication, and mobile/web integration for the Smart Plant Watering System.

## Starting FastAPI Locally

```bash
cd "e:\Download\appdev\fast-api"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

Once running, verify:
- `http://localhost:8001`
- `http://localhost:8001/docs`
- `http://localhost:8001/redoc`

## Backend URL and Device Setup

If other devices connect to this backend, use the backend machine's LAN IP in the frontend/mobile apps.

### Web app
Set this in `Smart-Plant-Watering-System/.env.development` or `.env.local`:

```env
REACT_APP_API_URL=http://<YOUR_BACKEND_IP>:8001
```

### Mobile app
Set this in `Smart-Plant-Watering-System-Mobile/.env`:

```env
EXPO_PUBLIC_API_URL=http://<YOUR_BACKEND_IP>:8001
```

### If using a device on the same machine
- Web: `http://localhost:8001`
- Mobile emulator: `http://localhost:8001` may work
- Android emulator: `http://10.0.2.2:8001` may be required

### Use LAN IP for physical devices
The safest option for remote devices is:

```env
http://192.168.1.10:8001
```

## API Documentation

Use the built-in docs:
- `http://localhost:8001/docs`
- `http://localhost:8001/redoc`

## Switching Between Backends

In the frontend and mobile apps, change the base URL to point to the backend you want to use.

- Web app: `REACT_APP_API_URL`
- Mobile app: `EXPO_PUBLIC_API_URL`

Example for FastAPI:

```env
REACT_APP_API_URL=http://192.168.1.10:8001
EXPO_PUBLIC_API_URL=http://192.168.1.10:8001
```

Example if using Django instead:

```env
REACT_APP_API_URL=http://192.168.1.10:8000/api
EXPO_PUBLIC_API_URL=http://192.168.1.10:8000/api
```

## Database

- Default: SQLite at `sqlite:///./fastapi.db`
- For local development, the database file is created automatically.
- If you need a fresh start, stop the server, delete `fastapi.db`, and restart FastAPI.

## Authentication

Protected calls require the `Authorization` header:

```http
Authorization: Token <your_token_here>
```

## Deployment Notes

- Keep `HOST=0.0.0.0` in `.env` so the backend is reachable from the local network.
- For Render or cloud deployment, set `PORT` based on the host environment.
- Add frontend origins to `CORS_ORIGINS` if using separate web/mobile hosts.

## Common Troubleshooting

### Backend access problems
- Confirm `uvicorn` is running on `0.0.0.0:8001`
- Use the host machine's LAN IP from other devices
- Make sure firewall allows port `8001`

### CORS errors
- Add frontend origin to `CORS_ORIGINS`
- Example:
  `CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://192.168.1.10:3000`

### Mobile connection issues
- Set `EXPO_PUBLIC_API_URL` to the backend host LAN IP
- Restart Expo after changing `.env`
- Use tunnel mode if network restrictions exist

## Recommended Local Setup for Clones

1. Clone the repo.
2. Create `fast-api/.env` from `.env.example`.
3. Set `HOST=0.0.0.0` and `PORT=8001`.
4. Confirm `CORS_ORIGINS` includes any frontend origins.
5. Start the backend.
6. In the web app and mobile app, set the backend URL to the backend host IP.

---

Generated for project consistency and clone-friendly local development.
