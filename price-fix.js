// ============================================
// SIMPLE PRICE UPDATE FIX - GUARANTEED WORKING
// ============================================

console.log('💰 Price Fix Script Loaded!');

// Wait for page to fully load
window.addEventListener('load', function() {
    console.log('✅ Page Loaded - Initializing Price Update...');
    
    // Get elements
    const serviceDropdown = document.getElementById('bookingService');
    const priceDisplay = document.getElementById('priceAmount');
    const totalDisplay = document.getElementById('totalAmount');
    
    // Check if elements exist
    if (!serviceDropdown) {
        console.error('❌ Service dropdown not found!');
        return;
    }
    
    if (!priceDisplay) {
        console.error('❌ Price display not found!');
        return;
    }
    
    if (!totalDisplay) {
        console.error('❌ Total display not found!');
        return;
    }
    
    console.log('✅ All elements found!');
    
    // Function to update price
    function updatePrice() {
        // Get selected option
        const selectedOption = serviceDropdown.options[serviceDropdown.selectedIndex];
        
        // Get price from data-price attribute
        const price = selectedOption.getAttribute('data-price');
        
        console.log('🔄 Service Changed:', selectedOption.text);
        console.log('💵 Price:', price);
        
        // Update displays
        if (price && price !== '0') {
            priceDisplay.textContent = '₹' + price;
            totalDisplay.textContent = '₹' + price;
            
            // Add animation
            priceDisplay.style.color = '#28a745';
            priceDisplay.style.fontWeight = 'bold';
            priceDisplay.style.fontSize = '1.5em';
            
            totalDisplay.style.color = '#28a745';
            totalDisplay.style.fontWeight = 'bold';
            totalDisplay.style.fontSize = '1.8em';
            
            // Reset after 1 second
            setTimeout(function() {
                priceDisplay.style.color = '';
                priceDisplay.style.fontSize = '';
                totalDisplay.style.color = '';
                totalDisplay.style.fontSize = '';
            }, 1000);
            
            console.log('✅ Price Updated Successfully!');
        } else {
            priceDisplay.textContent = '₹0';
            totalDisplay.textContent = '₹0';
            console.log('⚠️ No price selected');
        }
    }
    
    // Add event listener
    serviceDropdown.addEventListener('change', updatePrice);
    console.log('✅ Event Listener Attached!');
    
    // Update immediately if already selected
    if (serviceDropdown.value) {
        updatePrice();
    }
    
    console.log('🎉 Price Update System Ready!');
});
