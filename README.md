
# Assignment App — Expo Mobile App Scaffold

This repository is a ready-to-extend Expo React Native app for your assignment. It includes:

- Expo-managed React Native app (SDK 49)
- Simple authentication flow with token persistence
- Mock JSON API using `json-server` (via Express helper)
- Starter screens and components for rapid development

## Project Overview

Minimal setup for quick implementation of assignment features. The app runs locally with a mock API and includes basic tests.

## Getting Started

### 1. Install dependencies

```bash
cd "/Users/v.saikiranreddy/Desktop/mobile_app developer"
rm -rf node_modules package-lock.json # optional cleanup
npm install
```

### 2. Install Expo-compatible native packages

```bash
npx expo install
npx expo install --fix # if you see compatibility warnings
```

### 3. Start the mock API server (in a new terminal)

```bash
npm run mock-server
```

### 4. Start the Expo development server

```bash
npm run start
```

When prompted:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan the QR code with Expo Go (Android) or Camera app (iOS)
- Press `w` for web browser

> **Note:** If testing on a physical device, update the API base URL in `src/services/api.js` from `localhost` to your computer's IP address, or use Expo's tunnel mode.

## Key Files

- `App.js` — app entry and navigation
- `src/context/AuthContext.js` — authentication state and logic
- `src/services/api.js` — Axios client for mock API
- `scripts/mock-server.js` & `db.json` — mock API and seed data
- `src/screens/` — all main screens (Login, Signup, Dashboard, Items, Details, Profile, Debug)

## Mock API & Web UI

The mock API uses `json-server` and exposes a browser UI for inspecting resources and endpoints.

- Default URL: `http://localhost:3001`
- Open in browser: `http://localhost:3001` (see `/users` and `/items`)

Example curl commands (replace `localhost` with your computer's IP if testing from a device):

```bash
# List items
curl http://localhost:3001/items
# Get a single item
curl http://localhost:3001/items/1
# Create an item
curl -X POST http://localhost:3001/items -H "Content-Type: application/json" -d '{"title":"New item","description":"Created via curl"}'
```

**Important:** Start the mock server before running the app so the mobile client can fetch data.

## Testing

Run unit tests:

```bash
npm test
```

## Troubleshooting

- **Expo/Metro watcher errors (macOS):**
	- "EMFILE: too many open files"
	- Install Watchman: `brew install watchman`
	- Reset watches: `watchman watch-del-all`
	- Increase file limit: `ulimit -n 8192`
	- For persistent change: `sudo launchctl limit maxfiles 524288 524288`

- **Expo package compatibility warnings:**
	- Run: `npx expo install --fix`

- **API connection issues on device:**
	- Change API base URL in `src/services/api.js` to your computer's IP address
	- Make sure your phone and computer are on the same Wi-Fi network

## Build & Release

Use EAS for production builds:

```bash
npm install -g eas-cli # install EAS CLI
eas login
eas build --platform ios
eas build --platform android
```

## Deliverables Checklist

- Source repository with commits
- Updated `README.md` with run instructions
- Screenshots (iOS & Android) and short demo video (30–120s)
- Build artifact / EAS build links
- Notes describing implemented features and any deviations from the spec

## Next Steps

- Continue — implement features: polish UI, finish all screens, connect APIs, add caching/offline, expand tests, produce build artifacts
- Document only: write submission and architecture rationale

---
File: `README.md` — updated

