# 🌱 Smart Plant Watering Mobile App

A React Native mobile application built with Expo for monitoring plants, viewing moisture updates, and managing watering actions.

## Overview

This mobile app is part of the Smart Plant Watering System. It connects to the backend API to:
- Authenticate users
- Show plant moisture levels and health status
- Display plant details and watering history
- Send device telemetry requests
- Manage plant watering commands

## Key Features

- Authentication: login, registration, logout, token persistence
- Dashboard: plant statistics, moisture summary, alerts
- Plant list: searchable and filterable plant cards
- Plant detail: moisture gauge, care details, manual water action
- IoT device telemetry support via backend API
- Local state management with React Context
- Notifications for watering reminders and alerts

## Prerequisites

- Node.js 14+ (recommended)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go mobile app for Android/iOS

## Setup

1. Open a terminal in the mobile project:
   ```bash
   cd e:\Download\appdev\Smart-Plant-Watering-System-Mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure backend URL:
   - Open `.env`
   - Set `EXPO_PUBLIC_API_URL` to your backend host, for example:
     ```env
     EXPO_PUBLIC_API_URL=http://192.168.1.10:8001
     ```
   - If you use a different machine or network, update this IP to match the backend host.

4. Start Expo:
   ```bash
   npm start
   ```

5. Open the app with Expo Go or run on emulator:
   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## Backend Configuration

The mobile app reads the backend address from `.env` via Expo config.

Create or update `.env` with your backend host:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.10:8001
```

If the backend runs on another device, set this to the backend machine's local IP address.

### Optional Backend URL Auto-Detect

To make cloning this project easier for other devices:
- Keep `.env` out of version control by using `.gitignore`.
- Each developer or tester should set their own `EXPO_PUBLIC_API_URL`.
- Use the LAN IP of the backend machine when the app and backend are on different devices.
- If you are testing in a simulator/emulator on the same machine, `http://localhost:8001` may work.
- Restart Expo after changing `.env`.

Example `.env` for a cloned project:

```env
EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:8001
``` 

## Recommended Workflow

1. Start your backend API (FastAPI or Django) on the host machine.
2. Make sure the mobile device and backend are on the same network.
3. Use the backend IP address in `.env`.
4. Restart Expo after changing `.env`.

## Project Structure

```
Smart-Plant-Watering-System-Mobile/
├── App.js
├── app.config.js
├── src/
│   ├── components/            # reusable UI components
│   ├── context/               # app-wide context providers
│   ├── hooks/                 # custom hooks
│   ├── navigation/            # React Navigation setup
│   ├── screens/               # app screens
│   ├── services/              # backend API service layer
│   ├── styles/                # shared styles
│   └── utils/                 # helper functions
├── .env                      # local environment config
├── package.json
└── README.md
```

## Important Files

- `src/services/api.js` — backend request helpers and API endpoints
- `src/context/PlantContext.js` — plant data fetching and refresh logic
- `src/screens/DashboardScreen.js` — main dashboard UI
- `src/screens/PlantDetailScreen.js` — detail view for each plant
- `src/screens/DeviceSettingsScreen.js` — device telemetry and config

## Suggested Improvements

- Auto-detect backend host from device network
- Add live telemetry polling for device data
- Improve offline support and sync
- Add user profile management
- Add camera/photo support for plants

## Commands

```bash
npm install
npm start
npm run android
npm run ios
npm run web
```

## Troubleshooting

### Can’t login or register
- Make sure `.env` backend URL matches the backend host IP
- Ensure the backend server is running and reachable
- Use the same WiFi network for mobile device and backend machine
- Restart Expo after `.env` changes

### Backend URL issues
- If using `localhost`, use the computer’s LAN IP instead
- Example: `http://192.168.1.10:8001`
- For Android emulator, use the correct emulator host if needed

## Support

If you need help, check the parent repo documentation and backend README for backend setup.

---

Built for fast local testing and smart plant care.