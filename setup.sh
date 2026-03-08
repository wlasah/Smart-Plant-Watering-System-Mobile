#!/bin/bash
# 🌱 Smart Plant Mobile - Installation & Testing Script

echo "🚀 Installing Smart Plant Mobile App Dependencies..."
echo ""

# Navigate to project
cd "$(dirname "$0")" || exit 1

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules found"
else
    echo "📦 Installing npm packages..."
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ npm install completed successfully"
    else
        echo "❌ npm install failed"
        exit 1
    fi
fi

echo ""
echo "📋 Project Structure Verification..."

# Check key files
files=(
    "package.json"
    "app.json"
    "App.js"
    "index.js"
    "src/navigation/RootNavigator.js"
    "src/context/AuthContext.js"
    "src/context/PlantContext.js"
    "src/screens/LoginScreen.js"
    "src/screens/DashboardScreen.js"
)

missing=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
        ((missing++))
    fi
done

if [ $missing -eq 0 ]; then
    echo ""
    echo "✅ All essential files present!"
    echo ""
    echo "🎯 Next Steps:"
    echo "1. Run: npm start"
    echo "2. Scan QR code with Expo Go"
    echo "3. Login with:"
    echo "   Email: demo@example.com"
    echo "   Password: demo123"
    echo ""
    echo "🌱 Happy plant watering!"
else
    echo ""
    echo "❌ $missing file(s) missing. Please check your setup."
    exit 1
fi
