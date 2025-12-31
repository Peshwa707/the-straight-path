# Download APK - The Straight Path App

Since building the APK requires Android SDK and build tools, here are **3 easy ways** to get the APK on your device:

## 🎯 Option 1: Download from GitHub Actions (Easiest - No Setup Required)

GitHub automatically builds the APK whenever code is pushed. You can download the pre-built APK directly!

### Steps:

1. **Go to the GitHub repository**
   - Navigate to: `https://github.com/Peshwa707/the-straight-path`

2. **Click on "Actions" tab** at the top

3. **Select the latest "Build Android APK" workflow run**
   - Look for the green checkmark ✓ (successful build)
   - Click on the most recent workflow run

4. **Download the APK**
   - Scroll down to the "Artifacts" section
   - Click on **"the-straight-path-debug-apk"** to download
   - The file will download as a ZIP - extract it to get `app-debug.apk`

5. **Transfer to your Android device**
   - Email it to yourself
   - Use Google Drive / Dropbox
   - Connect USB cable and copy directly

6. **Install on Android**
   - Go to Settings → Security → Enable "Install from Unknown Sources"
   - Tap the APK file to install
   - Done! 🎉

---

## 🖥️ Option 2: Build Locally with Android Studio (Full Control)

If you want to build it yourself and have Android Studio:

### Prerequisites:
- Android Studio installed
- Java 17 or higher

### Steps:

1. **Clone/Open the project**
   ```bash
   cd /home/user/the-straight-path
   ```

2. **Open in Android Studio**
   - Launch Android Studio
   - File → Open → Select the `android` folder
   - Wait for Gradle sync to complete

3. **Build the APK**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Wait 2-5 minutes for build to complete

4. **Locate the APK**
   - Path: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Android Studio will show a notification with "locate" link

5. **Install on device**
   - Transfer APK to phone
   - Enable "Install from Unknown Sources"
   - Tap to install

---

## ⚡ Option 3: Build via Command Line (For Developers)

If you're comfortable with terminal and have Android SDK installed:

### Prerequisites:
- Android SDK installed
- ANDROID_HOME environment variable set
- Java 17+

### Steps:

```bash
# Navigate to project
cd /home/user/the-straight-path

# Sync Capacitor (if you made changes)
npx cap sync android

# Build debug APK
cd android
./gradlew assembleDebug

# APK location
# android/app/build/outputs/apk/debug/app-debug.apk
```

### For release APK (signed):

```bash
# Create keystore (first time only)
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Build release APK
./gradlew assembleRelease

# APK location
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 📱 Quick Install Instructions (Once you have the APK)

1. **Enable Unknown Sources**
   - Android 7 and lower: Settings → Security → Unknown Sources (ON)
   - Android 8+: Settings → Apps → Special Access → Install Unknown Apps → Select your file manager → Allow

2. **Install APK**
   - Open file manager
   - Navigate to Downloads folder
   - Tap `app-debug.apk`
   - Tap "Install"
   - Tap "Open" when installation completes

3. **Create Account & Use**
   - Open "The Straight Path" app
   - Tap the ☰ menu button on the right
   - Tap "Sign Up" to create an account
   - All data is stored locally on your device
   - Enjoy learning about Islam! 🕌

---

## 🔧 Troubleshooting

### "Parse Error" when installing
- **Solution**: Re-download the APK, the file may be corrupted

### "App not installed"
- **Solution**: Uninstall any previous version first, then install again

### "For security, your phone is not allowed to install unknown apps"
- **Solution**: Enable "Install from Unknown Sources" (see instructions above)

### APK won't open/crashes
- **Solution**: Make sure your Android version is 5.0 or higher

### GitHub Actions build failed
- **Solution**: Wait a few minutes and check again, or check the workflow logs for errors

---

## 📊 APK Information

- **App Name**: The Straight Path
- **Package ID**: com.thestraightpath.app
- **File Name**: app-debug.apk
- **Size**: ~7-10 MB
- **Minimum Android**: 5.0 (API 21)
- **Target Android**: 14 (API 34)

---

## 🎁 What's Inside the App

✅ Complete offline Islamic guidance
✅ Quran with Tafseer Ibn Kathir
✅ Hadith Qudsi collection
✅ Prophet Muhammad's ﷺ life lessons
✅ Prophet Jesus (Isa) in the Quran
✅ How to perform Salah (prayer)
✅ How to perform Wudu (ablution)
✅ Daily guidance and practices
✅ User accounts (stored locally)
✅ Progress tracking (verses, hadith, streaks)
✅ Personal notes management
✅ Beautiful Islamic design
✅ Works completely offline

---

## 🔄 Updating the App

When a new version is released:

1. **Download the new APK** using any method above
2. **Install over the existing app** (no need to uninstall)
3. **Your data is preserved** (accounts, progress, notes)

---

## 🌟 Recommended: Option 1 (GitHub Actions)

**Why?** No setup required, always up-to-date, automatic builds on every code change!

Just go to GitHub Actions → Download latest APK → Install → Done!

---

بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ

May Allah guide us all to the straight path and grant us understanding of His religion.

For questions or issues, please open an issue on GitHub.
