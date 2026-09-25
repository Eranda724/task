# Sri Ayu - Ayurvedic Practice Management System

A premium, full-stack web application built for Sri Ayu, a boutique Ayurvedic retreat. It features a beautifully designed public-facing website for guests and a comprehensive, secure admin dashboard for managing the property.

**🌐 Live Demo:** [https://task-5bt9.vercel.app](https://task-5bt9.vercel.app)  
**🐙 Source Code:** [https://github.com/Eranda724/task](https://github.com/Eranda724/task)
## 🌟 Features

### Public Website
- **Modern & Premium Aesthetics:** Beautifully curated design system with signature colors (`moss`, `sage`, `parchment`, `ink`), smooth transitions, and a minimalist typography-driven layout.
- **Responsive Design:** Fully mobile-responsive layout built with Tailwind CSS.
- **Rooms & Suites:** View available accommodations with rich imagery and pricing.
- **Treatments:** Browse detailed Ayurvedic treatment offerings.
- **Booking System:** Seamlessly book rooms or treatments directly from the site.

### Admin Dashboard (`/admin`)
- **Secure Authentication:** JWT-based login for staff and owners.
- **Staff Management:** Add and manage staff members (doctors, specialists, admins) with profile photos and active/inactive toggling.
- **Rooms & Suites Management:** Create, edit, and toggle visibility of accommodations. Upload property images.
- **Treatments Management:** Manage available treatments, pricing, and durations.
- **Booking Management:** View, approve, or cancel incoming guest bookings.

## 💻 Technology Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Axios (for API requests)
- React Router DOM

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database & ODM)
- JSON Web Tokens (JWT) for authentication
- Multer (for handling image uploads)
- bcryptjs (for password hashing)

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd sri-ayu
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=mongodb://localhost:27017/sri-ayu
JWT_SECRET=your_super_secret_key_here
PORT=5000
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

## 🌐 Deployment

### Deploying the Backend (Render/Heroku/Railway)
1. Deploy the `backend` folder to your Node.js hosting provider.
2. Ensure you set the `MONGO_URI` and `JWT_SECRET` environment variables on your server.
3. Your server must be configured to handle file uploads properly (Render Disk storage or AWS S3 recommended for production Multer uploads).

### Deploying the Frontend (Vercel/Netlify)
1. Deploy the `frontend` folder to Vercel or Netlify.
2. Add the `VITE_API_URL` environment variable pointing to your live backend URL (e.g., `https://your-backend.onrender.com/api`).
3. Make sure to redeploy after setting the environment variable.

## 📝 License
Proprietary software. All rights reserved.
