// ============================================
// DATE & TIME VALIDATION FIX
// ============================================

console.log('📅 Validation Fix Script Loaded!');

window.addEventListener('load', function() {
    console.log('✅ Initializing Date & Time Validation...');
    
    const bookingDate = document.getElementById('bookingDate');
    const bookingTime = document.getElementById('bookingTime');
    
    if (!bookingDate || !bookingTime) {
        console.error('❌ Date/Time elements not found!');
        return;
    }
    
    // Set minimum date to today
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    bookingDate.setAttribute('min', todayStr);
    bookingDate.setAttribute('value', todayStr); // Set default to today
    
    console.log('✅ Minimum date set to:', todayStr);
    
    // Date change validation
    bookingDate.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < currentDate) {
            alert('⚠️ कृपया आज या भविष्य की तारीख चुनें!\n\nआप पुरानी तारीख select नहीं कर सकते।');
            this.value = todayStr;
            console.log('❌ Past date rejected');
        } else {
            console.log('✅ Valid date selected:', this.value);
        }
        
        // Clear time if date changed
        if (bookingTime.value) {
            validateTime();
        }
    });
    
    // Time change validation
    bookingTime.addEventListener('change', function() {
        validateTime();
    });
    
    // Time validation function
    function validateTime() {
        const selectedDate = bookingDate.value;
        const selectedTime = bookingTime.value;
        
        if (!selectedDate || !selectedTime) return true;
        
        // Only validate if today is selected
        if (selectedDate === todayStr) {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            
            const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);
            
            // Check if selected time is in the past
            if (selectedHour < currentHour || 
                (selectedHour === currentHour && selectedMinute <= currentMinute)) {
                
                alert('⚠️ कृपया वर्तमान समय के बाद का समय चुनें!\n\nवर्तमान समय: ' + 
                      currentHour + ':' + (currentMinute < 10 ? '0' : '') + currentMinute);
                
                bookingTime.value = '';
                console.log('❌ Past time rejected');
                return false;
            }
        }
        
        console.log('✅ Valid time selected:', selectedTime);
        return true;
    }
    
    // Add validation to payment button
    const payOnlineBtn = document.getElementById('payOnlineBtn');
    if (payOnlineBtn) {
        payOnlineBtn.addEventListener('click', function(e) {
            // Validate date and time before proceeding
            const selectedDate = new Date(bookingDate.value);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            
            if (selectedDate < currentDate) {
                e.stopImmediatePropagation();
                alert('⚠️ कृपया आज या भविष्य की तारीख चुनें!');
                bookingDate.focus();
                return false;
            }
            
            if (!validateTime()) {
                e.stopImmediatePropagation();
                bookingTime.focus();
                return false;
            }
        }, true); // Use capture phase to run before other handlers
        
        console.log('✅ Payment button validation added');
    }
    
    console.log('🎉 Date & Time Validation Ready!');
});
