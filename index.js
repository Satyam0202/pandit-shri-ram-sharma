// Firebase is already initialized in index.html
// Just get the reference
let db = window.db;
let firebase = window.firebase;

// Wait for Firebase to be ready
if (!db || !firebase) {
    console.warn('⚠️ Firebase not ready yet, waiting...');
    setTimeout(() => {
        db = window.db;
        firebase = window.firebase;
        console.log('🔥 Firebase DB:', db ? 'Available ✅' : 'Not Available ❌');
    }, 500);
} else {
    console.log('🔥 Firebase DB:', db ? 'Available ✅' : 'Not Available ❌');
}

console.log('📄 index.js loading...');

// Wait for DOM to be ready before accessing elements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already ready
    initializeApp();
}

function initializeApp() {
    console.log('🚀 Initializing app...');
    
    // Secret Admin Access
    const secretAdminInput = document.getElementById('secretAdminInput');
    if (secretAdminInput) {
        secretAdminInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const code = this.value.trim();
                
                // Check if code is "0202m2"
                if (code === '0202m2') {
                    // Show login modal
                    showAdminLoginModal();
                    this.value = '';
                    this.blur();
                } else if (code !== '') {
                    // Wrong code
                    this.style.borderColor = 'red';
                    this.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        this.style.borderColor = '';
                        this.style.animation = '';
                        this.value = '';
                    }, 500);
                }
            }
        });
        console.log('✅ Secret admin access initialized');
    }
    
    // Theme Toggle - FIXED
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    console.log('🎨 Theme Toggle Element:', themeToggle ? 'Found ✅' : 'Not Found ❌');
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        console.log('🎨 Theme Icon:', themeIcon ? 'Found ✅' : 'Not Found ❌');
        
        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        console.log('💾 Saved theme:', savedTheme);
        
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }

        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Theme toggle clicked!');
            
            // Add rotation animation
            if (themeIcon) {
                themeIcon.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    themeIcon.style.transform = 'rotate(0deg)';
                }, 400);
            }
            
            // Toggle dark mode
            body.classList.toggle('dark-mode');
            console.log('🎨 Dark mode:', body.classList.contains('dark-mode') ? 'ON' : 'OFF');
            
            if (body.classList.contains('dark-mode')) {
                if (themeIcon) {
                    setTimeout(() => {
                        themeIcon.classList.remove('fa-moon');
                        themeIcon.classList.add('fa-sun');
                    }, 200);
                }
                localStorage.setItem('theme', 'dark');
                console.log('🌙 Dark mode activated');
            } else {
                if (themeIcon) {
                    setTimeout(() => {
                        themeIcon.classList.remove('fa-sun');
                        themeIcon.classList.add('fa-moon');
                    }, 200);
                }
                localStorage.setItem('theme', 'light');
                console.log('☀️ Light mode activated');
            }
        });
        console.log('✅ Theme toggle initialized');
    } else {
        console.error('❌ Theme toggle button not found!');
    }

    // Typing Animation for Hero Section
    const typedTextElement = document.getElementById('typedText');
    const typingCursor = document.querySelector('.typing-cursor');
    
    if (typedTextElement) {
        const textToType = 'Pandit Shri Ram Sharma';
        
        // Clear initial text and show cursor
        typedTextElement.textContent = '';
        if (typingCursor) {
            typingCursor.style.display = 'inline';
        }
        
        let charIndex = 0;

        function typeText() {
            if (charIndex < textToType.length) {
                typedTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            } else {
                // Hide cursor after typing is complete
                if (typingCursor) {
                    setTimeout(() => {
                        typingCursor.style.display = 'none';
                    }, 2000);
                }
            }
        }

        // Start typing after a short delay
        setTimeout(typeText, 800);
        console.log('✅ Typing animation initialized');
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, testimonial cards, and sections
document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// EmailJS Configuration
// Initialize EmailJS with your Public Key
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

// Contact Form Handling - WITH FIREBASE SAVE
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.btn-primary');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Validation
    if (!name || !phone || !email || !service || !message) {
        showErrorAnimation('कृपया सभी आवश्यक फ़ील्ड भरें।');
        return;
    }
    
    // Phone validation
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        showErrorAnimation('कृपया सही मोबाइल नंबर दर्ज करें (10 अंक)।');
        return;
    }
    
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showErrorAnimation('कृपया सही ईमेल पता दर्ज करें।');
        return;
    }
    
    // Disable button and show loading
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> भेजा जा रहा है...';
    submitBtn.disabled = true;
    
    // Prepare contact data
    const contactData = {
        name: name,
        phone: phone,
        email: email,
        service: service,
        message: message,
        status: 'new',
        type: 'contact_inquiry',
        createdAt: new Date().toISOString()
    };
    
    // Save to Firebase (if available) or localStorage
    let contactId;
    let saveSuccess = false;
    
    try {
        if (window.db) {
            // Firebase is available - save to cloud
            console.log('💾 Saving contact to Firebase...');
            const docRef = await window.db.collection('contacts').add({
                ...contactData,
                timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
            });
            contactId = docRef.id;
            saveSuccess = true;
            console.log('✅ Contact saved to Firebase:', contactId);
        } else {
            console.warn('⚠️ Firebase not available, using localStorage');

            // Firebase not configured - use localStorage
            contactId = 'CNT-' + Date.now().toString();
            contactData.id = contactId;
            let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push(contactData);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            saveSuccess = true;
            console.log('Contact saved to localStorage:', contactId);
        }
    } catch (error) {
        console.error('Error saving contact:', error);
        // Fallback to localStorage
        try {
            contactId = 'CNT-' + Date.now().toString();
            contactData.id = contactId;
            let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push(contactData);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            saveSuccess = true;
            console.log('Contact saved to localStorage (fallback):', contactId);
        } catch (localError) {
            console.error('LocalStorage error:', localError);
        }
    }
    
    if (saveSuccess) {
        // Success
        submitBtn.innerHTML = '<i class="fas fa-check"></i> भेज दिया गया!';
        submitBtn.style.background = '#28a745';
        
        // Show success animation
        showSuccessAnimation(contactId);
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
        // WhatsApp Message
        const whatsappMessage = `🕉️ *नई संपर्क पूछताछ* 🕉️\n\n📝 *विवरण:*\nनाम: ${name}\nफोन: ${phone}\nईमेल: ${email}\nसेवा: ${service}\n\n📌 *संदेश:*\n${message}\n\n*Contact ID:* ${contactId}`;
        const whatsappNumber = '917070279513';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Ask if user wants to send on WhatsApp too
        setTimeout(() => {
            if (confirm('क्या आप WhatsApp पर भी संदेश भेजना चाहते हैं?')) {
                window.open(whatsappURL, '_blank');
            }
        }, 1500);
    } else {
        // Error
        submitBtn.innerHTML = '<i class="fas fa-times"></i> त्रुटि!';
        submitBtn.style.background = '#dc3545';
        
        // Show error animation
        showErrorAnimation('संदेश भेजने में त्रुटि हुई। कृपया फोन या WhatsApp से संपर्क करें।');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }
});

// Add floating animation to service icons
document.querySelectorAll('.service-icon').forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Counter animation for experience badge
const animateCounter = (element, target, duration) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Trigger counter animation when experience badge is visible
const experienceBadge = document.querySelector('.experience-badge .number');
if (experienceBadge) {
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(experienceBadge, 25, 2000);
                badgeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    badgeObserver.observe(experienceBadge);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Booking Form - Price Update - FIXED WITH DOM READY CHECK
console.log('🚀 index.js loaded!');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Content Loaded!');
    
    const bookingService = document.getElementById('bookingService');
    const priceAmount = document.getElementById('priceAmount');
    const totalAmount = document.getElementById('totalAmount');

    console.log('🔍 Price Update Elements Check:');
    console.log('bookingService:', bookingService);
    console.log('priceAmount:', priceAmount);
    console.log('totalAmount:', totalAmount);

    if (!bookingService || !priceAmount || !totalAmount) {
        console.error('❌ Required elements not found! Retrying...');
        // Retry after a short delay
        setTimeout(initializePriceUpdate, 500);
        return;
    }

    initializePriceUpdate();
});

// Function to initialize price update functionality
function initializePriceUpdate() {
    const bookingService = document.getElementById('bookingService');
    const priceAmount = document.getElementById('priceAmount');
    const totalAmount = document.getElementById('totalAmount');
    
    if (!bookingService || !priceAmount || !totalAmount) {
        console.error('❌ Still cannot find elements!');
        return;
    }
    
    console.log('✅ Initializing price update...');

    // Function to update price display with animation
    function updatePriceDisplay() {
        const selectedOption = bookingService.options[bookingService.selectedIndex];
        const price = selectedOption.getAttribute('data-price') || 0;
        
        console.log('💰 Selected Service:', selectedOption.text);
        console.log('💰 Price:', price);
        
        if (price === 0 || price === '0') {
            // No service selected
            priceAmount.textContent = '₹0';
            totalAmount.textContent = '₹0';
            console.log('⚠️ No service selected');
            return;
        }
        
        // Add pulse animation to price summary
        const priceSummary = document.querySelector('.price-summary');
        if (priceSummary) {
            priceSummary.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                priceSummary.style.animation = '';
            }, 500);
        }
        
        // Animate price change
        priceAmount.style.transform = 'scale(1.3)';
        priceAmount.style.color = '#28a745';
        totalAmount.style.transform = 'scale(1.3)';
        totalAmount.style.color = '#28a745';
        
        // Update text with rupee symbol
        priceAmount.textContent = `₹${price}`;
        totalAmount.textContent = `₹${price}`;
        
        // Add checkmark icon temporarily
        const checkIcon = document.createElement('i');
        checkIcon.className = 'fas fa-check-circle';
        checkIcon.style.cssText = 'color: #28a745; margin-left: 8px; animation: fadeIn 0.3s ease;';
        priceAmount.appendChild(checkIcon);
        
        // Reset animation after 400ms
        setTimeout(() => {
            priceAmount.style.transform = 'scale(1)';
            priceAmount.style.color = '';
            totalAmount.style.transform = 'scale(1)';
            totalAmount.style.color = '';
            if (checkIcon.parentNode) {
                checkIcon.remove();
            }
        }, 400);
        
        // Show success message
        console.log(`✅ Price updated: ₹${price}`);
    }

    // Update price when service changes
    bookingService.addEventListener('change', function() {
        console.log('🔄 Service changed!');
        updatePriceDisplay();
        
        // Add visual feedback to select element
        this.style.borderColor = '#28a745';
        this.style.boxShadow = '0 0 10px rgba(40, 167, 69, 0.3)';
        
        setTimeout(() => {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        }, 1000);
    });
    
    // Add input event listener for real-time updates
    bookingService.addEventListener('input', function() {
        console.log('📝 Service input changed!');
        updatePriceDisplay();
    });
    
    console.log('✅ Event listeners attached to bookingService');
    
    // Update on page load if a service is already selected
    if (bookingService.value) {
        console.log('🔄 Updating price on load...');
        updatePriceDisplay();
    }
}

// Set minimum date to today - IMPROVED
const bookingDate = document.getElementById('bookingDate');
const bookingTime = document.getElementById('bookingTime');

if (bookingDate) {
    const today = new Date().toISOString().split('T')[0];
    bookingDate.setAttribute('min', today);
    console.log('✅ Minimum date set to:', today);
    
    // Validate date on change
    bookingDate.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Reset time for date comparison
        
        if (selectedDate < currentDate) {
            alert('⚠️ कृपया आज या भविष्य की तारीख चुनें!');
            this.value = today;
        }
        
        // If today is selected, validate time
        if (this.value === today && bookingTime) {
            validateTime();
        }
    });
}

// Time validation function
function validateTime() {
    if (!bookingDate || !bookingTime) return;
    
    const selectedDate = bookingDate.value;
    const selectedTime = bookingTime.value;
    const today = new Date().toISOString().split('T')[0];
    
    // Only validate if today is selected
    if (selectedDate === today && selectedTime) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);
        
        // Check if selected time is in the past
        if (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute <= currentMinute)) {
            alert('⚠️ कृपया वर्तमान समय के बाद का समय चुनें!');
            bookingTime.value = '';
            return false;
        }
    }
    return true;
}

// Add time validation on change
if (bookingTime) {
    bookingTime.addEventListener('change', validateTime);
}

// Booking Form - WhatsApp Booking (Free)
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('bookingName').value;
    const phone = document.getElementById('bookingPhone').value;
    const email = document.getElementById('bookingEmail').value;
    const service = document.getElementById('bookingService');
    const serviceName = service.options[service.selectedIndex].text;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const message = document.getElementById('bookingMessage').value;
    const amount = service.options[service.selectedIndex].getAttribute('data-price');
    
    // Validation
    if (!name || !phone || !email || !date || !time) {
        showErrorAnimation('कृपया सभी आवश्यक फ़ील्ड भरें।');
        return;
    }
    
    if (!amount || amount === '0') {
        showErrorAnimation('कृपया सेवा चुनें।');
        return;
    }
    
    // Phone validation
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        showErrorAnimation('कृपया सही मोबाइल नंबर दर्ज करें (10 अंक)।');
        return;
    }
    
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showErrorAnimation('कृपया सही ईमेल पता दर्ज करें।');
        return;
    }
    
    // Prepare booking data
    const booking = {
        name: name,
        phone: phone,
        email: email,
        service: serviceName,
        date: date,
        time: time,
        amount: amount,
        message: message,
        status: 'pending',
        paymentMethod: 'WhatsApp Booking',
        createdAt: new Date().toISOString()
    };
    
    // Save to Firebase (if available) or localStorage
    let bookingId;
    let saveSuccess = false;
    
    try {
        if (window.db) {
            // Firebase is available - save to cloud
            console.log('💾 Saving booking to Firebase...');
            const docRef = await window.db.collection('bookings').add({
                ...booking,
                timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
            });
            bookingId = docRef.id;
            saveSuccess = true;
            console.log('✅ Booking saved to Firebase:', bookingId);
        } else {
            console.warn('⚠️ Firebase not available, using localStorage');
            // Firebase not configured - use localStorage
            bookingId = Date.now().toString();
            booking.id = bookingId;
            let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            saveSuccess = true;
            console.log('Booking saved to localStorage:', bookingId);
        }
    } catch (error) {
        console.error('Error saving booking:', error);
        // Fallback to localStorage
        try {
            bookingId = Date.now().toString();
            booking.id = bookingId;
            let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            saveSuccess = true;
            console.log('Booking saved to localStorage (fallback):', bookingId);
        } catch (localError) {
            console.error('LocalStorage error:', localError);
            showErrorAnimation('बुकिंग सेव करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
            return;
        }
    }
    
    if (!saveSuccess) {
        showErrorAnimation('बुकिंग में त्रुटि हुई। कृपया पुनः प्रयास करें।');
        return;
    }
    
    // WhatsApp Booking Message
    const whatsappMsg = `🕉️ *नई बुकिंग* 🕉️

📝 *विवरण:*
नाम: ${name}
फोन: ${phone}
ईमेल: ${email}

🔮 *सेवा:* ${serviceName}
💰 *शुल्क:* ₹${amount}

📅 *तारीख:* ${date}
⏰ *समय:* ${time}

📌 *विशेष निर्देश:*
${message || 'कोई नहीं'}

---
*नोट:* भुगतान परामर्श के समय किया जाएगा।
*Booking ID:* ${bookingId}`;

    const whatsappNumber = '917070279513'; // Your WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
    
    // Show success animation
    showSuccessAnimation(bookingId);
    
    // Open WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1000);
    
    // Reset form
    bookingForm.reset();
    priceAmount.textContent = '₹0';
    totalAmount.textContent = '₹0';
});

// Online Payment Button - Show QR Code Scanner
const payOnlineBtn = document.getElementById('payOnlineBtn');

if (payOnlineBtn) {
    payOnlineBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        console.log('Online Payment button clicked!');
    
    // Get form values
    const name = document.getElementById('bookingName').value;
    const phone = document.getElementById('bookingPhone').value;
    const email = document.getElementById('bookingEmail').value;
    const service = document.getElementById('bookingService');
    const serviceName = service.options[service.selectedIndex].text;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const message = document.getElementById('bookingMessage').value;
    const amount = service.options[service.selectedIndex].getAttribute('data-price');
    
    // Validation
    if (!name || !phone || !email || !date || !time) {
        showErrorAnimation('कृपया सभी आवश्यक फ़ील्ड भरें।');
        return;
    }
    
    if (!amount || amount === '0') {
        showErrorAnimation('कृपया सेवा चुनें।');
        return;
    }
    
    // Phone validation
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        showErrorAnimation('कृपया सही मोबाइल नंबर दर्ज करें (10 अंक)।');
        return;
    }
    
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showErrorAnimation('कृपया सही ईमेल पता दर्ज करें।');
        return;
    }
    
        // Show QR Code Payment Modal
        showQRPaymentModal(name, phone, email, serviceName, date, time, message, amount);
    });
} else {
    console.error('payOnlineBtn element not found!');
}

// QR Code Payment Modal Function - IMPROVED
function showQRPaymentModal(name, phone, email, serviceName, date, time, message, amount) {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
        overflow-y: auto;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 20px; max-width: 500px; width: 100%; text-align: center; animation: slideUp 0.5s ease; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
            <h2 style="color: #667eea; margin-bottom: 20px; font-size: 28px;">💳 Online Payment</h2>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 15px; margin-bottom: 20px; color: white;">
                <h3 style="color: white; margin-bottom: 15px; font-size: 18px;">Payment Details</h3>
                <p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 8px 0; font-size: 16px;"><strong>Service:</strong> ${serviceName}</p>
                <p style="margin: 8px 0;"><strong>Amount:</strong> <span style="font-size: 32px; font-weight: bold;">₹${amount}</span></p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border: 3px solid #667eea; border-radius: 15px; margin-bottom: 20px;">
                <h3 style="color: #667eea; margin-bottom: 15px; font-size: 20px;">📱 Scan QR Code</h3>
                <div style="background: white; padding: 15px; border-radius: 10px; display: inline-block;">
                    <img src="payment-qr.jpg" alt="Payment QR Code" style="width: 280px; height: 280px; border-radius: 10px; display: block;">
                </div>
                <p style="color: #666; font-size: 15px; margin-top: 15px; font-weight: 600;">📲 किसी भी UPI app से scan करें</p>
                <p style="color: #28a745; font-size: 14px; margin-top: 5px;">Google Pay | PhonePe | Paytm | WhatsApp Pay</p>
            </div>
            
            <div style="background: #e8f5e9; padding: 18px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #28a745;">
                <p style="color: #2e7d32; font-weight: 700; margin-bottom: 12px; font-size: 16px;">🆔 या UPI ID से भुगतान करें:</p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;">
                    <code id="upiIdText" style="background: white; padding: 12px 18px; border-radius: 8px; font-size: 17px; font-weight: bold; color: #2e7d32; border: 2px solid #28a745;">7070279513@kotak811</code>
                    <button onclick="copyUPIID()" style="background: #28a745; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <p style="color: #666; font-size: 13px; margin-top: 10px;">UPI ID copy करके अपने app में paste करें</p>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
                <p style="color: #856404; font-size: 15px; margin: 0; font-weight: 600;">
                    ⚠️ भुगतान पूरा होने के बाद नीचे "Payment Done ✅" बटन पर क्लिक करें
                </p>
            </div>
            
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <button onclick="confirmPayment('${name}', '${phone}', '${email}', '${serviceName}', '${date}', '${time}', '${message}', '${amount}')" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; padding: 15px 35px; border-radius: 12px; cursor: pointer; font-size: 17px; font-weight: 700; box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4); transition: all 0.3s;">
                    ✅ Payment Done
                </button>
                <button onclick="closeQRModal()" style="background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%); color: white; border: none; padding: 15px 35px; border-radius: 12px; cursor: pointer; font-size: 17px; font-weight: 700; box-shadow: 0 5px 15px rgba(108, 117, 125, 0.4); transition: all 0.3s;">
                    ❌ Cancel
                </button>
            </div>
            
            <p style="color: #999; font-size: 12px; margin-top: 15px;">Secure payment powered by UPI</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    window.currentQRModal = modal;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Copy UPI ID - IMPROVED
function copyUPIID() {
    const upiId = '7070279513@kotak811';
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(upiId).then(() => {
            // Show success message
            const btn = event.target.closest('button');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = '#28a745';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '#28a745';
            }, 2000);
            
            // Also show alert
            alert('✅ UPI ID Copied!\n\n' + upiId + '\n\nअब अपने UPI app में paste करें');
        }).catch(() => {
            fallbackCopy();
        });
    } else {
        fallbackCopy();
    }
    
    function fallbackCopy() {
        const textArea = document.createElement('textarea');
        textArea.value = upiId;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert('✅ UPI ID Copied!\n\n' + upiId + '\n\nअब अपने UPI app में paste करें');
        } catch (err) {
            alert('❌ Copy failed. Please copy manually:\n\n' + upiId);
        }
        
        document.body.removeChild(textArea);
    }
}

// Close QR Modal
function closeQRModal() {
    if (window.currentQRModal) {
        window.currentQRModal.remove();
        window.currentQRModal = null;
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }
}

// Confirm Payment and Save to Firebase
async function confirmPayment(name, phone, email, serviceName, date, time, message, amount) {
    // Prepare booking data
    const booking = {
        name: name,
        phone: phone,
        email: email,
        service: serviceName,
        date: date,
        time: time,
        amount: amount,
        message: message,
        status: 'confirmed',  // ✅ Payment done, so status is confirmed
        paymentMethod: 'Online Payment (UPI/QR)',
        paymentStatus: 'Paid',
        createdAt: new Date().toISOString()
    };
    
    let bookingId;
    let saveSuccess = false;
    
    console.log('💾 Attempting to save booking...');
    console.log('📊 Booking data:', booking);
    
    try {
        if (window.db) {
            // Save to Firebase
            console.log('🔥 Saving to Firebase...');
            const docRef = await window.db.collection('bookings').add({
                ...booking,
                timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
            });
            bookingId = docRef.id;
            saveSuccess = true;
            console.log('✅ Booking saved to Firebase:', bookingId);
        } else {
            console.warn('⚠️ Firebase not available, using localStorage');
            // Fallback to localStorage
            bookingId = Date.now().toString();
            booking.id = bookingId;
            let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            saveSuccess = true;
            console.log('Booking saved to localStorage:', bookingId);
        }
    } catch (error) {
        console.error('❌ Error saving booking:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        // Try localStorage as fallback
        try {
            console.log('🔄 Trying localStorage fallback...');
            bookingId = 'BK-' + Date.now().toString();
            booking.id = bookingId;
            let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            saveSuccess = true;
            console.log('✅ Booking saved to localStorage:', bookingId);
        } catch (localError) {
            console.error('❌ LocalStorage also failed:', localError);
            showErrorAnimation('बुकिंग सेव करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
            return;
        }
    }
    
    if (saveSuccess) {
        // Close QR modal
        closeQRModal();
        
        // Show success animation
        showSuccessAnimation(bookingId);
        
        // Reset form
        document.getElementById('bookingForm').reset();
        document.getElementById('priceAmount').textContent = '₹0';
        document.getElementById('totalAmount').textContent = '₹0';
        
        // WhatsApp confirmation
        setTimeout(() => {
            const whatsappMsg = `🕉️ *Payment Confirmation* 🕉️

✅ भुगतान सफल!

📝 *Booking Details:*
नाम: ${name}
फोन: ${phone}
सेवा: ${serviceName}
शुल्क: ₹${amount}
तारीख: ${date}
समय: ${time}

*Booking ID:* ${bookingId}
*Payment:* Online (UPI/QR)

धन्यवाद! 🙏`;
            
            const whatsappURL = `https://wa.me/917070279513?text=${encodeURIComponent(whatsappMsg)}`;
            window.open(whatsappURL, '_blank');
        }, 1500);
    }
}

// Make functions global
window.copyUPIID = copyUPIID;
window.closeQRModal = closeQRModal;
window.confirmPayment = confirmPayment;

console.log('🕉️ Website loaded successfully! 🕉️');
console.log('✅ Global functions available:');
console.log('  - copyUPIID:', typeof window.copyUPIID);
console.log('  - closeQRModal:', typeof window.closeQRModal);
console.log('  - confirmPayment:', typeof window.confirmPayment);
console.log('  - Firebase DB:', window.db ? 'Available ✅' : 'Not Available ❌');


// Success Animation Function
function showSuccessAnimation(bookingId) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create success card
    const successCard = document.createElement('div');
    successCard.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        animation: slideUp 0.5s ease;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    successCard.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; animation: scaleUp 0.5s ease; box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);">
                <i class="fas fa-check" style="color: white; font-size: 50px;"></i>
            </div>
        </div>
        <h2 style="background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 15px; font-size: 32px; font-weight: 700;">🎉 बुकिंग कन्फर्म! 🎉</h2>
        <p style="color: #666; font-size: 18px; margin-bottom: 10px; font-weight: 600;">आपकी बुकिंग सफलतापूर्वक हो गई है!</p>
        <div style="background: linear-gradient(135deg, #fff5f0 0%, #ffe8d9 100%); padding: 20px; border-radius: 15px; margin: 20px 0; border: 2px solid #FF6B35;">
            <p style="color: #FF6B35; font-size: 14px; margin-bottom: 8px; font-weight: 600;">📋 Booking ID</p>
            <p style="color: #333; font-size: 20px; font-weight: 700; margin: 0;">${bookingId}</p>
        </div>
        <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #28a745;">
            <p style="color: #2e7d32; font-size: 15px; margin: 0; font-weight: 600;">
                <i class="fab fa-whatsapp" style="color: #25D366; font-size: 20px;"></i> 
                WhatsApp पर confirmation message भेजा जा रहा है...
            </p>
        </div>
        <button onclick="closeSuccessModal()" style="background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: white; border: none; padding: 15px 40px; border-radius: 30px; font-size: 18px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 5px 20px rgba(255, 107, 53, 0.4);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(255, 107, 53, 0.5)';" onmouseout="this.style.transform=''; this.style.boxShadow='0 5px 20px rgba(255, 107, 53, 0.4)';">
            <i class="fas fa-times-circle"></i> बंद करें
        </button>
    `;
    
    // Trigger confetti animation
    if (typeof confetti !== 'undefined') {
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 300);
    }
    
    modal.appendChild(successCard);
    document.body.appendChild(modal);
    
    // Add animations to CSS
    if (!document.getElementById('successAnimationStyles')) {
        const style = document.createElement('style');
        style.id = 'successAnimationStyles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { 
                    transform: translateY(50px);
                    opacity: 0;
                }
                to { 
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            @keyframes scaleUp {
                0% { 
                    transform: scale(0);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.2);
                }
                100% { 
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Confetti animation
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
        }, 200);
        
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 400);
    }
    
    // Store modal reference
    window.currentSuccessModal = modal;
}

// Close Success Modal
function closeSuccessModal() {
    if (window.currentSuccessModal) {
        window.currentSuccessModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            window.currentSuccessModal.remove();
            window.currentSuccessModal = null;
        }, 300);
    }
}

// Error Animation Function
function showErrorAnimation(errorMessage) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create error card
    const errorCard = document.createElement('div');
    errorCard.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        animation: shake 0.5s ease;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    errorCard.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; animation: scaleUp 0.5s ease;">
                <i class="fas fa-times" style="color: white; font-size: 40px;"></i>
            </div>
        </div>
        <h2 style="color: #ff6b6b; margin-bottom: 15px; font-size: 28px;">त्रुटि! ❌</h2>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">${errorMessage || 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।'}</p>
        <div style="background: #fff5f5; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p style="color: #ff6b6b; font-size: 14px; margin: 0;">
                <i class="fas fa-phone"></i> 
                सहायता के लिए: +91 70702 79513
            </p>
        </div>
        <button onclick="closeErrorModal()" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-size: 16px; cursor: pointer; transition: all 0.3s;">
            बंद करें
        </button>
    `;
    
    modal.appendChild(errorCard);
    document.body.appendChild(modal);
    
    // Add shake animation to CSS
    if (!document.getElementById('errorAnimationStyles')) {
        const style = document.createElement('style');
        style.id = 'errorAnimationStyles';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Store modal reference
    window.currentErrorModal = modal;
}

// Close Error Modal
function closeErrorModal() {
    if (window.currentErrorModal) {
        window.currentErrorModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            window.currentErrorModal.remove();
            window.currentErrorModal = null;
        }, 300);
    }
}

// Make functions globally available
window.showSuccessAnimation = showSuccessAnimation;
window.showErrorAnimation = showErrorAnimation;
window.closeSuccessModal = closeSuccessModal;
window.closeErrorModal = closeErrorModal;


// ============================================
// SECRET ADMIN LOGIN MODAL
// ============================================

function showAdminLoginModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'adminLoginModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); padding: 40px; border-radius: 25px; max-width: 400px; width: 90%; box-shadow: 0 25px 70px rgba(0,0,0,0.4); animation: slideUp 0.5s ease; border: 3px solid #FF6B35;">
            <div style="text-align: center; margin-bottom: 30px;">
                <i class="fas fa-user-shield" style="font-size: 60px; color: #FF6B35; margin-bottom: 15px; animation: pulse 2s infinite;"></i>
                <h2 style="background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; font-size: 28px; font-weight: 700;">Admin Login</h2>
                <p style="color: #666; margin-top: 10px; font-size: 14px;">Enter credentials to access admin panel</p>
            </div>
            
            <form id="adminLoginForm" style="display: flex; flex-direction: column; gap: 20px;">
                <div style="position: relative;">
                    <i class="fas fa-user" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #FF6B35;"></i>
                    <input type="text" id="adminUsername" placeholder="Username" required style="
                        width: 100%;
                        padding: 15px 15px 15px 45px;
                        border: 2px solid #e0e0e0;
                        border-radius: 12px;
                        font-size: 16px;
                        outline: none;
                        transition: all 0.3s;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='#FF6B35'; this.style.boxShadow='0 0 15px rgba(255,107,53,0.2)';" onblur="this.style.borderColor='#e0e0e0'; this.style.boxShadow='none';">
                </div>
                
                <div style="position: relative;">
                    <i class="fas fa-lock" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #FF6B35;"></i>
                    <input type="password" id="adminPassword" placeholder="Password" required style="
                        width: 100%;
                        padding: 15px 15px 15px 45px;
                        border: 2px solid #e0e0e0;
                        border-radius: 12px;
                        font-size: 16px;
                        outline: none;
                        transition: all 0.3s;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='#FF6B35'; this.style.boxShadow='0 0 15px rgba(255,107,53,0.2)';" onblur="this.style.borderColor='#e0e0e0'; this.style.boxShadow='none';">
                </div>
                
                <div id="loginError" style="display: none; background: #fee; color: #c33; padding: 12px; border-radius: 10px; font-size: 14px; text-align: center; border: 1px solid #fcc;">
                    <i class="fas fa-exclamation-circle"></i> Invalid credentials!
                </div>
                
                <div style="display: flex; gap: 12px;">
                    <button type="submit" style="
                        flex: 1;
                        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                        color: white;
                        border: none;
                        padding: 15px;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s;
                        box-shadow: 0 5px 20px rgba(255,107,53,0.4);
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(255,107,53,0.5)';" onmouseout="this.style.transform=''; this.style.boxShadow='0 5px 20px rgba(255,107,53,0.4)';">
                        <i class="fas fa-sign-in-alt"></i> Login
                    </button>
                    
                    <button type="button" onclick="closeAdminLoginModal()" style="
                        flex: 0.4;
                        background: #f0f0f0;
                        color: #666;
                        border: none;
                        padding: 15px;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='#e0e0e0';" onmouseout="this.style.background='#f0f0f0';">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add shake animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Handle form submission
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value.trim();
        const password = document.getElementById('adminPassword').value.trim();
        const errorDiv = document.getElementById('loginError');
        
        // Check credentials
        if (username === 'satya' && password === '0202') {
            // Success! Redirect to admin panel
            errorDiv.style.display = 'none';
            
            // Show success message
            modal.innerHTML = `
                <div style="background: white; padding: 40px; border-radius: 25px; text-align: center; animation: slideUp 0.5s ease;">
                    <i class="fas fa-check-circle" style="font-size: 80px; color: #28a745; margin-bottom: 20px;"></i>
                    <h2 style="color: #28a745; margin-bottom: 15px;">Login Successful!</h2>
                    <p style="color: #666; margin-bottom: 20px;">Redirecting to admin panel...</p>
                    <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #FF6B35; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                </div>
            `;
            
            // Add spin animation
            const spinStyle = document.createElement('style');
            spinStyle.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinStyle);
            
            // Redirect after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1500);
            
        } else {
            // Wrong credentials
            errorDiv.style.display = 'block';
            errorDiv.style.animation = 'shake 0.5s';
            
            // Shake the form
            const form = document.getElementById('adminLoginForm');
            form.style.animation = 'shake 0.5s';
            
            setTimeout(() => {
                errorDiv.style.animation = '';
                form.style.animation = '';
            }, 500);
        }
    });
    
    // Focus on username field
    setTimeout(() => {
        document.getElementById('adminUsername').focus();
    }, 300);
}

function closeAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

console.log('🔐 Secret admin access ready!');


// ============================================
// MANUAL THEME TOGGLE - GUARANTEED WORKING
// ============================================

function toggleThemeManual() {
    console.log('🎨 Manual theme toggle triggered!');
    
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    // Rotate icon
    if (themeIcon) {
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeIcon.style.transform = 'rotate(0deg)';
        }, 400);
    }
    
    // Toggle dark mode
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        // Dark mode ON
        if (themeIcon) {
            setTimeout(() => {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }, 200);
        }
        localStorage.setItem('theme', 'dark');
        console.log('🌙 Dark mode: ON');
    } else {
        // Light mode ON
        if (themeIcon) {
            setTimeout(() => {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }, 200);
        }
        localStorage.setItem('theme', 'light');
        console.log('☀️ Light mode: ON');
    }
}

// Make it globally accessible
window.toggleThemeManual = toggleThemeManual;

console.log('✅ Manual theme toggle function ready!');


// ============================================
// CONFIRM BOOKING BUTTON - DIRECT BOOKING
// ============================================

const confirmBookingBtn = document.getElementById('confirmBookingBtn');

if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        console.log('🎯 Confirm Booking button clicked!');
        
        // Get form values
        const name = document.getElementById('bookingName').value;
        const phone = document.getElementById('bookingPhone').value;
        const email = document.getElementById('bookingEmail').value;
        const service = document.getElementById('bookingService');
        const serviceName = service.options[service.selectedIndex].text;
        const date = document.getElementById('bookingDate').value;
        const time = document.getElementById('bookingTime').value;
        const message = document.getElementById('bookingMessage').value;
        const amount = service.options[service.selectedIndex].getAttribute('data-price');
        
        // Validation
        if (!name || !phone || !email || !date || !time) {
            showErrorAnimation('कृपया सभी आवश्यक फ़ील्ड भरें।');
            return;
        }
        
        if (!amount || amount === '0') {
            showErrorAnimation('कृपया सेवा चुनें।');
            return;
        }
        
        // Phone validation
        if (phone.length !== 10 || !/^\d+$/.test(phone)) {
            showErrorAnimation('कृपया सही मोबाइल नंबर दर्ज करें (10 अंक)।');
            return;
        }
        
        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showErrorAnimation('कृपया सही ईमेल पता दर्ज करें।');
            return;
        }
        
        // Disable button and show loading
        const originalText = confirmBookingBtn.innerHTML;
        confirmBookingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> बुकिंग हो रही है...';
        confirmBookingBtn.disabled = true;
        
        // Prepare booking data
        const booking = {
            name: name,
            phone: phone,
            email: email,
            service: serviceName,
            date: date,
            time: time,
            amount: amount,
            message: message,
            status: 'confirmed',  // Direct confirmation
            paymentMethod: 'Direct Booking',
            paymentStatus: 'Pending',
            createdAt: new Date().toISOString()
        };
        
        let bookingId;
        let saveSuccess = false;
        
        console.log('💾 Saving booking to Firebase...');
        console.log('📊 Booking data:', booking);
        
        try {
            if (window.db) {
                // Save to Firebase
                const docRef = await window.db.collection('bookings').add({
                    ...booking,
                    timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
                });
                bookingId = docRef.id;
                saveSuccess = true;
                console.log('✅ Booking saved to Firebase:', bookingId);
            } else {
                // Fallback to localStorage
                console.warn('⚠️ Firebase not available, using localStorage');
                bookingId = 'BK-' + Date.now().toString();
                booking.id = bookingId;
                let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                bookings.push(booking);
                localStorage.setItem('bookings', JSON.stringify(bookings));
                saveSuccess = true;
                console.log('✅ Booking saved to localStorage:', bookingId);
            }
        } catch (error) {
            console.error('❌ Error saving booking:', error);
            
            // Try localStorage as fallback
            try {
                bookingId = 'BK-' + Date.now().toString();
                booking.id = bookingId;
                let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                bookings.push(booking);
                localStorage.setItem('bookings', JSON.stringify(bookings));
                saveSuccess = true;
                console.log('✅ Booking saved to localStorage (fallback):', bookingId);
            } catch (localError) {
                console.error('❌ LocalStorage also failed:', localError);
                confirmBookingBtn.innerHTML = originalText;
                confirmBookingBtn.disabled = false;
                showErrorAnimation('बुकिंग सेव करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
                return;
            }
        }
        
        // Reset button
        confirmBookingBtn.innerHTML = originalText;
        confirmBookingBtn.disabled = false;
        
        if (saveSuccess) {
            // Show success animation
            showSuccessAnimation(bookingId);
            
            // Reset form
            document.getElementById('bookingForm').reset();
            document.getElementById('priceAmount').textContent = '₹0';
            document.getElementById('totalAmount').textContent = '₹0';
            
            // WhatsApp confirmation
            setTimeout(() => {
                const whatsappMsg = `🕉️ *बुकिंग कन्फर्मेशन* 🕉️

✅ बुकिंग कन्फर्म!

📝 *विवरण:*
नाम: ${name}
फोन: ${phone}
ईमेल: ${email}

🔮 *सेवा:* ${serviceName}
💰 *शुल्क:* ₹${amount}

📅 *तारीख:* ${date}
⏰ *समय:* ${time}

📌 *विशेष निर्देश:*
${message || 'कोई नहीं'}

*Booking ID:* ${bookingId}

धन्यवाद! 🙏`;
                
                const whatsappURL = `https://wa.me/917070279513?text=${encodeURIComponent(whatsappMsg)}`;
                
                if (confirm('क्या आप WhatsApp पर confirmation भेजना चाहते हैं?')) {
                    window.open(whatsappURL, '_blank');
                }
            }, 1500);
        }
    });
    
    console.log('✅ Confirm Booking button initialized');
} else {
    console.error('❌ confirmBookingBtn element not found!');
}
