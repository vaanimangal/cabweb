# 🚖 CabWeb

A modern full-stack cab booking web application built using the MERN Stack with Firebase Authentication. This platform provides a clean, responsive, and intuitive cab booking experience where users can securely register using OTP, customize rides, manage profiles, and book trips.

---

# 📌 Project Overview

CabWeb is designed to simplify cab booking while delivering a professional user experience.

The application allows users to:

- Register/Login using Mobile OTP
- Book One-way or Round Trips
- Choose Vehicle Type
- Select Fuel Preference
- Select Preferred Driver Language
- Select Accessibility Preferences (Pet-Friendly or Wheelchair-Friendly)
- View Driver Searching Interface
- Manage Personal Profile
- View Booking History
- Securely store user data in MongoDB

---

# ✨ Features

## 🔐 Authentication

- Firebase Phone OTP Authentication
- Secure Login & Registration
- Persistent Login using Local Storage
- Automatic Session Handling

---

## 🚖 Cab Booking

Users can:

- Choose Trip Type
  - One Way
  - Round Trip

- Pickup Location

- Destination

- Trip Start Date & Time

- Trip End Date & Time

- Vehicle Selection

  - Sedan
  - SUV
  - Innova
  - Hatchback

- Fuel Preference

  - Petrol
  - Diesel
  - CNG
  - Electric

- Driver Language

  - English
  - Hindi
  - Both English and Hindi

- Accessibility

  - Pet Friendly
  - Wheelchair Friendly

---

## 👤 User Dashboard

- Professional User Profile
- Edit Name
- Member Since Information
- Logout
- Profile Avatar

---

## 📖 My Bookings

Users can

- View all bookings
- Booking Status
- Pickup & Destination
- Vehicle Details
- Fuel Type
- Booking Date
- Fare (Future Integration)

---

## 🚗 Driver Searching Screen

Interactive driver search interface featuring

- Animated driver search experience
- Estimated waiting time
- Smooth ride confirmation flow

---

## 💾 Database

MongoDB stores

### Users

- Name
- Mobile Number
- Firebase UID
- Created Date

### Bookings

- Pickup
- Destination
- Trip Type
- Vehicle
- Fuel
- Language
- Accessibility
- Start Time
- End Time
- Booking Status
- Fare
- User Reference

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- CSS3
- React Icons

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB Atlas
- Mongoose

---

## Authentication

- Firebase Authentication
- Phone OTP Verification
- Invisible reCAPTCHA

---

# 📂 Project Structure

```
cabweb
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
│
├── src
│   ├── Components
│   ├── Pages
│   ├── firebase
│   ├── styles
│   ├── App.js
│   └── index.js
│
├── public
│
├── package.json
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/vaanimangal/cabweb.git
```

Move inside project

```bash
cd cabweb
```

---

# 📦 Install Frontend Dependencies

```bash
npm install
```

---

# 📦 Install Backend Dependencies

```bash
cd backend

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Firebase configuration should be added inside

```
src/firebase/firebase.js
```

---

# ▶ Running the Frontend

From project root

```bash
npm start
```

Runs on

```
http://localhost:3000
http://192.168.1.8:3000
```

---

# ▶ Running the Backend

Open another terminal

```bash
cd backend

npm start
```

Runs on

```
http://localhost:5000
```

---

# 🚀 Current Workflow

```
Register/Login
        │
        ▼
Firebase OTP Authentication
        │
        ▼
User Stored in MongoDB
        │
        ▼
Fill Trip Details
        │
        ▼
Select Vehicle
        │
        ▼
Driver Searching Screen
        │
        ▼
Booking (MongoDB Integration)
        │
        ▼
My Bookings
        │
        ▼
View Booking History
```

---

# 📱 Screens Included

- Landing / home Page
- Login
- Register
- OTP Verification
- Booking Form section under home page
- Vehicle Selection under home page
- Driver Loading page
- User Profile dropdown
- User Profile Page
- My Bookings Page

---

# 🔒 Security

- Firebase OTP Authentication
- MongoDB Data Storage
- Express API
- Environment Variables
- Input Validation

---

# 🌟 Future Enhancements

- Google Maps Integration
- Live Driver Tracking
- Driver Dashboard
- Ride Cancellation
- Driver Ratings
- Ride History Analytics
- Push Notifications
- Wallet System
- Coupon Codes
- Admin Dashboard
- Real-time Driver Matching using Socket.io

---

#  Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 📷 Project Preview

> A modern, responsive cab booking platform built using the MERN Stack with Firebase Authentication, offering a seamless ride-booking experience through an intuitive user interface.

---

---

# 📄 License

This project is intended for educational and portfolio purposes.

# 👩‍💻 Developed By

**Vaani Mangal**

A Full Stack Web Development project demonstrating modern MERN development practices, Firebase Authentication, REST APIs, responsive UI design, and MongoDB integration.

---

## ⭐ If you like this project, don't forget to star the repository.