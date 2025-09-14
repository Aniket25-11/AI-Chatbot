# 🤖 Aniket's AI Chatbot

This is a modern real-time chatbot application built with **React
(Vite)** on the frontend and **Node.js + Express + Socket.IO** on the
backend, integrated with **Google Gemini AI API** for conversational
intelligence.

------------------------------------------------------------------------

## ✨ Features

-   ⚡ Real-time communication via **Socket.IO**
-   🎨 Clean UI with **Light/Dark theme toggle**
-   💬 AI-powered responses from **Google Gemini**
-   🕑 Chat history persistence (in-memory, can be extended to DB)
-   📱 Fully responsive design for mobile, tablet, and desktop
-   🌐 Configurable for **local development** and **production
    deployment**

------------------------------------------------------------------------

## 📂 Project Structure

    AI Chatbot/
    ├── Backend/          # Node.js backend (Express + Socket.IO + Gemini API)
    │   ├── src/
    │   │   ├── app.js
    │   │   ├── service/
    │   │   │   └── ai.service.js
    │   └── server.js
    ├── Frontend/         # React frontend (Vite + TailwindCSS)
    │   ├── src/
    │   │   ├── App.jsx
    │   │   ├── components/
    │   │   │   ├── ChatWindow.jsx
    │   │   │   ├── Header.jsx
    │   │   │   └── MessageBubble.jsx
    │   └── index.css
    └── README.md

------------------------------------------------------------------------

## ⚙️ Tech Stack

**Frontend:** - React (Vite) - TailwindCSS - Socket.IO Client

**Backend:** - Node.js - Express.js - Socket.IO - Google Generative AI
SDK

------------------------------------------------------------------------

## 🚀 Getting Started

### 1️⃣ Clone the Repository

``` bash
git clone https://github.com/your-username/Chatbot.git
cd Chatbot
```

### 2️⃣ Backend Setup

``` bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

``` env
GOOGLE_API_KEY=your_google_gemini_api_key
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Run backend server:

``` bash
npm start
```

### 3️⃣ Frontend Setup

``` bash
cd Frontend
npm install
```

Create a `.env` file inside `Frontend/`:

``` env
VITE_BACKEND_URL=http://localhost:3000
```

Run frontend:

``` bash
npm run dev
```

------------------------------------------------------------------------

## 🌍 Deployment

-   **Frontend** → Deploy on **Vercel**
-   **Backend** → Deploy on **Render / Railway / Heroku**
-   Update `VITE_BACKEND_URL` in frontend `.env` with your deployed
    backend URL
-   Update `FRONTEND_URL` in backend `.env` with your deployed frontend
    URL

------------------------------------------------------------------------

## 📱 Responsiveness

This AI Chatbot is fully responsive and works seamlessly across: - 📱
Mobile devices - 💻 Laptops - 🖥️ Large screens

------------------------------------------------------------------------

## 🛠️ Customization

-   Change **name/logo** → Edit `Frontend/src/components/Header.jsx`
-   Update **theme styles** → `Frontend/src/index.css`
-   Extend **chat history storage** → Replace in-memory array in
    `server.js` with database (MongoDB, PostgreSQL, etc.)

------------------------------------------------------------------------

## 📝 License

This project is open-source under the **MIT License**.\
Feel free to use, modify, and distribute.

------------------------------------------------------------------------

## 🙌 Contribution

Contributions are welcome!\
- Fork the repo - Create a new branch (`feature/your-feature`) - Commit
changes - Submit a Pull Request

------------------------------------------------------------------------

## 👨‍💻 Author

Developed with ❤️ by Aniket Bhojapure \
GitHub: [Aniket25-11](https://github.com/Aniket25-11)
