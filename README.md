# 🌱 Smart Plant Mobile App

A React Native mobile application built with Expo for managing and caring for your plants on the go.

## Features (Phase 1 MVP)

### ✅ Authentication
- User registration with email and password
- Login functionality
- Session persistence using AsyncStorage
- Logout capability

### ✅ Dashboard
- **System Overview**: Quick visual status of all plants
  - Total plants count
  - Healthy plants count
  - Plants needing attention
  - Average moisture level
- **Quick Actions**: View all plants, access care guide
- **Plants Needing Water**: Display plants with low moisture
- **Recently Watered**: Show plants with highest moisture

### ✅ Plant Management
- **View All Plants**: List view with search and filter options
  - Search by plant name, location, or type
  - Filter by status (Healthy/Needs Water/All)
  - View count of matching plants
- **Plant Details**: Individual plant information
  - Moisture level with visual progress bar
  - Last watered timestamp
  - Care requirements
  - Watering history (last 5 waterings)
  - Delete plant option

### ✅ Quick Water Button
- One-tap watering from plant card
- Instant moisture increase (simulated)
- Watering history logging
- Confirmation feedback

### ✅ Care Guide
- Comprehensive plant care tips
- Watering best practices
- Light requirements
- Temperature recommendations
- Humidity tips
- Fertilizing guide
- Common problems & solutions

### ✅ Push Notifications
- Notification permissions setup
- Scheduled watering reminders
- Plant health alerts
- Test notification system

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (iOS/Android)

### Setup Steps

1. **Navigate to project directory**
```bash
cd "Smart-Plant-Watering-System-Mobile"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start Expo development server**
```bash
npm start
```

Or use specific commands:
```bash
npm run android  # For Android Emulator
npm run ios      # For iOS Simulator
npm run web      # For Web Browser
```

4. **Open in Expo Go**
   - Scan the QR code with Expo Go app (Android)
   - Press "i" for iOS simulator or "w" for web
   - Or use `expo://` link in Expo Go

### Demo Account
For testing without creating an account:
- Email: `demo@example.com`
- Password: `demo123`

## Project Structure

```
src/
├── screens/              # Screen components
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── DashboardScreen.js
│   ├── PlantListScreen.js
│   ├── PlantDetailScreen.js
│   ├── AddPlantScreen.js
│   └── CareGuideScreen.js
├── components/          # Reusable components
│   ├── PlantCard.js
│   └── StatsCard.js
├── context/            # Context for state management
│   ├── AuthContext.js
│   └── PlantContext.js
├── hooks/              # Custom hooks
│   └── useAppHooks.js
├── navigation/         # Navigation setup
│   └── RootNavigator.js
├── utils/              # Utility functions
│   ├── helpers.js
│   └── notificationService.js
├── styles/             # Global styles (if needed)
└── App.js              # Entry point
```

## Data Persistence

All data is stored locally using **AsyncStorage**:
- User credentials (users list)
- User session token
- User data
- Plant information
- Watering history
- Notification preferences

## Navigation Flow

### Unauthenticated Users
```
Login Screen
    ↓
Register Screen (optional)
    ↓
(Success) → Authenticated
```

### Authenticated Users (Bottom Tab Navigation)
```
├── Home Tab
│   ├── Dashboard
│   └── Plant Detail
├── Plants Tab
│   ├── Plant List
│   ├── Plant Detail
│   └── Add Plant
└── Guide Tab
    └── Care Guide
```

## Key Hooks & Context

### useAuth()
- `signIn(email, password)`: Login user
- `signUp(name, email, password)`: Register new user
- `signOut()`: Logout user
- State: `userToken`, `user`, `isLoading`

### usePlants()
- `waterPlant(plantId)`: Water a plant
- `addPlant(plantData)`: Add new plant
- `updatePlant(plantId, updates)`: Update plant info
- `deletePlant(plantId)`: Remove plant
- `getPlantStats()`: Get dashboard statistics
- State: `plants`, `loading`

## Notifications

The app includes push notification support via Expo Notifications:
- Request notification permissions on app start
- Schedule reminders for plants needing water
- Show alerts for plant health issues
- Cancel old reminders when plants are watered

## Styling

- **Color Scheme**:
  - Primary: `#4CAF50` (Green)
  - Healthy: `#4CAF50` (Green)
  - Good: `#87CEEB` (Sky Blue)
  - Warning: `#FF6B6B` (Red)
  - Neutral: `#FFD700` (Gold)

- **Components**: Native React Native components with custom styling
- **Icons**: Emoji-based icons for simplicity

## Current demo data

The app comes with demo plants:
1. Monstera Deliciosa (Living Room)
2. Pothos Golden (Bedroom)
3. Snake Plant (Office)

## Future Enhancements (Phase 2+)

- Photo capture & plant photos
- Advanced analytics & charts
- Family/friend sharing
- Multiple watering schedules
- Offline mode with sync
- Camera-based plant health detection
- Watering reminders via push notifications
- Dark mode
- Multiple languages
- Integration with smart irrigation systems

## Troubleshooting

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Expo Go connection issues
- Ensure device and computer are on same WiFi
- Check firewall settings
- Try LAN connection: `expo start --localhost`

### AsyncStorage issues
- Clear app data and reinstall
- Check permissions in app.json

## Development Commands

```bash
npm start              # Start Expo server
npm run android        # Start Android emulator
npm run ios           # Start iOS simulator
npm run web           # Start web version
npm test              # Run tests (if configured)
```

## License

This project is part of the Smart Plant Watering System. See parent README for details.

## Support

For issues or questions, refer to the main project documentation or create an issue in the repository.

---

**Made with 🌱 for plant lovers**