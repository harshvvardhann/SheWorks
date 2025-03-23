# SheWorks - Empowering Women in Work & Entrepreneurship

## 🚀 Overview

**SheWorks** is a platform designed to encourage and support women in work, entrepreneurship, and financial literacy. The platform connects mentors, entrepreneurs, and investors while providing essential resources for business growth, personal development, and financial literacy.

### Key Features:

-   **Homepage:** An interactive landing page showcasing the platform's key features.
-   **Gemini AI Integration:** AI-powered tools for personalized learning and mentoring.
-   **Leaderboard:** Displaying top mentors, entrepreneurs, and investors.
-   **Business List:** A directory of businesses and startups led by women.
-   **Financial Learning Platform:** Offering courses and resources for financial literacy.
-   **Mentor's List:** A list of available mentors for guidance and support.
-   **About Us:** Information about the mission and vision of SheWorks.
-   **User Authentication:** Secure signup and login forms for various roles: entrepreneurs, investors, and mentors.
-   **Registration Forms:** Customized forms for mentors, entrepreneurs, and investors to register and create profiles.

## ⚙️ Technologies Used

-   **Frontend:**

    -   Vite
    -   React
    -   React Router for navigation
    -   Gemini AI integration

-   **Backend:**
    -   Node.js
    -   Express
    -   JWT Authentication
    -   Bcrypt for password hashing
    -   Nodemailer for sendMail functionality

## 🛠 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sheworks.git
```

### 2. Frontend Setup (Vite + React)

Navigate to the frontend directory and install dependencies:

```bash
cd sheworks/frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

### 3. Backend Setup (Node.js + Express)

Navigate to the backend directory and install dependencies:

```bash
cd sheworks/backend
npm install
```

Start the backend server:

```bash
npm start
```

## 📝 Routes & Middleware

### User Routes:

-   **POST /api/auth/signup**: Register a new user (entrepreneur, mentor, investor).
-   **POST /api/auth/login**: Login for existing users (JWT authentication).
-   **POST /api/auth/forgot-password**: Forgot password request.

### Business Routes:

-   **GET /api/business/list**: Get the list of businesses run by women entrepreneurs.
-   **GET /api/business/:id**: Get detailed information about a specific business.

### Mentor Routes:

-   **GET /api/mentors**: Get the list of available mentors.
-   **POST /api/mentors/register**: Register as a mentor.

### Financial Learning Routes:

-   **GET /api/financial-learning**: Get financial learning resources.

### Middleware:

-   **authMiddleware.js**: Secures routes by verifying JWT tokens.
-   **roleMiddleware.js**: Ensures the user has the required role (entrepreneur, mentor, or investor).

## 🛡 Authentication

-   **JWT Authentication**: The app uses JWT tokens for user authentication.
-   **Password Hashing**: Bcrypt is used to hash and store user passwords securely.

## 💌 SendMail Functionality

-   **Nodemailer Integration**: Nodemailer is used for sending emails for actions like account confirmation, password reset, and more.

## 📋 Registration Forms

Custom registration forms for the following roles:

-   **Mentor**: A mentor profile with expertise and availability.
-   **Entrepreneur**: Entrepreneurs can register their business details and needs.
-   **Investor**: Investors can register and express interest in funding women-led startups.

## 📈 Gemini AI Integration

The Gemini AI integration provides personalized learning experiences, connecting entrepreneurs with relevant mentors, investors, and resources based on their business stage and needs.

## 🤖 Leaderboard

A leaderboard displaying the top mentors, entrepreneurs, and investors based on activity and contributions to the platform.

## 📂 File Structure

```
sheworks/
├── frontend/               # React App
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
├── backend/                # Node.js + Express Server
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── .env
│   └── package.json
└── README.md
```

## ⚡ Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Make sure to follow the coding guidelines and ensure the code is well-documented.
