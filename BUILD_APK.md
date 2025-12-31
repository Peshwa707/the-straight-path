# Building Android APK for The Straight Path App

This guide will help you build an Android APK file that can be installed on Android devices.

## Prerequisites

1. **Android Studio** installed on your computer
   - Download from: https://developer.android.com/studio

2. **Java Development Kit (JDK)** 17 or higher
   - Download from: https://www.oracle.com/java/technologies/downloads/

## Features in the Android App

✅ **Complete Offline Functionality**
- All Islamic content works without internet
- Quran with Tafseer Ibn Kathir
- Hadith Qudsi collection
- Prophet Muhammad's life lessons
- Jesus in the Quran
- How to Pray Salah guide
- How to Perform Wudu guide

✅ **Local Account System**
- Create account (stored locally on device)
- Login/Logout functionality
- Progress tracking (verses read, hadith studied, daily streak)
- Personal notes storage

✅ **Beautiful UI**
- Toggleable sidebar navigation
- Islamic aesthetic design
- Fully responsive for all screen sizes

## Building the APK

### Method 1: Using Android Studio (Recommended)

1. **Open the project in Android Studio**
   ```bash
   cd /home/user/the-straight-path
   ```
   - Open Android Studio
   - Select "Open an Existing Project"
   - Navigate to the `android` folder in the project
   - Click "OK"

2. **Wait for Gradle sync to complete**
   - Android Studio will automatically sync Gradle dependencies
   - This may take a few minutes on first run

3. **Build the APK**
   - Click on "Build" in the menu bar
   - Select "Build Bundle(s) / APK(s)" > "Build APK(s)"
   - Wait for the build to complete

4. **Locate the APK**
   - Once built, Android Studio will show a notification
   - Click "locate" in the notification, or find it manually:
   - Path: `android/app/build/outputs/apk/debug/app-debug.apk`

5. **Install on Android Device**
   - Transfer the APK to your Android device
   - Enable "Install from Unknown Sources" in device settings
   - Tap the APK file to install

### Method 2: Using Command Line (Advanced)

1. **Navigate to android directory**
   ```bash
   cd /home/user/the-straight-path/android
   ```

2. **Build debug APK**
   ```bash
   ./gradlew assembleDebug
   ```

3. **Locate the APK**
   ```bash
   ls -la app/build/outputs/apk/debug/app-debug.apk
   ```

4. **For release APK (requires signing)**
   ```bash
   ./gradlew assembleRelease
   ```

## Creating a Release APK (For Distribution)

### 1. Generate a Keystore

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Fill in the required information when prompted.

### 2. Configure signing in `android/app/build.gradle`

Add this inside the `android` block:

```gradle
signingConfigs {
    release {
        storeFile file("path/to/my-release-key.keystore")
        storePassword "your-keystore-password"
        keyAlias "my-key-alias"
        keyPassword "your-key-password"
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### 3. Build release APK

```bash
cd android
./gradlew assembleRelease
```

Find the signed APK at: `android/app/build/outputs/apk/release/app-release.apk`

## Updating the App

When you make changes to the web files (HTML, CSS, JS):

1. **Sync changes to Android**
   ```bash
   npx cap sync android
   ```

2. **Rebuild the APK**
   - Follow the build steps above again

## Troubleshooting

### Issue: Gradle sync fails
**Solution**:
- Check your internet connection
- Update Android Studio to the latest version
- Clear Gradle cache: `./gradlew clean`

### Issue: App crashes on startup
**Solution**:
- Check Android Studio's Logcat for error messages
- Ensure all web files are properly synced
- Rebuild the app after making changes

### Issue: Login/Signup not working
**Solution**:
- This is normal for first-time users
- Data is stored locally in the app's storage
- Clear app data in Android settings if you need to reset

## App Permissions

The app currently requires:
- **INTERNET**: For future online features (currently works fully offline)
- **WRITE_EXTERNAL_STORAGE**: For saving user data locally

## File Size

- Debug APK: ~7-10 MB
- Release APK (optimized): ~5-7 MB

## Minimum Android Version

- Minimum SDK: Android 5.0 (API 21)
- Target SDK: Android 14 (API 34)

## Support

For issues or questions, please contact the development team or check the project repository.

---

بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ

May Allah guide us all to the straight path.
