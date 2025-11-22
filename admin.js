// Your Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaILwKaRFXayNBc8gMzBLWaezUXfgCkKA",
    authDomain: "pandit-satya.firebaseapp.com",
    projectId: "pandit-satya",
    storageBucket: "pandit-satya.firebasestorage.app",
    messagingSenderId: "547580234428",
    appId: "1:547580234428:web:443ca17b65841eedbcdeb9"
};

// Initialize Firebase
console.log('🔥 Initializing Firebase Admin Panel...');
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log('✅ Firebase initialized successfully!');
    console.log('📊 Project:', firebaseConfig.projectId);
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
    alert('Firebase initialization failed! Check console for details.');
}

let allBookings = [];
let allContacts = [];
let currentFilter = 'all';
let currentContactFilter = 'all';
let currentTab = 'bookings';

// Load bookings on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM loaded, fetching data...');
    loadBookings();
    loadContacts();
});

// Load all bookings from Firebase
function loadBookings() {
    db.collection('bookings')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            allBookings = [];
            snapshot.forEach((doc) => {
                allBookings.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            updateStats();
            displayBookings(currentFilter);
            
            document.getElementById('loading').style.display = 'none';
            document.getElementById('bookingsTable').style.display = 'table';
        }, (error) => {
            console.error('Error loading bookings:', error);
            document.getElementById('loading').innerHTML = 'Error loading bookings. Please check Firebase configuration.';
        });
}

// Update statistics
function updateStats() {
    const total = allBookings.length;
    const pending = allBookings.filter(b => b.status === 'pending').length;
    const confirmed = allBookings.filter(b => b.status === 'confirmed').length;
    const completed = allBookings.filter(b => b.status === 'completed').length;

    document.getElementById('totalBookings').textContent = total;
    document.getElementById('pendingBookings').textContent = pending;
    document.getElementById('confirmedBookings').textContent = confirmed;
    document.getElementById('completedBookings').textContent = completed;
}

// Display bookings based on filter
function displayBookings(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event?.target?.classList.add('active');

    let filteredBookings = allBookings;
    if (filter !== 'all') {
        filteredBookings = allBookings.filter(b => b.status === filter);
    }

    const tbody = document.getElementById('bookingsBody');
    const noBookings = document.getElementById('noBookings');
    
    if (filteredBookings.length === 0) {
        tbody.innerHTML = '';
        noBookings.style.display = 'block';
        return;
    }

    noBookings.style.display = 'none';
    tbody.innerHTML = filteredBookings.map(booking => `
        <tr>
            <td>${formatDate(booking.date)}</td>
            <td>${booking.name}</td>
            <td>${booking.phone}</td>
            <td>${booking.service}</td>
            <td>${booking.time}</td>
            <td>${booking.paymentMethod}</td>
            <td><span class="status ${booking.status}">${booking.status.toUpperCase()}</span></td>
            <td>
                <div class="action-btns">
                    ${booking.status === 'pending' ? `
                        <button class="action-btn confirm-btn" onclick="updateStatus('${booking.id}', 'confirmed')">Confirm</button>
                    ` : ''}
                    ${booking.status === 'confirmed' ? `
                        <button class="action-btn complete-btn" onclick="updateStatus('${booking.id}', 'completed')">Complete</button>
                    ` : ''}
                    ${booking.status !== 'cancelled' && booking.status !== 'completed' ? `
                        <button class="action-btn cancel-btn" onclick="updateStatus('${booking.id}', 'cancelled')">Cancel</button>
                    ` : ''}
                    <button class="action-btn delete-btn" onclick="deleteBooking('${booking.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter bookings
function filterBookings(filter) {
    displayBookings(filter);
}

// Update booking status
function updateStatus(bookingId, newStatus) {
    if (confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) {
        db.collection('bookings').doc(bookingId).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert(`Booking ${newStatus} successfully!`);
        })
        .catch((error) => {
            console.error('Error updating booking:', error);
            alert('Error updating booking. Please try again.');
        });
    }
}

// Delete booking
function deleteBooking(bookingId) {
    if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
        db.collection('bookings').doc(bookingId).delete()
        .then(() => {
            alert('Booking deleted successfully!');
        })
        .catch((error) => {
            console.error('Error deleting booking:', error);
            alert('Error deleting booking. Please try again.');
        });
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

// Load all contacts from Firebase
function loadContacts() {
    db.collection('contacts')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            allContacts = [];
            snapshot.forEach((doc) => {
                allContacts.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            updateContactStats();
            displayContacts(currentContactFilter);
            
            document.getElementById('contactsLoading').style.display = 'none';
            document.getElementById('contactsTable').style.display = 'table';
        }, (error) => {
            console.error('Error loading contacts:', error);
            document.getElementById('contactsLoading').innerHTML = 'Error loading contacts.';
        });
}

// Update contact statistics
function updateContactStats() {
    const total = allContacts.length;
    document.getElementById('totalContacts').textContent = total;
}

// Display contacts based on filter
function displayContacts(filter) {
    currentContactFilter = filter;
    
    // Update filter buttons
    const contactsSection = document.getElementById('contactsSection');
    if (contactsSection) {
        contactsSection.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (event?.target) {
            event.target.classList.add('active');
        }
    }

    let filteredContacts = allContacts;
    if (filter !== 'all') {
        filteredContacts = allContacts.filter(c => c.status === filter);
    }

    const tbody = document.getElementById('contactsBody');
    const noContacts = document.getElementById('noContacts');
    
    if (filteredContacts.length === 0) {
        tbody.innerHTML = '';
        noContacts.style.display = 'block';
        return;
    }

    noContacts.style.display = 'none';
    tbody.innerHTML = filteredContacts.map(contact => `
        <tr>
            <td>${formatDate(contact.createdAt)}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>${contact.service}</td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${contact.message}">${contact.message}</td>
            <td><span class="status ${contact.status}">${contact.status.toUpperCase()}</span></td>
            <td>
                <div class="action-btns">
                    ${contact.status === 'new' ? `
                        <button class="action-btn confirm-btn" onclick="updateContactStatus('${contact.id}', 'replied')">Mark Replied</button>
                    ` : ''}
                    <button class="action-btn delete-btn" onclick="deleteContact('${contact.id}')">Delete</button>
                    <a href="https://wa.me/91${contact.phone}?text=नमस्ते ${contact.name}! आपकी पूछताछ के लिए धन्यवाद।" target="_blank" class="action-btn confirm-btn" style="text-decoration: none; display: inline-block;">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter contacts
function filterContacts(filter) {
    displayContacts(filter);
}

// Update contact status
function updateContactStatus(contactId, newStatus) {
    if (confirm(`Are you sure you want to mark this contact as ${newStatus}?`)) {
        db.collection('contacts').doc(contactId).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert(`Contact marked as ${newStatus} successfully!`);
        })
        .catch((error) => {
            console.error('Error updating contact:', error);
            alert('Error updating contact. Please try again.');
        });
    }
}

// Delete contact
function deleteContact(contactId) {
    if (confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
        db.collection('contacts').doc(contactId).delete()
        .then(() => {
            alert('Contact deleted successfully!');
        })
        .catch((error) => {
            console.error('Error deleting contact:', error);
            alert('Error deleting contact. Please try again.');
        });
    }
}

// Switch between tabs
function switchTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.tab-btn').classList.add('active');
    
    // Show/hide sections
    if (tab === 'bookings') {
        document.getElementById('bookingsSection').style.display = 'block';
        document.getElementById('contactsSection').style.display = 'none';
    } else if (tab === 'contacts') {
        document.getElementById('bookingsSection').style.display = 'none';
        document.getElementById('contactsSection').style.display = 'block';
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}
