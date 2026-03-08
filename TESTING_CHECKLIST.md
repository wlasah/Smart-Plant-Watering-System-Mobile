# 🧪 Smart Plant Mobile - Testing Checklist

## Pre-Testing Setup
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Scan QR code with Expo Go or press `i`/`w`
- [ ] App loads without errors
- [ ] Login screen displays

---

## Authentication Tests

### Login Functionality
- [ ] Login with demo account (demo@example.com / demo123)
- [ ] Invalid email shows validation error
- [ ] Invalid password shows validation error
- [ ] Wrong credentials show "Invalid credentials" error
- [ ] Successful login navigates to Dashboard
- [ ] User name displays in dashboard greeting

### Registration Functionality
- [ ] Navigate to Register screen
- [ ] Empty name field shows error
- [ ] Invalid email format shows error
- [ ] Password < 6 chars shows error
- [ ] Passwords not matching shows error
- [ ] Register successfully with valid data
- [ ] Auto login after registration
- [ ] New user can login with new credentials
- [ ] Duplicate email shows "already registered" error

### Session Persistence
- [ ] Login and close app
- [ ] Open app again - should stay logged in
- [ ] Logout button works
- [ ] After logout, directed to login screen
- [ ] Cannot access app without logging in again

---

## Dashboard Tests

### Statistics Display
- [ ] All 4 stat cards display (Total, Healthy, Needs Attention, Avg Moisture)
- [ ] Numbers are accurate based on plant data
- [ ] Colors are correct for each stat
- [ ] Icons display properly ✅

### Quick Actions
- [ ] "View All Plants" button navigates to Plants tab
- [ ] "Care Guide" button navigates to Guide tab

### Plant Sections
- [ ] "Needs Water" section shows only plants ≤40% moisture
- [ ] "Recently Watered" shows plants sorted by highest moisture
- [ ] Plant cards display correctly in both sections
- [ ] Each plant shows name, location, moisture, last watered

### Plant Card Interactions
- [ ] Tapping plant card navigates to detail page
- [ ] Water button updates moisture instantly
- [ ] Water button shows only on card (not duplicated)
- [ ] Moisture bar reflects accurate percentage
- [ ] Color changes based on moisture level

### Pull to Refresh
- [ ] Swipe down refreshes data
- [ ] Stats update after refresh
- [ ] Loading spinner shows during refresh

### Empty State
- [ ] On first login (no plants), empty state displays
- [ ] Empty state message is clear
- [ ] "Add Your First Plant" button works
- [ ] Button navigates to add plant screen

### User Info
- [ ] User name displays in greeting
- [ ] Logout button displays in top-right
- [ ] Logout button works (returns to login)

---

## Plant List Tests

### Search Functionality
- [ ] Search by plant name works
- [ ] Search by location works
- [ ] Search by plant type works
- [ ] Search is case-insensitive
- [ ] Clear button appears when searching
- [ ] Clear button resets search

### Filter Functionality
- [ ] "All" shows all plants
- [ ] "Healthy" shows only plants > 40% moisture
- [ ] "Needs Water" shows only plants ≤ 40% moisture
- [ ] Filter buttons highlight when active
- [ ] Filters work together with search

### Plant Count
- [ ] Results count shows correct number
- [ ] Count updates with search/filter changes

### Add Plant Button
- [ ] Button visible on screen
- [ ] Navigates to Add Plant screen
- [ ] Form displays correctly

### Plant Cards
- [ ] All plant cards render
- [ ] Moisture bars show correct percentages
- [ ] Colors are accurate (green/blue/red)
- [ ] Last watered text displays
- [ ] Water buttons work on all cards
- [ ] Clicking card navigates to detail

### Empty State
- [ ] No search results shows appropriate message
- [ ] Message says "No Plants Found"

---

## Plant Detail Tests

### Plant Information Display
- [ ] Plant name displays in header
- [ ] Plant type displays in header
- [ ] Location section shows correct location
- [ ] All care requirements display (Water, Light, Temp)
- [ ] Values are accurate

### Moisture Display
- [ ] Moisture percentage shows large
- [ ] Moisture bar fills correctly
- [ ] Moisture status label is accurate
- [ ] Last watered time is correct
- [ ] Time format is readable (e.g., "2 days ago")

### Watering History
- [ ] Last 5 waterings display in reverse order
- [ ] Date and time format is correct
- [ ] Amount (ml) displays correctly
- [ ] Empty history shows nothing (no section)

### Water Plant Button
- [ ] Button is prominent and clickable
- [ ] Watering increases moisture by 20%
- [ ] Moisture caps at 100%
- [ ] Confirmation message shows
- [ ] History updates with new watering entry
- [ ] Button still works after multiple waterings

### Delete Plant Button
- [ ] Button displays at bottom
- [ ] Confirmation dialog appears
- [ ] Cancel cancels deletion
- [ ] Confirming deletion removes plant
- [ ] Navigation returns to plant list after deletion
- [ ] Deleted plant no longer appears in list

### Back Button
- [ ] Back button returns to previous screen
- [ ] Back button works from any entry point

---

## Care Guide Tests

### Content Display
- [ ] All 6 sections display (Watering, Light, Temp, Humidity, Fertilizing, Problems)
- [ ] Each section has correct emoji
- [ ] Each section shows 5-6 tips
- [ ] Tips are readable and helpful
- [ ] Footer message displays

### Scrolling
- [ ] Content scrolls smoothly
- [ ] All sections accessible
- [ ] No content cut off

### Navigation
- [ ] Navigation back to other tabs works
- [ ] Care Guide accessible from Dashboard button
- [ ] Care Guide accessible from bottom tab

---

## Add Plant Tests

### Form Display
- [ ] All 4 fields display: Name, Type, Location, Frequency
- [ ] Placeholders are helpful
- [ ] Input fields are responsive

### Form Validation
- [ ] Empty name field blocks submission
- [ ] Empty type field blocks submission
- [ ] Empty location field blocks submission
- [ ] Successful submission with all fields
- [ ] Success message shows
- [ ] Navigates back to plant list
- [ ] New plant appears in list

### Form Input
- [ ] Name field accepts text
- [ ] Type field accepts text
- [ ] Location field accepts text
- [ ] Frequency field accepts numbers
- [ ] Cannot submit while loading

---

## Navigation Tests

### Bottom Tab Navigation
- [ ] 3 tabs display: 🏠 Home, 🌱 Plants, 🌿 Guide
- [ ] Switching tabs works smoothly
- [ ] Active tab is highlighted (green)
- [ ] Tab icons display correctly

### Stack Navigation
- [ ] Home → Plant Detail works
- [ ] Plants → Plant Detail works
- [ ] Plants → Add Plant works
- [ ] Back buttons work from details
- [ ] No stuck navigation states

### Deep Linking
- [ ] Can return to previous screens
- [ ] Tab bar visible on all main screens
- [ ] Header buttons work correctly

---

## Performance Tests

### Load Times
- [ ] App starts in < 5 seconds
- [ ] Plant list loads instantly
- [ ] Plant detail loads instantly
- [ ] No freezing during interactions

### Data Updates
- [ ] Watering reflects instantly
- [ ] Search filters instantly
- [ ] Navigation is smooth (no lag)

### Memory
- [ ] App doesn't crash after 5+ minutes usage
- [ ] Watering 20+ plants doesn't cause issues
- [ ] Search/filter on 50+ plants works smoothly

---

## Device Tests

### iOS (if available)
- [ ] App runs on iPhone
- [ ] All features work
- [ ] Layout looks correct

### Android
- [ ] App runs on Android device/emulator
- [ ] All features work
- [ ] Layout looks correct
- [ ] Back button behaves correctly

### Tablet
- [ ] Layout adapts to larger screen
- [ ] Touch targets are adequate
- [ ] No stretched components

---

## Error Handling Tests

### Network Errors (Future API Integration)
- [ ] Graceful error messages
- [ ] Retry options available
- [ ] No app crashes

### Input Validation
- [ ] Invalid emails rejected
- [ ] Short passwords rejected
- [ ] Empty fields blocked
- [ ] Error messages are helpful

### Edge Cases
- [ ] Very long plant names handled
- [ ] Special characters in text accepted
- [ ] 0% and 100% moisture handled
- [ ] Deleting last plant shows empty state

---

## Test Summary

### Passing Tests: _____ / _____
### Failed Tests: _____ / _____
### Issues Found:
- [ ] Issue 1: ________________
- [ ] Issue 2: ________________
- [ ] Issue 3: ________________

---

## Notes
```
[Add any additional observations or issues here]
```

---

## Sign-off
- **Tested By:** _______________
- **Date:** _______________
- **Device:** _______________
- **Status:** ☐ PASS ☐ FAIL
