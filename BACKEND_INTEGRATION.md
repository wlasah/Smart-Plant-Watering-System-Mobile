# Mobile App - Backend Integration Guide

## ✅ What's Been Updated

Your mobile app has been updated to connect to the Django backend instead of using local AsyncStorage.

### Files Modified:
1. **`src/services/api.js`** - New API service file
2. **`src/context/AuthContext.js`** - Updated to use backend authentication
3. **`src/context/PlantContext.js`** - Updated to use backend API for plants

---

## 🔧 Configuration

### Important: Update Backend URL

Before running the mobile app, you need to configure the correct backend URL.

1. Open: `src/services/api.js`
2. Find this line (around line 5):
```javascript
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

3. **For local development on same machine:**
   - Keep it as `http://127.0.0.1:8000/api` (only if testing on Android emulator on same machine)

4. **For physical device or remote machine:**
   - Replace with your machine's IP address
   - Find IP by running in PowerShell: `ipconfig`
   - Look for "IPv4 Address" (e.g., `192.168.100.5`)
   - Change to: `http://192.168.100.5:8000/api`

---

## 🚀 Features

### Authentication
- ✅ Login with username and password
- ✅ Register new user accounts
- ✅ Automatic token storage
- ✅ Logout and token cleanup

### Plants Management
- ✅ Fetch all plants from backend
- ✅ Create new plants
- ✅ Update plant information
- ✅ Delete plants
- ✅ Water plants (record watering)
- ✅ Get plant statistics

### Auto-Refresh
- ✅ Plants list auto-refreshes every 30 seconds
- ✅ Always synced with backend

---

## 📝 Usage in Components

### Login Screen
```javascript
import { useAuth } from '../hooks/useAppHooks';

export const LoginScreen = () => {
  const { signIn } = useAuth();
  
  const handleLogin = async (username, password) => {
    const result = await signIn(username, password);
    if (result.success) {
      // Navigate to main app
    } else {
      Alert.alert('Login Failed', result.error);
    }
  };
  
  // ... rest of component
};
```

### Get Plants
```javascript
import { usePlants } from '../hooks/useAppHooks';
import { useFocusEffect } from '@react-navigation/native';

export const PlantsScreen = () => {
  const { plants, loading, getPlantStats } = usePlants();
  
  // Fetch stats when screen is focused
  useFocusEffect(
    useCallback(() => {
      getPlantStats();
    }, [getPlantStats])
  );
  
  if (loading) return <ActivityIndicator />;
  
  return (
    <FlatList
      data={plants}
      renderItem={({ item }) => <PlantCard plant={item} />}
    />
  );
};
```

### Water a Plant
```javascript
import { useAlert } from '@react-native-alert';

const { waterPlant } = usePlants();

const handleWaterPlant = async (plantId) => {
  const result = await waterPlant(plantId, 'Watered plants today');
  if (result.success) {
    Alert.alert('Success', 'Plant watered! 💧');
  } else {
    Alert.alert('Error', result.error);
  }
};
```

### Add New Plant
```javascript
const { addPlant } = usePlants();

const handleAddPlant = async (plantData) => {
  const result = await addPlant({
    name: 'Monstera',
    type: 'Tropical Plant',
    location: 'Living Room',
    careRequirements: {
      waterFrequency: 'Every 7 days',
      lightRequirement: 'Bright indirect light',
      temperature: '68-86°F'
    }
  });
  
  if (result.success) {
    Alert.alert('Success', 'Plant added!');
  }
};
```

---

## ⚙️ How It Works

### Authentication Flow
1. User enters username and password
2. App calls `authAPI.login(username, password)`
3. Backend verifies and returns token
4. Token is stored in AsyncStorage
5. Subsequent requests include token in Authorization header

### Plant Operations
1. App calls `plantsAPI.getPlants()`
2. API helper adds token to request
3. Backend validates token and returns user's plants
4. Plants are stored in React state
5. UI updates automatically

### Error Handling
All API errors are caught and returned as objects:
```javascript
{
  success: false,
  error: 'Error message here'
}
```

---

## 🐛 Testing

### Test Backend Connection

1. **Check if Django server is running:**
   - Visit `http://127.0.0.1:8000/admin/` in browser
   - Should see Django admin login

2. **Test API endpoint:**
   ```bash
   curl http://127.0.0.1:8000/api/users/me/
   ```
   Should return 401 (expected, no token provided)

3. **Check logs:**
   - Watch Django terminal for errors and requests

---

## 📚 Default Test User

Created for testing:
- **Username**: `user1`
- **Password**: `TestPass123`
- **Token**: Use Thunder Client to get token (see django-backend docs)

---

## ⚠️ Important Notes

1. **AsyncStorage Still Used For:**
   - Token storage
   - User data cache

2. **NO MORE LOCAL DEMO DATA:**
   - App starts empty until user logs in
   - All data comes from backend
   - Create/update/delete syncs to backend

3. **Internet Required:**
   - Mobile app now requires backend connection
   - Works on same network or VPN

4. **Auto-Refresh:**
   - Plants refresh every 30 seconds
   - Use `useFocusEffect` to refresh on screen focus

---

## 🆘 Troubleshooting

### "Authentication credentials were not provided"
- Check if token is saved in AsyncStorage
- Verify token in Authorization header
- Re-login if token expired

### "Network request failed"
- Check backend URL in `src/services/api.js`
- Verify Django server is running
- Test with Thunder Client first
- Check firewall/Wi-Fi permissions

### "Plant not found" or 404 errors
- Ensure you're logged in with correct user
- Plants belong to specific users (not shared)
- Check Django admin that plant exists

### Data not updating
- Check browser console for errors
- Watch Django terminal for error messages
- Verify token is valid
- Try refreshing screen

---

## 📞 Need Help?

See these files for more info:
- Django API docs: `django-backend/API_DOCUMENTATION.md`
- Integration guide: `django-backend/INTEGRATION_GUIDE.md`
- This app's updated contexts in `src/context/`
