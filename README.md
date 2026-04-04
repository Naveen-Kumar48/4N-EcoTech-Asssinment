# Appointment Booking App

A small React Native booking prototype for a 5-7 day assignment.

## Features
- Mock user authentication
- Service provider listing
- Appointment booking
- Appointment management
- Appointment cancellation
- AsyncStorage-based local persistence

## Tech Stack
- React Native with Expo
- React Navigation
- AsyncStorage

## Project Structure
- `src/screens` for screens
- `src/components` for reusable UI
- `src/context` for auth state
- `src/utils` for storage helpers
- `src/data` for mock provider data

## Run
```bash
npm install
npm run web
```

Other useful commands:
- `npm run start:8080` to open the Expo dev server on port 8080.
- `npm run web:8080` to open the web app on port 8080.
- `npm run android:preview` to open the Android preview on port 8080.

## See The Output
After `npm run web`, you can view the app in one of these ways:
- Scan the QR code with the Expo Go app on your Android or iPhone.
- Press `a` in the terminal to open Android if you have an emulator/device connected.
- Press `w` to open the web version in your browser.
- Press `i` to launch iOS only on macOS with Xcode installed.

The web app runs on `http://localhost:8080`.

If the project is not running yet, install the dependencies first with `npm install` from the project folder.

## GitHub Push
1. Create a new repository on GitHub.
2. From this folder, run `git add .`.
3. Commit the project with `git commit -m "Initial commit"`.
4. Set the branch name to `main` with `git branch -M main`.
5. Add your GitHub remote with `git remote add origin <your-repo-url>`.
6. Push with `git push -u origin main`.

## Notes
- No backend is used.
- Provider data is static.
- Slot locking is local-only and intended for a demo.
