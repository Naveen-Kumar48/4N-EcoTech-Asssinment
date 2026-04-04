# BookEase — Appointment Booking App

A React Native (Expo) appointment booking app built as a 5–7 day assignment.

---

## Features Checklist

| Requirement | Status |
|---|---|
| User Registration | ✅ Full name, email, password, confirm password, inline validation |
| User Login | ✅ Email + password, show/hide toggle, inline errors, demo credentials pre-filled |
| User Logout | ✅ Sign Out button on Home screen |
| Session Persistence | ✅ AsyncStorage session survives app restart |
| Service Provider Listing | ✅ 10 providers across 10 categories with image, name, category, rating |
| Provider Details | ✅ Full profile: bio, price, rating, reviews, availability, time slots |
| Appointment Scheduling | ✅ Select provider → choose slot → pick date → confirm booking |
| Conflict Detection | ✅ Prevents double-booking same provider/date/slot |
| Appointment List | ✅ Shows all upcoming bookings per user |
| Appointment Cancellation | ✅ Confirmation dialog before cancelling |
| Local Persistence | ✅ All data stored via AsyncStorage (no backend) |
| Android Support | ✅ Hardware back button handled, Android-safe layout |
| Search & Filter | ✅ Live search bar + category filter chips |

---

## Tech Stack

| Library | Purpose |
|---|---|
| React Native 0.79 | Core mobile framework |
| Expo SDK 53 | Build tooling, dev server, web preview |
| @react-native-async-storage/async-storage | Local data persistence |
| expo-status-bar | Status bar styling |
| React 19 | UI rendering |

> No React Navigation is used. Navigation is handled by a custom lightweight stack navigator in `App.js` to keep dependencies minimal.

---

## Project Structure

```
src/
  screens/
    LoginScreen.js          # Email/password login with validation
    RegisterScreen.js       # Registration with confirm password
    HomeScreen.js           # Provider list, search, category filter
    ProviderDetailsScreen.js# Provider profile + slot selection
    BookingScreen.js        # Date + slot picker + booking summary
    AppointmentsScreen.js   # View and cancel appointments
  components/
    ProviderCard.js         # Provider list card with availability badge
    SlotButton.js           # Interactive time slot selector
    ScreenShell.js          # Shared screen wrapper with background
  context/
    AuthContext.js          # Auth state: signIn, signUp, signOut
  data/
    providers.js            # 10 static mock service providers
  utils/
    storage.js              # AsyncStorage helpers + demo user seeding
  theme.js                  # Colors, spacing, radius, shadows, category colors
App.js                      # Root: AuthProvider + custom stack navigator
```

---

## Assumptions

- No backend or API is used. All data is stored locally via AsyncStorage.
- Provider data is static (defined in `src/data/providers.js`).
- Slot locking is per-device only — not shared across devices.
- A demo account (`test@gmail.com` / `123456`) is seeded automatically on first launch.
- Date input is a text field in `YYYY-MM-DD` format with validation (past dates rejected).
- "Fully Booked" providers are shown in the list but the booking button is disabled.

---

## Run Locally

```bash
npm install
npm run web        # Opens in browser at http://localhost:8080
```

### Other commands

```bash
npm run start:8080          # Expo dev server on port 8080
npm run android:preview     # Android preview via Expo Go
```

### View on device

After `npm run web` or `npm start`:
- Scan the QR code with **Expo Go** on Android or iOS
- Press `a` to open on a connected Android emulator/device
- Press `w` to open the web version in your browser

---

## Build APK (Android)

To generate a standalone APK for testing:

### Option 1 — EAS Build (recommended)

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

Add this to `eas.json` first:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

The APK download link will appear in your EAS dashboard at https://expo.dev.

### Option 2 — Local build

```bash
npm run android   # Requires Android Studio + SDK installed
```

---

## Demo Credentials

| Field | Value |
|---|---|
| Email | test@gmail.com |
| Password | 123456 |

These are pre-filled on the login screen. Just tap **Sign In**.

---

## GitHub Push

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
