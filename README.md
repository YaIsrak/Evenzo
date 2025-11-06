# 🎉 Evenzo – Smart Event Management Made Simple

Evenzo is a modern event management web application designed to simplify the way organizers and attendees interact with events. Built with **Next.js**, **Tailwind CSS**, **ShadCN UI**, **MongoDB**, **Axios**, **Zustand**, and **Resend**, it offers a seamless, responsive, and efficient event experience.

---

## 🚀 Features

### 🎟️ For Users
- **Book Events Easily** – Browse and book tickets for any available event.  
- **Email Ticket System** – Receive an automated ticket directly in your inbox using Resend.  
- **Ticket Verification** – Verify ticket authenticity through a secure verification page.

### 🗓️ For Organizers
- **Create Events** – Add detailed event information including title, date, description, and capacity.  
- **Manage Event Status** – Update events to active, delayed, or cancelled.  
- **Track Bookings** – Monitor attendees and ticket confirmations in real-time.

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js** | Frontend framework for building a modern, fast web app |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **ShadCN UI** | Prebuilt accessible UI components |
| **MongoDB** | NoSQL database for storing events and users |
| **Axios** | HTTP client for API communication |
| **Zustand** | Lightweight state management |
| **Resend** | Email API for sending event tickets and notifications |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/YaIsrak/Evenzo

# Navigate to the project directory
cd evenzo

# Install dependencies
npm install

# Add environment variables (create a .env.local file)
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=

# Run the development server
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## 📧 Email & Ticketing

Evenzo uses **Resend** for automated ticket delivery and updates. When a user books a ticket, they instantly receive:

- A digital ticket in their email (HTML email with event details)
- Event details and a unique **verification link** for the ticket

The email template can be customized in the `/emails` (or equivalent) folder. Resend handles reliable delivery, and the app stores ticket metadata in MongoDB for verification.

---

## 🔐 Ticket Verification

Each ticket includes a unique verification token and a dedicated verification page. Organizers or gate staff can paste the token or scan a QR code to confirm validity. Verification flow:

1. User receives ticket email containing a verification link (and QR code).
2. Clicking the link opens the verification page at `https://evenzo-israk.vercel.app/verify-ticket`.
3. App checks the token against MongoDB and returns a **Valid / Invalid / Already-used** status.

## ✨ Author

**MD Yaser Arafat Israk**  
📍 Chittagong, Bangladesh  
💼 [Portfolio] [Link](https://www.yisrak.work/)  
🐙 [GitHub] [Github](https://github.com/YaIsrak/Evenzo)

---

> Evenzo – Your digital companion for effortless event management.

