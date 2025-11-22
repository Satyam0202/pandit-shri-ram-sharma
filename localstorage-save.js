// ============================================
// LOCALSTORAGE DATA SAVE - NO FIREBASE
// ============================================

console.log('💾 LocalStorage Save Script Loaded!');

window.addEventListener('load', function() {
    console.log('✅ Initializing LocalStorage System...');
    
    // Initialize storage if not exists
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([]));
        console.log('✅ Bookings storage initialized');
    }
    
    if (!localStorage.getItem('contacts')) {
        localStorage.setItem('contacts', JSON.stringify([]));
        console.log('✅ Contacts storage initialized');
    }
    
    console.log('🎉 LocalStorage System Ready!');
});

// Save booking to localStorage
window.saveBooking = function(bookingData) {
    try {
        // Get existing bookings
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        
        // Generate unique ID
        const bookingId = 'BK-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        // Add ID and timestamp
        bookingData.id = bookingId;
        bookingData.createdAt = new Date().toISOString();
        bookingData.timestamp = Date.now();
        
        // Add to array
        bookings.push(bookingData);
        
        // Save back to localStorage
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        console.log('✅ Booking saved:', bookingId);
        console.log('📊 Total bookings:', bookings.length);
        
        return bookingId;
        
    } catch (error) {
        console.error('❌ Error saving booking:', error);
        return null;
    }
};

// Save contact to localStorage
window.saveContact = function(contactData) {
    try {
        // Get existing contacts
        let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        
        // Generate unique ID
        const contactId = 'CNT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        // Add ID and timestamp
        contactData.id = contactId;
        contactData.createdAt = new Date().toISOString();
        contactData.timestamp = Date.now();
        contactData.status = 'new';
        contactData.type = 'contact_inquiry';
        
        // Add to array
        contacts.push(contactData);
        
        // Save back to localStorage
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        console.log('✅ Contact saved:', contactId);
        console.log('📊 Total contacts:', contacts.length);
        
        return contactId;
        
    } catch (error) {
        console.error('❌ Error saving contact:', error);
        return null;
    }
};

// Get all bookings
window.getAllBookings = function() {
    try {
        return JSON.parse(localStorage.getItem('bookings') || '[]');
    } catch (error) {
        console.error('❌ Error getting bookings:', error);
        return [];
    }
};

// Get all contacts
window.getAllContacts = function() {
    try {
        return JSON.parse(localStorage.getItem('contacts') || '[]');
    } catch (error) {
        console.error('❌ Error getting contacts:', error);
        return [];
    }
};

// Delete booking
window.deleteBooking = function(bookingId) {
    try {
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings = bookings.filter(b => b.id !== bookingId);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        console.log('✅ Booking deleted:', bookingId);
        return true;
    } catch (error) {
        console.error('❌ Error deleting booking:', error);
        return false;
    }
};

// Delete contact
window.deleteContact = function(contactId) {
    try {
        let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts = contacts.filter(c => c.id !== contactId);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        console.log('✅ Contact deleted:', contactId);
        return true;
    } catch (error) {
        console.error('❌ Error deleting contact:', error);
        return false;
    }
};

// Update booking status
window.updateBookingStatus = function(bookingId, newStatus) {
    try {
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const index = bookings.findIndex(b => b.id === bookingId);
        
        if (index !== -1) {
            bookings[index].status = newStatus;
            bookings[index].updatedAt = new Date().toISOString();
            localStorage.setItem('bookings', JSON.stringify(bookings));
            console.log('✅ Booking status updated:', bookingId, '→', newStatus);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('❌ Error updating booking:', error);
        return false;
    }
};

// Export data as JSON (for backup)
window.exportData = function() {
    const data = {
        bookings: getAllBookings(),
        contacts: getAllContacts(),
        exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pandit-bookings-' + Date.now() + '.json';
    link.click();
    
    console.log('✅ Data exported');
};

// Clear all data (use with caution!)
window.clearAllData = function() {
    if (confirm('⚠️ Are you sure? This will delete ALL bookings and contacts!')) {
        localStorage.removeItem('bookings');
        localStorage.removeItem('contacts');
        localStorage.setItem('bookings', JSON.stringify([]));
        localStorage.setItem('contacts', JSON.stringify([]));
        console.log('✅ All data cleared');
        alert('✅ All data has been cleared!');
    }
};

console.log('💾 LocalStorage functions available:');
console.log('  - saveBooking(data)');
console.log('  - saveContact(data)');
console.log('  - getAllBookings()');
console.log('  - getAllContacts()');
console.log('  - deleteBooking(id)');
console.log('  - deleteContact(id)');
console.log('  - updateBookingStatus(id, status)');
console.log('  - exportData()');
console.log('  - clearAllData()');
