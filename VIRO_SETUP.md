# ViroReact Setup Notes

## Important: ViroReact Native Setup

ViroReact requires additional native configuration beyond npm install. Follow these steps:

## Android Setup

1. **Update `android/build.gradle`**:
Add to `repositories`:
```gradle
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
        // ... other repositories
    }
}
```

2. **Update `android/app/build.gradle`**:
Ensure minSdkVersion is at least 24 (already set).

3. **Rebuild**:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## iOS Setup

1. **Update `ios/Podfile`**:
Ensure platform is iOS 11.0 or higher:
```ruby
platform :ios, '11.0'
```

2. **Install Pods**:
```bash
cd ios
pod install
cd ..
```

3. **Rebuild**:
```bash
npm run ios
```

## Alternative: Using react-native-viro

If `@viro-community/react-viro` doesn't work, you can try:
- `react-native-viro` (original, may need updates)
- Or use ARCore/ARKit directly with native modules

## Testing AR

- **Physical Device Required**: AR features only work on real devices
- **Android**: Requires ARCore-enabled device (API 24+)
- **iOS**: Requires ARKit-enabled device (iPhone 6s or later)
- **Emulators**: ARCore may not work on all emulators

## Troubleshooting

If AR scene doesn't load:
1. Check camera permissions are granted
2. Verify device supports ARCore/ARKit
3. Check console for ViroReact initialization errors
4. Ensure all native dependencies are properly linked

