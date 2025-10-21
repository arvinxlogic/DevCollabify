
---

# DevConnect 👨🏻‍💻

> A Tinder-style networking platform for developers to connect, collaborate, and build together.

## 🚀 Overview

DevConnect lets developers swipe, match, and chat with like-minded professionals. Built using React, Node.js, MongoDB, and Socket.io, it enables real-time communication, profile discovery, and premium upgrades.

## ✨ Features

* Swipe-based developer discovery
* Real-time chat with Socket.io
* Connection requests & management
* Profile creation and editing
* Premium membership via Razorpay
* Responsive, minimal UI (Tailwind + DaisyUI)

## 🛠️ Tech Stack

**Frontend:** React 18, Redux Toolkit, React Router, Axios, Tailwind CSS, DaisyUI, Socket.io Client
**Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.io, Razorpay, bcryptjs, JWT

## 📋 Prerequisites

* Node.js ≥ 16
* MongoDB ≥ 5
* Git
* Razorpay account (for payments)

## 🔧 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/devconnect.git
cd devconnect
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

**.env**

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

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

**.env**

```env
VITE_API_URL=http://localhost:3000
```

**Run:**

```bash
npm run dev
```

## 📁 Project Structure

```
Frontend/
  ├── src/
  │   ├── components/ (Feed, Chat, Login, Premium, etc.)
  │   ├── utils/ (Redux slices, socket.js)
  │   └── App.jsx, main.jsx
Backend/
  ├── models/, routes/, controllers/, middleware/, utils/
  ├── app.js, server.js
```

## 🎮 Usage

* Sign up or log in
* Swipe developers to connect
* Accept/Reject requests
* Chat in real-time
* Upgrade to Premium for unlimited swipes

## 🔐 Env Variables

| Variable              | Description           |
| --------------------- | --------------------- |
| `PORT`                | Server port           |
| `MONGO_URI`           | MongoDB URL           |
| `JWT_SECRET`          | JWT key               |
| `RAZORPAY_KEY_ID`     | Razorpay public key   |
| `RAZORPAY_KEY_SECRET` | Razorpay secret       |
| `FRONTEND_URL`        | CORS frontend URL     |
| `VITE_API_URL`        | Frontend API base URL |

## 🚀 Deployment

**Frontend**

```bash
cd Frontend
npm run build
```

**Backend**

```bash
cd Backend
npm start
```

**Checklist**

* Environment variables set
* CORS configured
* MongoDB Atlas linked
* Razorpay production keys added

## 🧪 Testing

```bash
curl http://localhost:3000/api/health
```

## 🤝 Contributing

1. Fork & branch (`feature/your-feature`)
2. Commit & push
3. Open PR

Follow ES6+, React hooks, and clean code practices.

## 📄 License

MIT License — see `LICENSE`.

## 👥 Author

**Your Name** – [GitHub](https://github.com/yourusername)

---

**Built with ❤️ for developers, by developers.**

---

