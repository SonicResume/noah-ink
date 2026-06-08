NOAH INK / SONICWRITE

========================
SETUP
========================

1. Install dependencies

npm install


========================
BACKEND (API)
========================

Start backend (port 3004)

cd backend
node server.js

OR with PM2:

pm2 start server.js --name backend-sonicwrite


========================
FRONTEND (PRODUCTION)
========================

Build frontend

npm run build

Serve frontend

npx serve -s dist -l 4174

OR with PM2:

pm2 start "npx serve -s dist -l 4174" --name sonicwrite


========================
DEV MODE (OPTIONAL)
========================

npm run dev

(default: http://localhost:5173)


========================
PM2 COMMANDS
========================

Start:
pm2 start server.js --name backend-sonicwrite
pm2 start "npx serve -s dist -l 4174" --name sonicwrite

Restart:
pm2 restart all

Stop:
pm2 delete backend-sonicwrite
pm2 delete sonicwrite

List:
pm2 list


========================
API ENDPOINTS
========================

Health:
GET /api/health

AI Process:
POST /api/process

Stripe Checkout:
POST /api/pay

Contact:
POST /api/contact


========================
PORTS
========================

Backend: 3004
Frontend: 4174


========================
NOTES
========================

- Make sure Stripe keys are in .env
- Backend must be running before frontend calls API
- Use localhost:3004 for API in frontend
- Only ONE PM2 process for frontend

========================
DONE
========================