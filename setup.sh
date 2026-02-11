#!/bin/bash

echo "========================================"
echo "ProJEMS - Event Management System Setup"
echo "========================================"
echo ""

echo "[1/4] Setting up Backend..."
cd server
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please edit server/.env with your MongoDB URI and JWT secret"
    read -p "Press enter to continue..."
fi
echo "Installing backend dependencies..."
npm install
echo "Backend setup complete!"
echo ""

echo "[2/4] Setting up Frontend..."
cd ../client
echo "Installing frontend dependencies..."
npm install
echo "Frontend setup complete!"
echo ""

echo "[3/4] Setup Complete!"
echo ""
echo "========================================"
echo "Next Steps:"
echo "========================================"
echo "1. Make sure MongoDB is running"
echo "2. Edit server/.env if needed"
echo "3. Open TWO terminal windows:"
echo ""
echo "   Terminal 1 - Backend:"
echo "   cd server"
echo "   npm run dev"
echo ""
echo "   Terminal 2 - Frontend:"
echo "   cd client"
echo "   npm run dev"
echo ""
echo "4. Open browser: http://localhost:5173"
echo "========================================"
echo ""

read -p "[4/4] Would you like to start the servers now? (y/n): " start

if [ "$start" = "y" ] || [ "$start" = "Y" ]; then
    echo "Starting servers..."
    
    # Start backend in new terminal
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        osascript -e 'tell app "Terminal" to do script "cd '"$PWD"'/../server && npm run dev"'
        sleep 2
        osascript -e 'tell app "Terminal" to do script "cd '"$PWD"' && npm run dev"'
    else
        # Linux
        gnome-terminal -- bash -c "cd ../server && npm run dev; exec bash" 2>/dev/null || \
        xterm -e "cd ../server && npm run dev" 2>/dev/null || \
        echo "Please start backend manually: cd server && npm run dev"
        
        sleep 2
        
        gnome-terminal -- bash -c "cd . && npm run dev; exec bash" 2>/dev/null || \
        xterm -e "npm run dev" 2>/dev/null || \
        echo "Please start frontend manually: cd client && npm run dev"
    fi
    
    echo ""
    echo "Servers starting in new windows..."
    echo "Frontend: http://localhost:5173"
    echo "Backend: http://localhost:5000"
else
    echo ""
    echo "Setup complete! Start servers manually when ready."
fi

echo ""
echo "Press any key to exit..."
read -n 1
