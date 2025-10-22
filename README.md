---

<div align="center">

# 💫 DevConnect 👨🏻‍💻

### *Tinder-style networking for developers to connect, collaborate, and build together.*

[🌐 **Live Project**](https://connectdev.online) • [📖 Author: Arvind](https://github.com/voidloopxarvin)

</div>

---

## 🚀 Overview

**DevConnect** bridges the gap between developers — enabling them to swipe, match, and chat with like-minded professionals.
Powered by **React**, **Node.js**, **MongoDB**, and **Socket.io**, it supports real-time communication, smart matching, and premium upgrades.

---

## ✨ Core Features

✅ Swipe-based developer discovery
💬 Real-time chat using **Socket.io**
🤝 Connection requests & management
🧑‍💻 Customizable profiles (skills, bio, projects)
💳 Razorpay integration for **Premium upgrades**
📱 Fully responsive UI (built with **Tailwind CSS** + **DaisyUI**)

---

## 🧠 Tech Stack

**Frontend:**
`React 18` • `Redux Toolkit` • `React Router` • `Axios` • `Tailwind CSS` • `DaisyUI` • `Socket.io Client`

**Backend:**
`Node.js` • `Express.js` • `MongoDB` • `Mongoose` • `Socket.io` • `Razorpay` • `bcryptjs` • `JWT`

---

## 📋 Prerequisites

* Node.js ≥ 16
* MongoDB ≥ 5
* Git
* Razorpay account (for payment integration)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/devconnect.git
cd devconnect
```

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create a **.env** file inside `Backend/`

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/devconnect
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=rzp_test_XXXX
RAZORPAY_KEY_SECRET=XXXXXX
FRONTEND_URL=http://localhost:5173
```

**Start Server:**

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a **.env** file inside `Frontend/`

```env
VITE_API_URL=http://localhost:3000
```

**Run Frontend:**

```bash
npm run dev
```

---

## 🧩 Project Structure

```
DevConnect/
├── Frontend/
│   ├── src/
│   │   ├── components/       # Feed, Chat, Login, Premium, etc.
│   │   ├── utils/            # Redux slices, socket setup
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── Backend/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── middleware/
    ├── utils/
    ├── app.js
    ├── server.js
    └── package.json
```

---

## 🎮 Usage Guide

1. **Sign up / Log in**
2. **Swipe** through developer profiles
3. **Match & chat** instantly
4. **Send / accept** collaboration requests
5. **Upgrade to Premium** for unlimited swipes & exclusive features

---

## 🔐 Environment Variables

| Variable              | Description               |
| --------------------- | ------------------------- |
| `PORT`                | Backend server port       |
| `MONGO_URI`           | MongoDB connection string |
| `JWT_SECRET`          | Secret for JWT signing    |
| `RAZORPAY_KEY_ID`     | Razorpay public key       |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key       |
| `FRONTEND_URL`        | CORS whitelist URL        |
| `VITE_API_URL`        | Frontend API base URL     |

---

## 🚀 Deployment

**Frontend Build**

```bash
cd Frontend
npm run build
```

**Backend Run**

```bash
cd Backend
npm start
```

✅ **Pre-deploy Checklist**

* All `.env` variables set
* CORS configured
* MongoDB Atlas connected
* Razorpay live keys added

---

## 🧪 Quick Test

Verify backend health:

```bash
curl http://localhost:3000/api/health
```

---

## 🤝 Contributing

1. **Fork** the repo
2. **Create branch:** `feature/your-feature`
3. **Commit** your changes
4. **Push & open PR**

Follow modern coding standards — ES6+, React Hooks, modular structure, and clean commits.

---

## 👨🏻‍💻 Author

**Arvind** 

---

<div align="center">

💡 *Built with ❤️ for developers, by developers.*
**Let's connect and code the future together!**

</div>

---

