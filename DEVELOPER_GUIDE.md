# 🛠️ Smart Plant Mobile - Developer Guide

## Quick Reference

### Common Tasks

#### Add a New Screen
```javascript
// 1. Create: src/screens/MyNewScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default MyNewScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>My New Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

// 2. Add to RootNavigator.js
import MyNewScreen from '../screens/MyNewScreen';

// 3. Add to appropriate stack in RootNavigator
<Stack.Screen name="MyNewScreen" component={MyNewScreen} />
```

#### Use Plant Context
```javascript
import { usePlants } from '../hooks/useAppHooks';

export default function MyComponent() {
  const { plants, waterPlant, addPlant } = usePlants();
  
  // plants is an array of all plants
  // waterPlant(plantId) - waters a plant
  // addPlant(plantData) - adds new plant
}
```

#### Use Auth Context
```javascript
import { useAuth } from '../hooks/useAppHooks';

export default function MyComponent() {
  const { user, signOut, userToken } = useAuth();
  
  // user is {id, email, name}
  // signOut() - logs out user
  // userToken - current session token
}
```

#### Add a Utility Function
```javascript
// In src/utils/helpers.js, add:
export const myNewFunction = (param1, param2) => {
  // your logic
  return result;
};

// Use in component:
import { myNewFunction } from '../utils/helpers';
const result = myNewFunction(a, b);
```

#### Store Data in AsyncStorage
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save
await AsyncStorage.setItem('key', JSON.stringify(data));

// Load
const data = await AsyncStorage.getItem('key');
const parsed = data ? JSON.parse(data) : null;

// Remove
await AsyncStorage.removeItem('key');

// Clear all
await AsyncStorage.clear();
```

---

## File Organization

```
src/
├── screens/                    # Full screen components
│   ├── LoginScreen.js         # Login page
│   ├── RegisterScreen.js      # Registration page
│   ├── DashboardScreen.js     # Home dashboard
│   ├── PlantListScreen.js     # Browse plants
│   ├── PlantDetailScreen.js   # Plant info & watering
│   ├── AddPlantScreen.js      # Add new plant
│   └── CareGuideScreen.js     # Care tips
│
├── components/                # Reusable components
│   ├── PlantCard.js          # Plant card with water button
│   └── StatsCard.js          # Statistics display card
│
├── context/                   # State management
│   ├── AuthContext.js        # Authentication state
│   └── PlantContext.js       # Plant data state
│
├── hooks/                     # Custom hooks
│   └── useAppHooks.js        # useAuth, usePlants
│
├── navigation/               # Navigation setup
│   └── RootNavigator.js     # Navigation structure
│
├── utils/                    # Helper functions
│   ├── helpers.js           # Utility functions
│   └── notificationService.js # Push notifications
│
└── styles/                   # Global styles (optional)
```

---

## Naming Conventions

- **Screens**: CamelCase with "Screen" suffix (e.g., `DashboardScreen.js`)
- **Components**: CamelCase (e.g., `PlantCard.js`)
- **Functions**: camelCase (e.g., `getMoistureStatus()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `PRIMARY_COLOR`)
- **Styles**: StyleSheet with lowercase names (e.g., `container`, `textInput`)

---

## Code Style Guidelines

### Use Consistent Formatting
```javascript
// Good - consistent spacing
const handleWater = async () => {
  const result = await waterPlant(plantId);
  if (result.success) {
    Alert.alert('Success');
  }
};

// Avoid - inconsistent
const handleWater=async()=>{
  const result=await waterPlant(plantId);
  if(result.success){Alert.alert('Success')}
};
```

### Prefer Named Imports
```javascript
// Good
import { usePlants } from '../hooks/useAppHooks';
import { View, Text } from 'react-native';

// Avoid default exports for multiple items
// export default { usePlants, useAuth }
```

### Add JSDoc Comments for Functions
```javascript
/**
 * Waters a plant and updates its moisture level
 * @param {string} plantId - The ID of the plant to water
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const waterPlant = async (plantId) => {
  // implementation
};
```

---

## Testing Components Locally

### Test with Different Moisture Levels
```javascript
// In PlantContext.js, modify demo plants:
{
  id: '1',
  name: 'Test Plant',
  moisture: 15, // Change this to test different states
  ...
}
```

### Test with Many Plants
```javascript
// In PlantContext.js initialization:
const demoPlants = [];
for (let i = 0; i < 50; i++) {
  demoPlants.push({
    id: i.toString(),
    name: `Plant ${i}`,
    location: `Location ${i}`,
    type: 'Test Type',
    moisture: Math.random() * 100,
    // ...other properties
  });
}
```

### Test Error States
```javascript
// In AuthContext.js signIn:
// Comment out actual logic and force errors
if (true) {
  return { success: false, error: 'Test error message' };
}
```

---

## Common Issues & Solutions

### Issue: App Won't Start
**Cause**: Missing dependencies
**Solution**: 
```bash
rm -rf node_modules
npm install
npm start
```

### Issue: "Cannot find module" Error
**Cause**: Incorrect import path
**Solution**: Check the file path matches exactly (case-sensitive on some systems)

### Issue: Keyboard Covers Input
**Cause**: No scroll view wrapping inputs
**Solution**: Wrap screen in `<ScrollView>` or use `<KeyboardAvoidingView>`

### Issue: Plant Data Not Persisting
**Cause**: AsyncStorage not saving properly
**Solution**: Check `savePlants()` is called, verify AsyncStorage permissions

### Issue: Navigation Not Working
**Cause**: Navigation prop not passed to component
**Solution**: Ensure navigation is passed via props or use `useNavigation()` hook

---

## Performance Tips

### 1. Use FlatList for Long Lists
```javascript
import { FlatList } from 'react-native';

<FlatList
  data={plants}
  renderItem={({ item }) => <PlantCard plant={item} />}
  keyExtractor={item => item.id}
  numColumns={1}
  maxToRenderPerBatch={10}
/>
```

### 2. Memoize Expensive Calculations
```javascript
import { useMemo } from 'react';

const filteredPlants = useMemo(() => {
  return plants.filter(p => p.moisture < 40);
}, [plants]);
```

### 3. Use useCallback for Callbacks
```javascript
import { useCallback } from 'react';

const handleWater = useCallback(async (plantId) => {
  await waterPlant(plantId);
}, [waterPlant]);
```

### 4. Avoid Unnecessary Re-renders
```javascript
// Use PureComponent or React.memo for components
import React from 'react';

const PlantCard = React.memo(({ plant, onWater }) => {
  // Only re-renders if plant or onWater changes
});
```

---

## Debugging Tips

### View Console Logs
```bash
npm start
# Console appears in terminal where npm start runs
# Use: console.log('Debug message')
```

### Inspect AsyncStorage
```javascript
// Add this temporarily in App.js
useEffect(() => {
  AsyncStorage.getAllKeys().then(keys => {
    console.log('All keys:', keys);
    keys.forEach(key => {
      AsyncStorage.getItem(key).then(value => {
        console.log(`${key}:`, value);
      });
    });
  });
}, []);
```

### Use React DevTools
```bash
# Install React DevTools browser extension
# Open in browser at localhost:19002 (Expo web)
```

### Check Network Requests (Future)
```javascript
// Network tab in browser DevTools when using web version
npm run web
```

---

## Deployment Checklist

- [ ] Remove all console.log statements
- [ ] Test on real device
- [ ] Check all error messages are user-friendly
- [ ] Verify app doesn't crash with invalid input
- [ ] Remove hardcoded test data
- [ ] Update version in package.json and app.json
- [ ] Create production build
- [ ] Test production build locally
- [ ] Add privacy policy (if needed)
- [ ] Prepare app store descriptions
- [ ] Set up app signing certificates

---

## Build for Production

### For Expo (Simple)
```bash
# Login to Expo account
expo login

# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Check build status
expo build:status
```

### For EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build
eas build
```

---

## Future Enhancement Ideas

### Priority 2+ Features
- [ ] Push notifications for watering reminders
- [ ] Photo gallery for each plant
- [ ] Plant identification via camera
- [ ] Sharing plants with family members
- [ ] Advanced analytics & charts
- [ ] Dark mode support
- [ ] Offline mode with sync
- [ ] Multiple languages

### Backend Integration
- Replace AsyncStorage with API calls
- Use Firebase or Supabase
- Implement real-time sync
- Add cloud photos storage
- Multi-device sync

### Advanced Features
- [ ] Smart irrigation system integration
- [ ] Weather API for watering recommendations
- [ ] Plant disease detection (ML)
- [ ] Community plant tips
- [ ] Rewards & gamification
- [ ] Video tutorials
- [ ] AR plant visualization

---

## Resources

- **React Native Docs**: https://reactnative.dev
- **Expo Docs**: https://docs.expo.dev
- **React Navigation**: https://reactnavigation.org
- **AsyncStorage**: https://react-native-async-storage.github.io/async-storage/
- **Expo Notifications**: https://docs.expo.dev/guides/notifications/

---

## Questions or Issues?

1. Check the README.md
2. Check TECHNICAL.md
3. Review the code in corresponding files
4. Test with demo data
5. Check console for error messages
6. Refer to official documentation

---

**Happy Coding! 🌱**
