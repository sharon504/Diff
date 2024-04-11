#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to run backend
run_backend() {
	echo -e "${BLUE}Starting backend server...${NC}"
	cd server
	npm i
	export PORT=2000
	export JWT_SECRET="<Your_JWT_Secret>"
	export MONGO_URL="mongodb+srv://tester:f68Lnicz1Df8GN9D@diffdb.4ccwtbi.mongodb.net/Diff"
	export GEMINI_API="<Your_Gemini_API>"
	npm run dev &
	BACKEND_PID=$!
	cd ..
}

# Function to run frontend
run_frontend() {
	echo -e "${GREEN}Starting frontend server...${NC}"
	cd client
	npm i
	npm run dev &
	FRONTEND_PID=$!
	cd ..
}

# Function to stop processes
stop_processes() {
	echo -e "${RED}Stopping processes...${NC}"
	kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
}

# Main script
run_backend
run_frontend

trap stop_processes INT TERM EXIT

echo -e "${BLUE}Both frontend and backend servers are running.${NC}"
echo -e "${BLUE}Press Ctrl+C to stop.${NC}"

wait
