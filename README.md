# 🕉️ Pandit Shri Ram Sharma - Astrology & Puja Services Website

A modern, responsive website for astrology and religious services with online booking, payment integration, and admin panel.

![Website Preview](https://img.shields.io/badge/Status-Live-success)
![Firebase](https://img.shields.io/badge/Firebase-Integrated-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🎨 Frontend Features
- **Modern UI/UX** - Beautiful gradient design with smooth animations
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Multi-language Support** - Hindi and English content
- **Interactive Animations** - Confetti, typing effects, and smooth transitions

### 📅 Booking System
- **Online Booking Form** - Easy-to-use booking interface
- **Multiple Payment Options**:
  - Online Payment (UPI/QR Code)
  - Direct Booking Confirmation
  - WhatsApp Booking (Free)
- **Real-time Price Calculation** - Automatic price updates
- **Date & Time Validation** - Prevents past date/time selection
- **Form Validation** - Complete input validation

### 💳 Payment Integration
- **QR Code Payment** - Display QR code for UPI payments
- **UPI ID Copy** - One-click UPI ID copy
- **Payment Confirmation** - Beautiful success animations
- **WhatsApp Integration** - Auto-send booking details

### 🔐 Admin Panel
- **Dark Theme Dashboard** - Modern admin interface
- **Real-time Data** - Live booking and contact updates
- **Status Management** - Update booking status (Pending → Confirmed → Completed)
- **Filter Options** - Filter by status
- **Contact Management** - View and manage contact inquiries
- **WhatsApp Quick Actions** - Direct WhatsApp links

### 🔥 Firebase Integration
- **Cloud Firestore** - Real-time database
- **Automatic Sync** - Data syncs across all devices
- **Offline Support** - LocalStorage fallback
- **Secure Rules** - Firestore security rules

### 🔒 Security Features
- **Secret Admin Access** - Hidden admin login (Code: `0202m2`)
- **Credentials**: Username: `satya`, Password: `0202`
- **Input Validation** - All forms validated
- **XSS Protection** - Sanitized inputs

## 🚀 Live Demo

- **Main Website**: [Your GitHub Pages URL]
- **Admin Panel**: [Your GitHub Pages URL]/admin.html
- **Test Firebase**: [Your GitHub Pages URL]/test-firebase.html

## ✨ Key Features

### Main Website
- 🏠 Modern homepage with hero section
- 🔮 Services section with 6+ astrology services
- 📅 Online booking form with payment options
- 📞 Contact form with Google Maps integration
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design

### Admin Panel
- 📊 Dashboard with real-time statistics
- 📋 Bookings management table
- 📧 Contact inquiries section
- 🔐 Secure login system

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Firestore
- **Icons**: Font Awesome 6.4.0
- **Animations**: Canvas Confetti
- **Fonts**: Google Fonts (Noto Sans Devanagari)

## 📦 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/pandit-website.git
cd pandit-website
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project: "pandit-satya"
3. Enable Firestore Database

#### Get Firebase Config
1. Go to Project Settings → Your apps
2. Click Web icon (</>) to add web app
3. Copy the Firebase configuration

#### Update Config in Files
Replace Firebase config in these files:
- `index.html` (line ~725)
- `admin.js` (line ~2)
- `test-firebase.html` (line ~70)

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

#### Set Firestore Rules
Go to Firestore Database → Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{bookingId} {
      allow read, write: if true;
    }
    match /contacts/{contactId} {
      allow read, write: if true;
    }
  }
}
```

### 3. Update Contact Information

Update these details in `index.html`:
- Phone number: Search for `917070279513` and replace
- Email: Search for `m4740600@gmail.com` and replace
- Address: Update in contact section
- WhatsApp link: Update `https://wa.link/5xkhyk`

### 4. Deploy to GitHub Pages

#### Method 1: GitHub Pages (Recommended)
1. Push code to GitHub
2. Go to Repository Settings → Pages
3. Select branch: `main`
4. Select folder: `/ (root)`
5. Click Save
6. Your site will be live at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

#### Method 2: Netlify
1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop your project folder
3. Site will be live instantly

#### Method 3: Vercel
1. Go to [Vercel](https://vercel.com/)
2. Import GitHub repository
3. Deploy with one click

## 📁 Project Structure

```
pandit-website/
├── index.html              # Main website
├── index.css               # Main styles
├── index.js                # Main JavaScript
├── admin.html              # Admin panel
├── admin.js                # Admin panel logic
├── test-firebase.html      # Firebase connection test
├── test-booking.html       # Booking save test
├── pandiji.png             # Pandit photo (REPLACE WITH YOUR PHOTO)
├── payment-qr.jpg          # Payment QR code (REPLACE WITH YOUR QR)
├── README.md               # Documentation
├── DEPLOYMENT.md           # Deployment guide
└── IMAGE-FILES.md          # Image reference guide
```

## 🎯 Usage Guide

### For Users

#### Book a Service
1. Visit website
2. Click "बुकिंग" in navigation
3. Fill booking form
4. Choose payment method:
   - **Online Payment**: Pay via UPI/QR
   - **Confirm Booking**: Direct booking
   - **WhatsApp**: Free booking via WhatsApp

#### Contact
1. Scroll to contact section
2. Fill contact form
3. Submit inquiry

### For Admin

#### Access Admin Panel
1. Go to main website
2. Click on 🔍 icon in navbar
3. Enter code: `0202m2`
4. Login with:
   - Username: `satya`
   - Password: `0202`

#### Manage Bookings
1. View all bookings in dashboard
2. Filter by status
3. Update status:
   - Pending → Confirmed → Completed
4. Delete bookings if needed

#### Manage Contacts
1. Switch to "Contact Inquiries" tab
2. View all contact messages
3. Mark as replied
4. Quick WhatsApp reply

## 🔧 Configuration

### Change Admin Credentials

**Secret Code** (in `index.js`):
```javascript
if (code === '0202m2') {  // Change this code
```

**Login Credentials** (in `index.js`):
```javascript
if (username === 'satya' && password === '0202') {  // Change these
```

### Update Services & Prices

Edit in `index.html` (line ~400):
```html
<option value="kundali" data-price="500">कुंडली विश्लेषण - ₹500</option>
```

### Change Theme Colors

Edit in `index.css`:
```css
:root {
    --primary: #FF6B35;    /* Orange */
    --secondary: #F7931E;  /* Light Orange */
    --accent: #FFD23F;     /* Yellow */
}
```

## 🐛 Troubleshooting

### Firebase Not Working
1. Check Firebase config is correct
2. Verify Firestore rules are set
3. Open browser console (F12) for errors
4. Test with `test-firebase.html`

### Bookings Not Saving
1. Open console (F12)
2. Look for Firebase errors
3. Check if rules allow write access
4. Test with `test-booking.html`

### Admin Panel Not Loading
1. Clear browser cache (Ctrl + Shift + R)
2. Check Firebase config in `admin.js`
3. Verify collections exist in Firestore

## 📱 Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Satya Singh**
- WhatsApp: [+91 70702 79513](https://wa.link/5xkhyk)
- Email: m4740600@gmail.com

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Firebase for backend services
- Canvas Confetti for animations

## 📞 Support

For any issues or questions:
- Open an issue on GitHub
- Contact via WhatsApp: [+91 70702 79513](https://wa.link/5xkhyk)
- Email: m4740600@gmail.com

---

Made with ❤️ by Satya Singh
