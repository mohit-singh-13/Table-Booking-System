# 🍽️ Restaurant Table Booking System

## Objective

Design and develop a responsive and user-friendly restaurant table booking system with:

- **Frontend:** Built using Next.js  
- **Backend:** Powered by Node.js and Express  

## Features

### 1. Booking Form
- Users can input:  
  - Date and time for the reservation  
  - Number of guests  
  - Name and contact details  
- All fields are validated to ensure proper data entry.  

### 2. Availability Display
- Displays available time slots for reservations based on the selected date.  
- Prevents double bookings by verifying availability with backend data.  

### 3. Booking Summary
- Shows a confirmation message or page after successful booking.  
- Displays a summary of reservation details.  

### 4. Responsive Design
- Fully responsive for seamless usage on both desktop and mobile devices.  

## Bonus Features

### Calendar View:
- Allows users to visually select a date and time for their reservation using a calendar.  
- Displays available and booked slots.  

### PDF Generation:
- A confirmation PDF is generated for each booking using `jspdf`.  

## Backend

### Routes

| Method  | Endpoint                          | Description                              |
|---------|-----------------------------------|------------------------------------------|
| GET    | `/api/v1/bookings`                | Gets all bookings                   |
| POST     | `/api/v1/getAvailability`         | Fetches available time slots            |
| POST    | `/api/v1/createBooking`           | Creates a new reservation               |
| DELETE  | `/api/v1/deleteBooking/:id`       | Deletes a reservation by ID             |

### Backend Hosting

- Hosted on a free Render instance.

## Frontend

### Key Features

- Responsive design for mobile and desktop.
- Integrated calendar using `react-day-picker`.
- Communicates with backend for booking creation, deletion, and availability checks.

### Frontend Hosting

- Hosted on Vercel.

### Time Slots

- Time slots: 10 AM to 4 PM (7 slots in total).
- Each slot can accommodate up to 5 tables.
- Availability is dynamically updated based on bookings.

### Live Deployment Links

- **Frontend**: Hosted on Vercel
- **Backend**: Hosted on Render

## Installation & Setup

### Prerequisites

- Node.js and npm installed.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   - The server will run on `http://localhost:8080` by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   - The app will run on `http://localhost:3000` by default.

## Usage

1. Open the frontend application.
2. Select a date and time slot.
3. Enter booking details (name, contact, number of guests).
4. Submit the booking to receive a confirmation.
5. Download the confirmation PDF.

## Dependencies

### Backend

- **Express**
- **Node.js**

### Frontend

- **Next.js**
- **Tailwind CSS** (for responsive design)
- **react-day-picker** (for calendar implementation)
- **jspdf** (for PDF generation)

## Conclusion

This restaurant table booking system provides a seamless and user-friendly experience for customers to make reservations, ensuring efficient table management for the restaurant.
