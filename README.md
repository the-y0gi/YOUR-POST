# Your-Post

A full-stack social media application built with the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to register, verify their accounts via OTP, create posts with images, and manage their own content through a personal dashboard.

## 🚀 Features

- **User Authentication:**
  - Secure Signup and Login functionality.
  - Email-based OTP verification for new accounts.
  - JWT-based protected routes.
- **Post Management:**
  - Create, view, and manage posts.
  - Image upload support using Cloudinary and Multer.
  - Dedicated "My Posts" section for users to manage their own content.
- **Modern UI/UX:**
  - Built with React 19 and Vite.
  - Fully responsive design powered by Tailwind CSS 4.
  - Smooth animations and transitions using Framer Motion.
  - Beautiful toast notifications for user feedback.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Routing:** React Router DOM v7
- **State Management & API:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **File Uploads:** Multer, Cloudinary
- **Email Service:** Nodemailer

## 📂 Project Structure

```text
your-post/
├── backend/            # Express server and APIs
│   ├── config/         # Database and Cloudinary configuration
│   ├── controller/     # Request handlers
│   ├── middleware/     # Custom middlewares (auth, upload, etc.)
│   ├── model/          # Mongoose database models
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic (email, posts, users)
│   ├── utils/          # Utility functions
│   └── app.js          # Entry point for backend
│
└── frontend/           # React frontend application
    ├── public/         # Static assets
    ├── src/            # React source code
    │   ├── pages/      # Page components (Auth, Dashboard, Profile)
    │   └── App.jsx     # Main application routing
    ├── package.json    # Frontend dependencies
    └── vite.config.js  # Vite configuration
```

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Cloudinary](https://cloudinary.com/) Account (for image uploads)

### 1. Clone the repository

```bash
git clone <repository-url>
cd your-post
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the backend server:

```bash
node app.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory and add the necessary environment variables (e.g., your backend API URL):

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

## 📝 License

This project is licensed under the ISC License.
