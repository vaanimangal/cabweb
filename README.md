# 🚖 CabWeb — Smart Cab Booking Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)
![Firebase](https://img.shields.io/badge/Firebase-OTP-FFCA28?style=for-the-badge&logo=firebase)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript)

### 🚖 A Modern MERN Stack Ride Booking Platform with Passenger & Driver Modules

Book rides securely using OTP authentication, manage bookings, and provide a complete dashboard experience for both passengers and drivers.

</div>

---

# 📖 About The Project

**CabWeb** is a full-stack cab booking platform inspired by modern ride-hailing applications such as **Uber** and **Ola**. Built using the **MERN Stack** and **Firebase Phone Authentication**, the platform provides a secure, responsive, and user-friendly booking experience.

Unlike a basic cab booking website, CabWeb separates the platform into two dedicated modules:

### 👤 Passenger Portal

Passengers can

- Register & Login using OTP
- Book One-way or Round Trips
- Choose Vehicle Type
- Select Fuel Preference
- Select Driver Language
- Choose Accessibility Options
- Track Booking Progress
- View Booking History
- Manage Personal Profile

### 🚗 Driver Portal

Driver partners receive a dedicated dashboard to efficiently manage their daily operations.

Drivers can

- Toggle Online / Offline Availability
- Receive Ride Requests
- Accept or Reject Trips
- View Earnings
- Monitor Weekly Performance
- Upload Important Documents
- Manage Ratings & Reviews
- Update Profile Information

---

# 🎯 Project Objectives

CabWeb aims to provide a complete ride-booking ecosystem by combining modern UI/UX with secure backend architecture.

The project focuses on:

- Delivering seamless ride booking experience
- Secure mobile OTP authentication
- Professional driver management system
- Responsive design across all devices
- Efficient MongoDB data management
- Scalable MERN architecture
- Easy future integration with Google Maps, Payments, and Socket.IO

---

# ✨ Key Highlights

- 🔐 Firebase Phone OTP Authentication
- 🚖 One-way & Round-trip Booking
- 🚗 Dedicated Driver Dashboard
- 📱 Fully Responsive Interface
- 📊 Weekly Driver Performance Analytics
- 💰 Earnings Overview
- ⭐ Passenger Ratings & Reviews
- 📄 DigiLocker-inspired Document Management
- 📖 Booking History
- 👤 User Profile Management
- ⚡ RESTful Express APIs
- 🍃 MongoDB Database Integration
- 🎨 Modern and Clean User Interface

---

# 🚀 Passenger Features

## 🔐 Authentication

CabWeb provides secure user authentication using **Firebase Phone Authentication**.

### Features

- Mobile Number Registration
- Mobile OTP Verification
- Secure Login
- Automatic Session Management
- Persistent Login using Local Storage
- Invisible Google reCAPTCHA
- Secure Firebase Authentication

---

## 🚖 Smart Ride Booking

Passengers can conveniently customize every ride before confirming the booking.

### Trip Types

- One-way Trip
- Round Trip

### Pickup & Destination

- Pickup Location
- Destination Location

### Date & Time

- Trip Start Date
- Trip End Date
- Flexible Scheduling

---

## 🚘 Vehicle Selection

Passengers can choose from multiple vehicle categories.

| Vehicle | Capacity |
|----------|----------|
| 🚗 Sedan | 4 Seats |
| 🚙 SUV | 7 Seats |
| 🚐 Innova | 7 Seats |
| 🚕 Hatchback | 4 Seats |

---

## ⛽ Fuel Preferences

CabWeb allows users to select their preferred vehicle fuel type.

- Petrol
- Diesel
- CNG
- Electric

---

## 🌐 Driver Language

Passengers may communicate comfortably by selecting a preferred driver language.

Available options

- English
- Hindi
- Hinglish

---

## ♿ Accessibility Preferences

Designed for inclusive transportation.

Options include

- 🐶 Pet Friendly
- ♿ Wheelchair Friendly

---

## 🔍 Driver Searching Experience

After booking, passengers are redirected to an animated driver searching screen.

Features include

- Searching Animation
- Ride Confirmation
- Smooth Loading Experience
- Estimated Waiting Time
- Booking Confirmation Flow

---

## 👤 User Profile

Passengers have access to a personalized profile page.

Includes

- Profile Avatar
- Full Name
- Member Since
- Logout
- Future Profile Editing Support

---

## 📖 My Bookings

Users can easily manage previous rides.

Displays

- Booking Status
- Pickup Location
- Destination
- Vehicle Type
- Fuel Type
- Language Preference
- Accessibility Preference
- Booking Date & Time
- Fare (Backend Ready)
- Booking Details Popup

---
# 🚗 Driver Dashboard

CabWeb includes a dedicated **Driver Portal** designed to help driver partners efficiently manage rides, earnings, documents, and account information through a modern dashboard interface.

The dashboard follows a clean, responsive layout inspired by professional fleet management systems, ensuring an intuitive experience across desktop and mobile devices.

---

# 🎯 Driver Dashboard Features

## 🟢 Online / Offline Availability

Drivers can control their availability with a single click.

### Features

- One-click Online/Offline Toggle
- Real-time Status Indicator
- Toast Notifications
- Prevents Ride Requests while Offline
- Smooth Status Transition

---

## 📊 Weekly Performance Dashboard

A GitHub-inspired activity graph provides a visual representation of the driver's weekly performance.

The graph helps drivers monitor consistency and productivity.

Displays

- Daily Activity
- Weekly Driving Performance
- Ride Completion Pattern
- Performance Overview

Future Scope

- Monthly Analytics
- Yearly Reports
- Heatmap Statistics

---

## 💰 Earnings Overview

The dashboard provides quick financial insights without opening separate reports.

Includes

### Daily Earnings

- Total Earnings Today
- Completed Trips Today

### Weekly Summary

- Weekly Income
- Weekly Completed Trips

### Overall Statistics

- Total Earnings
- Total Completed Rides
- Average Daily Earnings

---

## 🚖 Ride Request Management

When drivers are online, incoming ride requests appear instantly on the dashboard.

Each request includes

- Passenger Pickup Location
- Destination
- Vehicle Type
- Trip Type
- Estimated Fare
- Estimated Distance

Drivers can

- ✅ Accept Ride
- ❌ Reject Ride

Future backend integration will automatically assign accepted rides.

---

## 📜 Ride History

Drivers can review all completed trips.

Ride history displays

- Pickup Location
- Destination
- Passenger Information
- Fare
- Ride Date
- Ride Time
- Trip Status

Future updates

- Search History
- Export Ride Reports
- Monthly Ride Summary

---

## 📄 Document Management

Inspired by **DigiLocker**, drivers can securely manage important documents from one centralized location.

Supported Documents

- Driving License
- Vehicle Registration Certificate (RC)
- Insurance Certificate
- Pollution Certificate (PUC)
- Aadhaar / Identity Proof

Future Enhancements

- Document Upload
- Expiry Reminder
- Verification Status
- Cloud Storage

---

## ⭐ Ratings & Reviews

Passenger feedback helps drivers improve service quality.

Displays

- Overall Rating
- Average Star Rating
- Passenger Reviews
- Latest Feedback
- Review History

Future Scope

- Rating Analytics
- Performance Score
- Customer Satisfaction Index

---

## 👤 Profile Settings

Drivers can manage their account information directly from the dashboard.

Profile includes

- Profile Photo
- Full Name
- Contact Number
- Vehicle Information
- Vehicle Registration Number
- Driving License Details

Future Features

- Change Password
- Profile Editing
- Bank Account Information
- Emergency Contact

---

## 📱 Responsive Dashboard

The Driver Dashboard is optimized for different screen sizes.

### Desktop

- Sidebar Navigation
- Large Dashboard Cards
- Full Analytics View

### Mobile

- Bottom Navigation
- Responsive Sidebar
- Compact Cards
- Touch-Friendly Controls

---

## 🎨 UI Highlights

The Driver Dashboard features a modern interface with smooth interactions.

Highlights

- Responsive Layout
- Interactive Dashboard Cards
- Clean Sidebar Navigation
- Professional Top Navigation
- Bottom Navigation for Mobile
- Toast Notifications
- Smooth Animations
- Rounded Modern Components
- Minimal Dashboard Design
- Professional Color Palette

---

# 💾 Database Design

CabWeb uses **MongoDB Atlas** to securely store passenger, driver, and booking information.

---

## 👤 User Collection

Stores registered passenger information.

Fields

- Full Name
- Mobile Number
- Firebase UID
- Registration Date

---

## 🚗 Driver Collection *(Ready for Backend Integration)*

Stores driver partner details.

Fields

- Driver Name
- Mobile Number
- Vehicle Type
- Vehicle Number
- Driving License Number
- Driver Status (Online / Offline)
- Average Rating
- Documents
- Total Earnings
- Completed Trips

---

## 📖 Booking Collection

Stores complete ride information.

Fields

- Pickup Location
- Destination
- Trip Type
- Vehicle Type
- Fuel Preference
- Driver Language
- Accessibility Preference
- Start Date & Time
- End Date & Time
- Booking Status
- Estimated Fare
- User Reference
- Driver Reference *(Future Integration)*

---

# 🔄 System Workflow

```text
Passenger Registration/Login
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
 Vehicle Selection
            │
            ▼
 Booking Confirmation
            │
            ▼
 Driver Searching Screen
            │
            ▼
 Driver Accepts Request
            │
            ▼
 Ride Starts
            │
            ▼
 Ride Completed
            │
            ▼
 Booking Stored in MongoDB
            │
            ▼
 Passenger Booking History
            │
            ▼
 Driver Earnings Updated
```

---

# 🛠 Technology Stack

## Frontend

- React.js
- JavaScript (ES6)
- React Router DOM
- CSS3
- React Icons

---

## Backend

- Node.js
- Express.js
- REST APIs

---

## Database

- MongoDB Atlas

---

## Authentication

- Firebase Authentication
- Phone OTP Verification

---

## Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB Compass
- Firebase Console

---
### This project is intended for educational and portfolio purposes. 

## 👩‍💻 Developed By
Vaani Mangal
