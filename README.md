# Cymulate Backend

## Description

Cymulate Backend is a server-side application designed to enhance cybersecurity awareness among clients. It provides a platform for users to register, log in, and engage in simulated phishing attempts to assess their awareness and response to cybersecurity threats.

### Main Features

- User Registration and Login
- Phishing Simulations
- Status Tracking
- Email Notifications

## Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:TadesseDev/Cymulate-Backend.git
   cd Cymulate-Backend
   npm install

   ```

1. **Configure Environment Variables**:

```env
# Database Configuration
MONGODB_URI=mongodb://host:port/db

# Mail Configuration
SERVICE=Gmail
FROM=<someone@example.com>
HOST=smtp.gmail.com
MAILER_USER=<someone@example.com>
MAIL_PORT=587
SECURE=false
PASSWORD=<your-app-password>
DOMAIN=http://localhost:3000/
```

1. **Usage**:

### Start the development server

```bash
npm run start:dev
```

### Access the application

Navigate to:

<http://localhost:3000/>

### Note: Ensure that the backend is running and the corresponding URL is set in the frontend .env file

### Features

- User registration and authentication
- Creation and sending of phishing attempt emails
- Viewing the status of each user's attempts
- Email notifications for user actions

### Technologies Used

- NestJS
- MongoDB
- Nodemailer
- TypeScript

> For a complete list of third-party dependencies, please refer to the package.json file.
