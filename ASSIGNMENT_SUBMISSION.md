# Assignment Submission — Mobile App (React Native)

This document is a complete submission-ready write-up for the internship assignment. It explains the app scope, architecture, screens, data model, implementation plan, testing, build steps, and the deliverables you should include when you submit your work.

If any details below differ from your assignment PDF, tell me which parts to adjust and I will update the document and the code accordingly.

---

## 1. Project Summary

- App name (repo): Assignment App
- Platform: iOS and Android (Expo-managed React Native)
- Tech: Expo SDK 49, React 18, React Navigation, Axios (for API), Watchman recommended
- What is implemented in this scaffold: `Home`, `Details`, `Login` screens and a small `Header` component. This scaffold is intended to be extended to satisfy the assignment requirements.

## 2. Assignment Scope (Assumptions)

I prepared this document assuming the assignment asks for a standard small mobile app that includes the following items. If your PDF has different or additional requirements, tell me and I will update the document and implementation plan.

- Multiple screens (list/home, detail, login, profile/settings)
- Network data retrieval (REST API) or mocked local JSON server
- Simple authentication (login / token persistence)
- Local persistence for small caches or settings
- Responsive UI and basic accessibility
- Basic unit tests (Jest) and manual QA on iOS/Android
- Produce builds (APK/AAB for Android, IPA/TestFlight for iOS) and screenshots / demo video

## 3. Implemented Components (so far)

- `App.js` — navigation container and stack definition
- `src/screens/HomeScreen.js` — placeholder home screen with navigation buttons
- `src/screens/DetailsScreen.js` — placeholder details screen (accepts `route.params`)
- `src/screens/LoginScreen.js` — mock login UI and navigation
- `src/components/Header.js` — small shared header
- `README.md` — setup, troubleshooting, and next steps
- `scripts/setup_and_run.sh` — helper to install, fix Expo deps, set watchman, increase ulimit, and start Expo

These give you a running app that you can extend to implement the full assignment requirements.

## 4. Proposed Feature Checklist (how I will implement the assignment)

Below is a checklist of features typically required and how I'd implement them. Reply with any differences from your assignment PDF.

1. UI screens
   - Home / Dashboard — list of items (FlatList)
   - Item / Details — show item details and actions
   - Login / Signup — form with validation
   - Profile / Settings (optional)

2. Navigation
   - `@react-navigation/native` with native stack (`createNativeStackNavigator`)
   - Auth flow using a small context to switch between auth stack and app stack

3. Data layer
   - `src/services/api.js` central axios instance
   - Use `json-server` for local mock API during dev or integrate real API endpoints if provided

4. State management
   - Simple assignments: use React Context + Hooks
   - Complex assignments: use Redux Toolkit with slices

5. Persistence
   - `@react-native-async-storage/async-storage` for tokens and small caches

6. Testing
   - Unit tests with Jest for helper functions/components
   - Snapshot tests for critical components
   - Manual QA on simulator and Expo Go

7. Build & submission
   - Use EAS (Expo Application Services) for production builds or generate APK/AAB via Android Gradle and IPA via Xcode when using RN CLI

## 5. Architecture & Folder Structure

```
/
├─ App.js
├─ app.json
├─ package.json
├─ src/
│  ├─ components/        # Reusable UI components (Header, Button, ListItem)
│  ├─ screens/           # Screen-level components (Home, Details, Login, Profile)
│  ├─ services/          # API clients and mock-api helpers
│  ├─ context/           # React Context providers (AuthContext)
│  ├─ hooks/             # Reusable hooks
│  └─ utils/             # Utilities and constants
```

## 6. API & Data Model (example)

If your assignment requires a backend API, here is a minimal example (for a mock server using `json-server`):

- `GET /items` → returns list of items
- `GET /items/:id` → returns item details
- `POST /auth/login` → accepts `{ email, password }` and returns `{ token, user }`

Example item model:

```json
{
  "id": 1,
  "title": "Item title",
  "subtitle": "Short description",
  "image": "https://...",
  "details": "Longer description"
}
```

Implementation hints:

- Create `src/services/api.js`:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // json-server port
  timeout: 10000,
});

export default api;
```

- Run `json-server --watch db.json --port 3001` during dev with a `db.json` file.

## 7. Authentication Flow (example)

- User logs in via `LoginScreen` → call `/auth/login`
- Save token to AsyncStorage and set `AuthContext` state
- Authenticated navigator shows app screens; unauthenticated sees auth stack

Small pseudo-code for AuthContext:

```js
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function signIn(credentials) {
    const res = await api.post('/auth/login', credentials);
    await AsyncStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  }

  return <AuthContext.Provider value={{ user, signIn }}>{children}</AuthContext.Provider>;
}
```

## 8. UX / UI Guidelines

- Use system fonts for performance. Keep components responsive with Flexbox.
- Use `ActivityIndicator` for loading states and clear error messages for failures.
- Add `accessibilityLabel` where appropriate and test with a screen reader.

## 9. Testing Plan

- Unit tests: Jest for pure functions and small components.
- Snapshot tests: key presentational components.
- Manual E2E: Launch app on Expo Go on a real device and follow major flows (login, fetch list, open details).

Example test command:

```bash
npm test
```

## 10. Build & Release (instructions)

Expo (recommended for this project):

```bash
# install EAS CLI
npm install -g eas-cli
eas login
eas build --platform android
eas build --platform ios
```

React Native CLI (if you use native approach):

Android:

```bash
cd android
./gradlew assembleRelease
# find the APK in android/app/build/outputs
```

iOS: use Xcode Organizer to archive and upload or export an IPA for TestFlight.

## 11. Deliverables (what to submit)

- Project repository (Git) with clear commits.
- `README.md` with setup, run and troubleshooting steps (already included).
- `ASSIGNMENT_SUBMISSION.md` (this file).
- Screenshots for iOS and Android (place under `/screenshots`).
- Demo video (screen recording, 30–120 seconds) showing main flows.
- Build artifacts or EAS build links.
- Optional: short `docs/` folder with API contract and test notes.

## 12. Estimated Timeline (suggested)

- Environment & scaffold: 1–2 hours (completed)
- Implement UI + navigation for all screens: 4–8 hours
- Data layer and mock API: 2–4 hours
- Authentication & persistence: 2–3 hours
- Styling, polish, accessibility: 2–4 hours
- Testing & bugfixes: 2–4 hours
- Build artifacts + documentation + demo video: 2–4 hours

Total: 1–3 working days depending on scope and polish required.

## 13. Next Steps / Offer

- If you want, I can now implement the features in code (UI, mocked backend, auth, persistence, tests). Reply: `Continue — implement features`.
- If you prefer I only produce the written submission and polish this document further (include screenshots, wireframes and sample API responses tailored to your PDF), reply: `Document only — finalize` and optionally attach the parts of the PDF you want emphasized.

---

Appendix A — Quick commands

```bash
cd "/Users/v.saikiranreddy/Desktop/mobile_app developer"
npm install
npx expo install --fix
npm run start
```

Appendix B — Relevant files created

- `App.js`, `src/screens/*`, `src/components/*`, `scripts/setup_and_run.sh`, `README.md`, `ASSIGNMENT_SUBMISSION.md`

---

If you want this document adapted to the exact requirements from your assignment PDF, paste the relevant requirements (or allow me to read the PDF) and I'll update the document and produce a finalized submission file (including tailored wireframes and the feature matrix).
