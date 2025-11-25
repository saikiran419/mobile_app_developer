# Assignment App — README

This repository contains a starter React Native app scaffold created with Expo. It implements a minimal navigation flow and small example screens so you can focus on completing the internship assignment quickly.

This README explains how to set up, run, and troubleshoot the project, what is implemented, and next steps you can follow to finish the assignment.

**Prerequisites**
- macOS with `zsh` (you are already on macOS)
- Node.js (use `nvm` to manage versions recommended)
- Homebrew (for installing `watchman`)
- Xcode (for iOS simulator) and/or Android Studio (for Android emulator)

**Quick start**
1. Open a terminal and change into the project folder:

```bash
cd "/Users/v.saikiranreddy/Desktop/mobile_app developer"
```

2. Clean install dependencies:

```bash
# remove any previous install artifacts
rm -rf node_modules package-lock.json
npm install
```

3. Make Expo install the exact native-compatible packages for the SDK:

```bash
npx expo install
```

4. Start the development server (Metro / Expo):

```bash
npm run start
# then press 'i' to open iOS simulator, 'a' for Android, or use the explicit scripts:
npm run ios
npm run android
```

If Metro logs package compatibility warnings, run `npx expo install --fix` which will align packages to the Expo SDK in `app.json`.

**Troubleshooting (common issues you saw)**
- Dependency mismatches with Expo SDK: run:

```bash
npx expo install --fix
```

- Metro errors: "EMFILE: too many open files, watch" — resolve by installing/using Watchman and increasing file descriptor limits:

```bash
# install watchman (Homebrew required)
brew install watchman
# clear any existing watchman state
watchman watch-del-all
# temporarily increase open-file limit for current terminal
ulimit -n 8192
# (optional) make system-wide change until reboot (requires sudo)
sudo launchctl limit maxfiles 524288 524288
```

After applying the above, run `npm run start` again.

**What’s included (implemented so far)**
- `App.js` — application entry point and navigation container
- `src/screens/HomeScreen.js` — Home screen with navigation buttons
- `src/screens/DetailsScreen.js` — Details screen (receives params)
- `src/screens/LoginScreen.js` — Simple mock login UI and flow
- `src/components/Header.js` — Small header component used by screens
- `app.json`, `package.json`, `babel.config.js` — project config

This scaffold is intentionally minimal so you can implement assignment features quickly.

**Project structure**

```
/ (project root)
├─ App.js
├─ app.json
├─ package.json
├─ src/
│  ├─ components/
│  │  └─ Header.js
	│  └─ ...
│  └─ screens/
│     ├─ HomeScreen.js
│     ├─ DetailsScreen.js
│     └─ LoginScreen.js
```

**Recommended next steps to complete the assignment**
1. Implement assignment-specific screens and UI: create the screens listed in your assignment PDF inside `src/screens`.
2. Data layer: add `src/services/api.js` using `axios` and decide whether to use real back-end APIs or a local mock (e.g., `json-server`).
3. State management: use React Context or Redux Toolkit depending on complexity. Persist auth tokens or cached data with `@react-native-async-storage/async-storage`.
4. Authentication: replace the mock login with real API calls and guard protected screens.
5. Testing: add unit tests with Jest and optional E2E with Detox or Expo E2E.
6. Build artifacts: use EAS to create production builds or use Expo Application Services.

**Build / Release (Expo + EAS)**
Install EAS CLI and follow Expo docs to build production apps:

```bash
# install eas-cli
npm install -g eas-cli
# login and configure
eas login
# create an iOS or Android build
eas build --platform ios
eas build --platform android
```

**Deliverables checklist (for submission)**
- Source code repository (this project) with clear commits
- `README.md` with setup and run steps (this file)
- Working app screenshots (iOS + Android) and a short demo video (30–120s)
- Build artifact (APK / AAB or Expo/EAS build links)
- Notes: features implemented, any deviations from spec, known issues

**Notes & support**
- If you want I can continue and implement the assignment features (UI, mock API, auth flow, persistence, tests). Reply: "Continue — implement features".
- If you prefer a full written assignment document instead of code, reply: "Document only".

**Contact / next step**
Tell me which option you want next:
- `Continue — implement features` — I will implement the assignment code (mock API, state, auth, persistence, tests).
- `Document only` — I will write the assignment submission document and architecture explanations.

