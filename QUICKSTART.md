# 🚀 Quick Start Guide - Smart Plant Mobile App

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd "E:\Smart Plant Watering System\Smart-Plant-Watering-System-Mobile"
npm install
```
*Takes ~2-3 minutes depending on internet speed*

### 2. Start the App
```bash
npm start
```

### 3. Open in Expo Go
- **Android**: Scan QR code with Expo Go app
- **iOS**: Scan QR code with camera, tap "Open in Expo Go"
- **Web**: Press `w` in terminal

### 4. Login with Demo Account
```
Email: demo@example.com
Password: demo123
```

## File Structure Quick Reference

```
Smart-Plant-Watering-System-Mobile/
├── App.js                 ← Main entry point
├── src/
│   ├── screens/          ← All app screens
│   ├── components/       ← Reusable UI components
│   ├── context/          ← State management (Auth, Plants)
│   ├── hooks/            ← Custom hooks
│   ├── navigation/       ← Navigation setup
│   └── utils/            ← Helper functions & notifications
├── package.json          ← Dependencies
├── app.json              ← Expo config
└── README.md             ← Full documentation
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `App.js` | App initialization, providers setup |
| `src/context/AuthContext.js` | Login/Signup/Logout logic |
| `src/context/PlantContext.js` | Plant data management |
| `src/screens/DashboardScreen.js` | Home screen |
| `src/screens/PlantListScreen.js` | Browse plants |
| `src/screens/PlantDetailScreen.js` | Plant info & watering |
| `src/hooks/useAppHooks.js` | useAuth & usePlants hooks |
| `src/utils/helpers.js` | Utility functions |
| `src/navigation/RootNavigator.js` | Navigation structure |

## Testing the Features

### Test Authentication
1. Try login with invalid credentials
2. Register new account
3. Login with new account
4. Logout

### Test Plant Features
1. Water a plant (moisture increases)
2. Search for plant by name
3. Filter by status (Healthy/Needs Water)
4. View plant details
5. Delete a plant
6. Add a new plant

### Test Dashboard
1. Swipe down to refresh
2. Check all stats update correctly
3. Verify plants update when watered

## Where to Add Customizations

### Add New Screen
1. Create `src/screens/MyScreen.js`
2. Import in `src/navigation/RootNavigator.js`
3. Add route to navigator

### Add New Component
1. Create file in `src/components/MyComponent.js`
2. Import and use in screens

### Add Utility Function
1. Add function to `src/utils/helpers.js`
2. Import and use in components

### Modify Colors
1. Change color values in screens (e.g., `#4CAF50`)
2. Or define color constants in `src/utils/helpers.js`

## Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Expo Go can't connect
- Ensure phone and computer on same WiFi
- Try: `npm start -- --tunnel`
- Or use Android emulator/iOS simulator

### Blank screen
- Check console for errors: `npm start`
- Try force reload in Expo Go (shake phone)

## Next Steps (Phase 2)

- Photo capture for plants
- Advanced analytics
- Share with family
- Offline mode
- Dark theme
- Push notifications (currently setup)

## Common npm Commands

```bash
npm start              # Start dev server
npm run android        # Open Android emulator
npm run ios           # Open iOS simulator
npm run web           # Open in web browser
npm install pkg-name  # Add new package
npm uninstall pk-name # Remove package
```

## Need Help?

1. Check the full [README.md](./README.md)
2. Check Expo docs: https://docs.expo.dev
3. Check React Navigation docs: https://reactnavigation.org
4. Check console errors when app runs

---

**You're all set! 🌱 Happy plant watering!**
