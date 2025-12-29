# Environment Setup Guide

This document explains how to set up the environment variables for ByteBuddy.

## Backend Setup

1. Create a `.env` file in the `backend` directory
2. Copy the example file: `backend/.env.example` to `backend/.env`
3. Fill in the required values:

### Required Variables:
- `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/bytebuddy`)
- `PORT`: Server port (default: 5000)
- `CORS_ORIGIN`: Frontend URL (default: `http://localhost:5173`)

### Firebase Admin (Required for Authentication):
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_PRIVATE_KEY`: Your Firebase service account private key (must include `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
- `FIREBASE_CLIENT_EMAIL`: Your Firebase service account email

### Optional:
- `GEMINI_API_KEY`: For AI description enhancement features
- `NODE_ENV`: Set to `development` or `production`

## Frontend Setup

1. Create a `.env` file in the `frontend` directory
2. Copy the example file: `frontend/.env.example` to `frontend/.env`
3. Fill in the required values:

### Required Variables:
- `VITE_API_URL`: Backend API URL (default: `http://localhost:5000/api`)
- `VITE_SOCKET_URL`: Socket.io server URL (default: `http://localhost:5000`)
- `VITE_FIREBASE_API_KEY`: Firebase web API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase auth domain (usually `your-project-id.firebaseapp.com`)
- `VITE_FIREBASE_PROJECT_ID`: Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket (usually `your-project-id.appspot.com`)
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Firebase app ID

## Getting Firebase Credentials

### Frontend (Web App):
1. Go to Firebase Console → Project Settings → General
2. Scroll to "Your apps" section
3. Select your web app or create one
4. Copy the configuration values

### Backend (Service Account):
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the values:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the quotes and newlines)
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

## Notes

- Never commit `.env` files to git (they're in `.gitignore`)
- The `.env.example` files serve as templates
- Make sure your MongoDB is running before starting the backend
- The backend defaults to port 5000, frontend (Vite) defaults to port 5173

