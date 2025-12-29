# 🎓 ByteBuddy

**ByteBuddy** is a student-focused skill marketplace that enables students to showcase their skills, post gigs, and enhance their listings using **AI-powered content generation**.  
The platform is built using the **MERN stack** and integrates **Google technologies** like **Firebase Authentication** and **Gemini AI**.

---

## 🚀 Features

- 🔐 **Google Sign-In Authentication** (Firebase)
- 🧑‍🎓 Student-only skill marketplace
- 📝 Create and post skill-based gigs
- 🤖 **AI-powered gig improvement** using Google Gemini
- 🗄 Secure data storage with MongoDB
- ⚡ Real-time updates with REST APIs

---

## 🛠 Tech Stack

### Frontend
- **React.js**
- Axios
- Vite

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB**

### Google Technologies
- **Firebase Authentication** – Google OAuth login
- **Google Gemini API** – AI-based text enhancement

---

## 🧩 Architecture Overview

The application follows a **client–server architecture**:


---

## 🔄 Application Flow

1. User logs in using **Google Sign-In**
2. Firebase returns an **ID token**
3. Frontend sends token to backend
4. Backend verifies token using Firebase Admin SDK
5. User creates a gig (title, description, price)
6. Backend stores gig in MongoDB
7. User clicks **“Improve with AI”**
8. Backend sends prompt to Gemini API
9. Gemini returns enhanced content
10. Updated description is displayed in the UI

---

## 📁 Project Structure

bytebuddy/
│
├── frontend/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── LandingPage.jsX
│   │   │   ├── Navbar.jsX
│   │   │   ├── GigCard.jsX
│   │   │   ├── CreateGigModal.jsx
│   │   │   └── ChatModal.jsx
│   │   ├── pages/             # Main application pages
│   │   │   └── Dashboard.jsx
│   │   ├── services/          # API and Firebase services
│   │   │   ├── firebase.js
│   │   │   └── api.js
│   │   ├── context/           # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
├── backend/                     # Node.js Backend
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── serviceAccountKey.json
│   ├── models/                # Mongoose schemas
│   │   ├── User.js
│   │   ├── Gig.js
│   │   └── Message.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── gigs.js
│   │   ├── users.js
│   │   └── gemini.js
│   ├── controllers/           # Route controllers
│   │   ├── gigController.js
│   │   └── userController.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js
│   ├── services/              # External services
│   │   └── gemini.js
│   ├── socket/                # Socket.io setup
│   │   └── chat.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md

1. **React Frontend** handles UI and user interactions
2. **Firebase Authentication** manages Google Sign-In
3. **Node.js + Express Backend** verifies authentication tokens and handles business logic
4. **MongoDB** stores users and gigs
5. **Gemini AI (REST API)** enhances gig descriptions using generative AI

