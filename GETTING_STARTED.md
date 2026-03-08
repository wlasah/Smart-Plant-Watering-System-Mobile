# 🚀 INSTALLATION & RUN GUIDE

## Current Status ✅

Your Smart Plant Mobile App Phase 1 is **100% complete and ready to run**!

### What's Included:
✅ Complete React Native + Expo project structure  
✅ Authentication (Login/Register/Logout)  
✅ Dashboard with statistics  
✅ Plant management system  
✅ Quick water button  
✅ Plant care guide  
✅ Push notifications setup  
✅ AsyncStorage data persistence  
✅ Bottom tab navigation  
✅ Demo data included  
✅ Comprehensive documentation  

---

## 🎬 Getting Started (Windows)

### Step 1: Install Dependencies
```powershell
cd "E:\Smart Plant Watering System\Smart-Plant-Watering-System-Mobile"
npm install
```

**Expected output**: `added XXX packages` (takes 2-5 minutes)

### Step 2: Start the App
```powershell
npm start
```

**Expected output**:
```
Starting Expo server...
✓ Expo server started
Scan the QR code with Expo Go to open your app
```

### Step 3: Open in Expo Go
- **Android**: Scan QR code with Expo Go app  
- **iOS**: Scan QR code with Camera app, tap "Open in Expo Go"  
- **Web**: Press `w` in terminal  

### Step 4: Login
Use demo account:
- **Email**: `demo@example.com`
- **Password**: `demo123`

---

## 🔍 Verify Installation

If you see any issues, run the verification:

### Windows
```powershell
.\setup.bat
```

### Mac/Linux
```bash
bash setup.sh
```

---

## 📱 What to Test First

### 1. Dashboard (Home Tab)
- [ ] See 4 stat cards
- [ ] See plants needing water
- [ ] Tap "View All Plants"

### 2. Plant List (Plants Tab)
- [ ] See all plants listed
- [ ] Try searching for "monstera"
- [ ] Try filter "Healthy"
- [ ] Tap on a plant
- [ ] Tap water button (moisture should increase)

### 3. Plant Details
- [ ] See moisture level bar
- [ ] See care requirements
- [ ] See watering history
- [ ] Tap "Water Plant" button
- [ ] Moisture increases by 20%

### 4. Care Guide (Guide Tab)
- [ ] See 6 care sections
- [ ] Read tips about watering, light, etc.

---

## 🐛 Troubleshooting

### "npm: command not found"
**Problem**: Node.js not installed  
**Solution**: 
1. Go to https://nodejs.org
2. Download LTS version
3. Install it
4. Restart PowerShell
5. Verify: `node --version`

### "Cannot find module '@react-native-async-storage/async-storage'"
**Problem**: Dependencies not installed  
**Solution**:
```powershell
rm -r node_modules
Remove-Item package-lock.json
npm install
```

### "Expo Go won't connect"
**Problem**: WiFi or firewall issue  
**Solutions**:
```powershell
# Try localhost connection
npm start -- --localhost

# Or tunnel connection
npm start -- --tunnel
```

### "Blank white screen after login"
**Problem**: Components not rendering  
**Solutions**:
1. Check browser console for errors: `npm start` (shows in PowerShell)
2. Try hot reload: Shake phone or press `Ctrl+M` in Android
3. Restart Expo: Press `q` in PowerShell, then `npm start` again

### "Plants not appearing after adding"
**Problem**: AsyncStorage sync issue  
**Solution**:
1. Close and reopen app
2. Force refresh: swipe down on dashboard
3. Clear app data and restart

### "Login always fails with demo account"
**Problem**: Demo account not initialized  
**Solution**:
1. Check browser console for errors
2. Clear app data: Settings → Apps → [App Name] → Clear Data
3. Reinstall app: `npm start` again

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Full feature documentation |
| `QUICKSTART.md` | 5-minute quick start |
| `TESTING_CHECKLIST.md` | QA testing guide |
| `DEVELOPER_GUIDE.md` | Code patterns & customization |
| `TECHNICAL.md` | Architecture & data flow |

---

## 🔄 Development Workflow

### Making Code Changes
1. Edit any file in `src/`
2. App auto-reloads (hot reload)
3. Changes visible in 1-2 seconds

### Testing Changes
```powershell
# Restart app
npm start

# Do a clean rebuild
npm start -c
```

### Adding New Packages
```powershell
npm install package-name
```

### Stopping Expo Server
Press `q` in PowerShell terminal

---

## 📋 Project Structure

```
Smart-Plant-Watering-System-Mobile/
├── 📄 App.js                    ← Main entry point
├── 📄 app.json                  ← Expo config
├── 📄 package.json              ← Dependencies
│
├── 📁 src/
│   ├── 📁 screens/              ← All app pages
│   ├── 📁 components/           ← UI components
│   ├── 📁 context/              ← State management
│   ├── 📁 hooks/                ← Custom hooks
│   ├── 📁 navigation/           ← Navigation setup
│   ├── 📁 utils/                ← Helpers & services
│   └── 📁 styles/               ← Global styles
│
├── 📄 README.md
├── 📄 QUICKSTART.md
├── 📄 TESTING_CHECKLIST.md
├── 📄 DEVELOPER_GUIDE.md
└── 📄 TECHNICAL.md
```

---

## 🎯 Next Steps

### 1. Run the App (5 minutes)
```powershell
cd "E:\Smart Plant Watering System\Smart-Plant-Watering-System-Mobile"
npm install
npm start
# Scan QR code with Expo Go
```

### 2. Test Features (10 minutes)
- Login with demo account
- Water a plant
- Add a new plant
- Search and filter
- View care guide

### 3. Customize (Optional)
- Change colors in screens
- Modify demo plants
- Add new features
- See DEVELOPER_GUIDE.md for examples

### 4. Deploy (Later)
- Build for production
- Submit to App Store/Play Store
- See documentation for details

---

## 💡 Pro Tips

1. **Use Expo Go**: Fastest way to test during development
2. **Hot Reload**: Changes appear instantly when you save files
3. **Demo Account**: Always available for testing
4. **AsyncStorage**: Data persists between app restarts
5. **Clear Data**: If something breaks, clear app data and restart

---

## 🆘 Getting Help

| Issue | Check |
|-------|-------|
| App won't start | Dependencies installed? See troubleshooting |
| Features not working | Console errors? Check browser/PowerShell |
| Data not saving | AsyncStorage working? Check networks tab |
| Performance issues | Too many plants? Check FlatList docs |
| Styling wrong | Device rotation? Check responsive design |

---

## ✨ Features Ready to Use

### Authentication
- ✅ Register new account
- ✅ Login with email/password
- ✅ Logout functionality
- ✅ Session persistence
- ✅ Demo account (email: demo@example.com, password: demo123)

### Dashboard
- ✅ 4 statistics cards
- ✅ Plants needing water display
- ✅ Recently watered plants
- ✅ Quick action buttons
- ✅ Pull to refresh

### Plant Management
- ✅ View all plants
- ✅ Search by name/location/type
- ✅ Filter by status (Healthy/Needs Water)
- ✅ Add new plant
- ✅ View plant details
- ✅ Water plant (+20% moisture)
- ✅ Delete plant
- ✅ Watering history

### Care Guide
- ✅ Watering tips
- ✅ Light requirements
- ✅ Temperature info
- ✅ Humidity guide
- ✅ Fertilizing tips
- ✅ Problem solving

---

## 🌱 You're All Set!

Everything is ready to go. Just run:

```powershell
cd "E:\Smart Plant Watering System\Smart-Plant-Watering-System-Mobile"
npm install
npm start
```

Scan the QR code and start managing your plants! 🌿

---

**Questions?** Check QUICKSTART.md or DEVELOPER_GUIDE.md

**Ready to test?** Follow the "Getting Started" section above

**Want to customize?** See DEVELOPER_GUIDE.md for code examples

---

**Happy plant watering! 🌱💧**
