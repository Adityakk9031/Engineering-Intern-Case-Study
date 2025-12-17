# Suvichar Quotes App 📱

**A React Native + Expo app for creating and sharing beautiful Hindi quote designs with offline-first functionality.**

## Features ✨

### Core Features
- ✅ **Phone OTP Authentication** (mock, hardcoded "123456")
- ✅ **User Onboarding** (PERSONAL / BUSINESS profile types)
- ✅ **72+ Hindi Quotes** across 6 categories (Good Morning, Motivational, Shayari, Religious, Love, Festival)
- ✅ **12 Quote Templates** (2 per category) with dynamic image loading
- ✅ **Quote Card Rendering** with name overlay, photo glow effect, date badge
- ✅ **Quote Carousel** with category filtering
- ✅ **Share Functionality** via system share sheet
- ✅ **Download to Gallery** with persistence
- ✅ **Profile Management** with edit, photo picker
- ✅ **Premium Features** (mock subscription system)

### Premium Features (Locked / Unlocked)
- ✅ **Locked Fields** (Free users see lock icons):
  - About Yourself
  - Contact Details
  - Organization Details
- ✅ **Unlock Premium**: Mock monthly (₹199) & yearly (₹999) plans
- ✅ **Premium State Persistence** in AsyncStorage

### Offline-First
- ✅ **100% Local Storage** - No backend APIs, all data in AsyncStorage
- ✅ **Bundled Assets** - Template images in /assets/templates
- ✅ **In-Memory Quotes** - Quote content hardcoded, no external DB
- ✅ **Works Offline** - Full functionality without internet

### Error Handling & Polish
- ✅ **Error Boundaries** - Crash prevention with error messages
- ✅ **Loading States** - ActivityIndicator for async operations
- ✅ **Empty States** - Friendly messages for no data scenarios
- ✅ **Retry Logic** - User-friendly error recovery

---

## Project Structure

```
d:/Engineering Intern Case Study/
├── App.tsx                           # Entry point, main app export
├── app.json                          # Expo config (permissions, plugins, build)
├── eas.json                          # EAS build config
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
│
├── src/
│   ├── App.tsx                       # Navigation stack, font loading
│   │
│   ├── backend/                      # Mock backend (all local, no APIs)
│   │   ├── auth.ts                   # OTP mock (always "123456")
│   │   ├── user.ts                   # User profile CRUD via AsyncStorage
│   │   ├── quotes.ts                 # 12 templates + 6 categories metadata
│   │   ├── quoteContent.ts           # 72 Hindi quotes (new)
│   │   └── premium.ts                # Premium state management (new)
│   │
│   ├── services/
│   │   ├── api.ts                    # Unified API wrapper with 300-600ms latency
│   │   └── previewGenerator.ts       # SVG template preview generation (new)
│   │
│   ├── components/
│   │   ├── CategoryPills.tsx          # Category filter buttons
│   │   ├── CircularPhotoWithGlow.tsx  # Animated photo with purple glow
│   │   ├── DateBadge.tsx              # Hindi date display
│   │   ├── QuoteCard.tsx              # Main quote card (renders quotes)
│   │   ├── ErrorBoundary.tsx          # Error boundary component (new)
│   │   └── EmptyState.tsx             # Empty state UI (new)
│   │
│   ├── screens/                      # Navigation screens
│   │   ├── WelcomeScreen.tsx          # Phone number input
│   │   ├── OTPScreen.tsx              # OTP verification with timer
│   │   ├── PurposeScreen.tsx          # PERSONAL / BUSINESS selection
│   │   ├── ProfileSetupScreen.tsx     # Name + photo + skip option
│   │   ├── MainScreen.tsx             # Main carousel (improved error handling)
│   │   ├── EditDesignScreen.tsx       # Profile edit + premium fields
│   │   ├── UpgradeScreen.tsx          # Premium plans (working upgrade)
│   │   └── ProfileScreen.tsx          # Profile + downloads grid (improved)
│   │
│   ├── hooks/
│   │   └── useFontsLoad.ts            # Devanagari font preloader
│   │
│   └── utils/
│       └── offlineSupport.ts          # Offline support documentation (new)
│
└── assets/
    ├── templates/                    # Quote template images (folder for JPEGs)
    │   └── .gitkeep
    ├── icon.png                      # App icon
    ├── adaptive-icon.png             # Android adaptive icon
    ├── splash.png                    # Splash screen
    └── favicon.png                   # Web favicon
```

---

## Installation & Setup

### Prerequisites
- Node.js 16+ & npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Android SDK (for testing on Android)
- EAS CLI: `npm install -g eas-cli`

### Local Development

```bash
# Install dependencies
npm install
# or
yarn install

# Start Expo development server
npm start
# or
expo start

# Run on Android (requires Android SDK + emulator/device)
npm run android

# Or run on iOS (macOS only)
npm run ios

# Or use web preview (limited functionality)
npm run web
```

### Running the App
1. Start the dev server: `npm start`
2. Press `a` for Android emulator or scan QR with Expo Go app
3. Test flows: Welcome → OTP (`123456`) → Purpose → Profile Setup → Main

---

## Data Flow

### User Journey
```
WelcomeScreen
    ↓ (phone #)
OTPScreen
    ↓ (OTP: 123456)
PurposeScreen
    ↓ (PERSONAL or BUSINESS)
ProfileSetupScreen
    ↓ (name + photo)
MainScreen (Quote Carousel)
    ↓ (actions)
    ├→ Share (system share)
    ├→ Download (to gallery)
    ├→ Edit (profile & premium fields)
    └→ Profile (downloads + info)
```

### Storage Layers
```
AsyncStorage:
├── suvichar_user_profile
│   └── { phone, purpose, name, photoUri, showDate }
├── suvichar_premium_state
│   └── { isPremium, planType, expiryDate }
├── suvichar_downloaded_quotes
│   └── [uri1, uri2, ...]

In-Memory:
├── quoteTemplates[] (12 templates)
├── quotesByCategory (72 quotes)
├── otpStore (mock OTP map)

Bundled Assets:
└── /assets/templates/*.jpg (template images)
```

---

## Premium Feature Logic

### Free User
- ✅ View quotes & templates
- ✅ Share & download
- ✅ Edit name & photo
- ✅ View/hide date
- ❌ Cannot edit: About Yourself, Contact, Organization
- ⚠️ Fields show lock icon, tap → Upgrade modal

### Premium User
- ✅ All free features
- ✅ Edit premium fields:
  - About Yourself
  - Contact Details
  - Organization Details
- ⏱️ Premium expires based on plan:
  - **Monthly**: 30 days
  - **Yearly**: 365 days

### Upgrade Flow
1. Tap lock icon on EditDesign → Upgrade modal
2. Select plan (₹199 or ₹999)
3. "Processing..." state
4. Premium state saved to AsyncStorage
5. Auto-navigate to EditDesign with fields unlocked

**No Payment Integration** - Mock system only. Update `upgradeToPremium()` in `src/backend/premium.ts` to integrate real payments (Razorpay, Stripe, etc.)

---

## Offline Functionality

### ✅ Works Offline
- Quote carousel & browsing
- Photo selection & profile editing
- Share & download to gallery
- Premium feature toggling
- All data persistence

### ✗ Requires Internet (Not Implemented)
- Real OTP sending
- Backend user verification
- Payment processing
- Cloud sync/backup

**All external features are mocked/stubbed for demonstration.**

---

## Build & Deployment

### Local APK (Android)
```bash
# Build development APK
eas build -p android --profile preview

# Build production APK
npm run build:apk
# (Uses: eas build -p android --profile production)
```

### Configuration
- **app.json**: Expo app metadata, permissions, plugins
- **eas.json**: Build profiles (development, production)
- **permissions** (Android):
  - `READ_EXTERNAL_STORAGE` - Access gallery
  - `WRITE_EXTERNAL_STORAGE` - Save downloads
  - `CAMERA` - Photo picker (via ImagePicker)

### Prebuild Check (before EAS build)
```bash
# Verify all plugins are compatible
eas build --platform android --profile production --dry-run
```

---

## TypeScript & Code Quality

- ✅ Strict TypeScript config (`tsconfig.json`)
- ✅ Proper types for all components & services
- ✅ No `any` types (except necessary fallbacks)
- ✅ Comments on non-trivial functions
- ✅ Reusable components (CategoryPills, DateBadge, etc.)

### Example Component Pattern
```tsx
type Props = {
  template: QuoteTemplate;
  profile: UserProfile;
};

const QuoteCard = forwardRef<View, Props>(({ template, profile }, ref) => {
  // Component logic with proper typing
  return (
    <View ref={ref}>
      {/* JSX */}
    </View>
  );
});
```

---

## Hindi Language Support

- ✅ Devanagari font bundled (`NotoSansDevanagari`)
- ✅ All UI strings in Hindi
- ✅ Quote content in Hindi (72 quotes)
- ✅ Accessibility labels in Hindi

---

## Testing Scenarios

### 1. Fresh Install
- Start app → Welcome screen
- Enter any 10-digit number
- OTP: `123456`
- Choose PERSONAL or BUSINESS
- Upload photo + name
- View Main screen with quotes

### 2. Premium Feature
- MainScreen → EditDesign button
- See locked fields (lock icons)
- Tap lock → Upgrade modal
- Select plan → Processing...
- Fields unlock instantly
- Edit fields + save

### 3. Offline Mode
- Download app on device
- Disable wifi + mobile data
- All features still work:
  - Carousel browsing
  - Sharing (via local share)
  - Downloading to gallery
  - Profile editing

### 4. Empty States
- Profile screen (first time) → "No downloads" message
- MainScreen (no templates) → "No templates" message
- MainScreen (error loading) → Retry button

---

## Future Enhancements

- [ ] Real backend API (Node.js + Firebase / Supabase)
- [ ] Payment integration (Razorpay / Stripe)
- [ ] Template design builder UI
- [ ] Social sharing analytics
- [ ] Multi-language support (English UI)
- [ ] Dark mode
- [ ] iPad/landscape support
- [ ] iOS app store submission

---

## Troubleshooting

### Issue: Templates not loading
**Solution**: Check `/assets/templates` folder has `.jpg` files. If missing, app shows gradient placeholder.

### Issue: "OTP verification failed"
**Solution**: Enter exactly `123456` (6 digits). Mock OTP is hardcoded.

### Issue: Premium fields not unlocking
**Solution**: Restart app after upgrade. Premium state stored in AsyncStorage, takes effect on reload.

### Issue: Downloads not saving
**Solution**: Grant WRITE_EXTERNAL_STORAGE permission when prompted.

---

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [Noto Sans Devanagari Font](https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari)

---

## License

Private project for internship case study.

---

**Status**: ✅ Ready for `eas build -p android`
