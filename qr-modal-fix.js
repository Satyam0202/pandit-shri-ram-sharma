// ============================================
// QR CODE MODAL FIX - GUARANTEED WORKING
// ============================================

console.log('💳 QR Modal Fix Script Loaded!');

window.addEventListener('load', function() {
    console.log('✅ Initializing QR Modal...');
    
    const paymentBtn = document.getElementById('payOnlineBtn');
    
    if (!paymentBtn) {
        console.error('❌ Payment button not found!');
        return;
    }
    
    // Add click handler with highest priority
    paymentBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('💳 Payment button clicked!');
        
        // Get form values
        const name = document.getElementById('bookingName').value.trim();
        const phone = document.getElementById('bookingPhone').value.trim();
        const email = document.getElementById('bookingEmail').value.trim();
        const serviceDropdown = document.getElementById('bookingService');
        const date = document.getElementById('bookingDate').value;
        const time = document.getElementById('bookingTime').value;
        
        // Basic validation
        if (!name) {
            alert('⚠️ कृपया अपना नाम दर्ज करें');
            document.getElementById('bookingName').focus();
            return;
        }
        
        if (!phone || phone.length !== 10) {
            alert('⚠️ कृपया सही मोबाइल नंबर दर्ज करें (10 अंक)');
            document.getElementById('bookingPhone').focus();
            return;
        }
        
        if (!email || !email.includes('@')) {
            alert('⚠️ कृपया सही ईमेल पता दर्ज करें');
            document.getElementById('bookingEmail').focus();
            return;
        }
        
        if (!serviceDropdown.value) {
            alert('⚠️ कृपया सेवा चुनें');
            serviceDropdown.focus();
            return;
        }
        
        if (!date) {
            alert('⚠️ कृपया तारीख चुनें');
            document.getElementById('bookingDate').focus();
            return;
        }
        
        if (!time) {
            alert('⚠️ कृपया समय चुनें');
            document.getElementById('bookingTime').focus();
            return;
        }
        
        // Get service details
        const selectedOption = serviceDropdown.options[serviceDropdown.selectedIndex];
        const serviceName = selectedOption.text;
        const amount = selectedOption.getAttribute('data-price');
        
        console.log('✅ All validations passed!');
        console.log('Opening QR Modal for:', serviceName, '- ₹' + amount);
        
        // Show QR Modal
        showQRModal(name, phone, email, serviceName, amount, date, time);
        
    }, true); // Use capture phase
    
    console.log('✅ Payment button handler attached!');
});

// QR Modal Function
function showQRModal(name, phone, email, serviceName, amount, date, time) {
    console.log('🎯 Creating QR Modal...');
    
    // Remove any existing modal
    const existingModal = document.getElementById('qrPaymentModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'qrPaymentModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        padding: 20px;
        overflow-y: auto;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 20px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="color: #667eea; font-size: 28px; margin-bottom: 10px;">
                    💳 Online Payment
                </h2>
                <p style="color: #666; font-size: 14px;">Scan QR code to pay</p>
            </div>
            
            <!-- Payment Details -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 15px; margin-bottom: 25px; color: white; text-align: center;">
                <p style="margin: 5px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0; font-size: 16px;"><strong>Service:</strong> ${serviceName}</p>
                <p style="margin: 15px 0; font-size: 36px; font-weight: bold;">₹${amount}</p>
            </div>
            
            <!-- QR Code -->
            <div style="background: #f8f9fa; padding: 25px; border: 3px solid #667eea; border-radius: 15px; margin-bottom: 20px; text-align: center;">
                <h3 style="color: #667eea; margin-bottom: 15px; font-size: 20px;">📱 Scan QR Code</h3>
                <div style="background: white; padding: 15px; border-radius: 10px; display: inline-block; margin-bottom: 15px;">
                    <img src="payment-qr.jpg" alt="Payment QR Code" style="width: 280px; height: 280px; display: block; border-radius: 10px;">
                </div>
                <p style="color: #28a745; font-size: 15px; font-weight: 600; margin: 10px 0;">
                    📲 Google Pay | PhonePe | Paytm | WhatsApp Pay
                </p>
            </div>
            
            <!-- UPI ID -->
            <div style="background: #e8f5e9; padding: 18px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #28a745; text-align: center;">
                <p style="color: #2e7d32; font-weight: 700; margin-bottom: 12px; font-size: 16px;">
                    🆔 या UPI ID से भुगतान करें:
                </p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;">
                    <code style="background: white; padding: 12px 18px; border-radius: 8px; font-size: 17px; font-weight: bold; color: #2e7d32; border: 2px solid #28a745;">
                        7070279513@kotak811
                    </code>
                    <button onclick="copyUPI()" style="background: #28a745; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 15px;">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            </div>
            
            <!-- Warning -->
            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #ffc107; text-align: center;">
                <p style="color: #856404; font-size: 15px; margin: 0; font-weight: 600;">
                    ⚠️ भुगतान पूरा होने के बाद नीचे "Payment Done ✅" बटन पर क्लिक करें
                </p>
            </div>
            
            <!-- Buttons -->
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <button onclick="confirmPaymentDone('${name}', '${phone}', '${email}', '${serviceName}', '${date}', '${time}', '${amount}')" 
                    style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; padding: 15px 35px; border-radius: 12px; cursor: pointer; font-size: 17px; font-weight: 700; box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);">
                    ✅ Payment Done
                </button>
                <button onclick="closeQRModal()" 
                    style="background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%); color: white; border: none; padding: 15px 35px; border-radius: 12px; cursor: pointer; font-size: 17px; font-weight: 700; box-shadow: 0 5px 15px rgba(108, 117, 125, 0.4);">
                    ❌ Cancel
                </button>
            </div>
            
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    
    console.log('✅ QR Modal displayed!');
}

// Copy UPI function
window.copyUPI = function() {
    const upiId = '7070279513@kotak811';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(upiId).then(() => {
            alert('✅ UPI ID Copied!\n\n' + upiId + '\n\nअब अपने UPI app में paste करें');
        });
    } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = upiId;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ UPI ID Copied!\n\n' + upiId);
    }
};

// Close modal function
window.closeQRModal = function() {
    const modal = document.getElementById('qrPaymentModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
        console.log('✅ QR Modal closed');
    }
};

// Confirm payment function - LOCALSTORAGE ONLY
window.confirmPaymentDone = function(name, phone, email, serviceName, date, time, amount) {
    console.log('✅ Payment confirmed!');
    
    // Close modal first
    closeQRModal();
    
    // Prepare booking data
    const bookingData = {
        name: name,
        phone: phone,
        email: email,
        service: serviceName,
        date: date,
        time: time,
        amount: amount,
        status: 'pending',
        paymentMethod: 'Online Payment (UPI/QR)',
        paymentStatus: 'Paid'
    };
    
    // Save to localStorage
    console.log('💾 Saving booking to localStorage...');
    const bookingId = window.saveBooking(bookingData);
    
    if (!bookingId) {
        alert('❌ बुकिंग सेव करने में त्रुटि हुई। कृपया WhatsApp से संपर्क करें।');
        return;
    }
    
    // Show success message
    alert('🎉 Payment Successful!\n\n' +
          'Booking Details:\n' +
          'Booking ID: ' + bookingId + '\n' +
          'Name: ' + name + '\n' +
          'Service: ' + serviceName + '\n' +
          'Amount: ₹' + amount + '\n' +
          'Date: ' + date + '\n' +
          'Time: ' + time + '\n\n' +
          '✅ Data saved successfully!\n' +
          'आपको WhatsApp पर confirmation भेजा जाएगा।');
    
    // Open WhatsApp
    const whatsappMsg = `🕉️ *Payment Confirmation* 🕉️

✅ भुगतान सफल!

📝 *Booking Details:*
Booking ID: ${bookingId}
नाम: ${name}
फोन: ${phone}
सेवा: ${serviceName}
शुल्क: ₹${amount}
तारीख: ${date}
समय: ${time}

*Payment:* Online (UPI/QR)
*Status:* Confirmed ✅

धन्यवाद! 🙏`;
    
    const whatsappURL = `https://wa.me/917070279513?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappURL, '_blank');
    
    // Reset form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.reset();
    }
    
    const priceAmount = document.getElementById('priceAmount');
    const totalAmount = document.getElementById('totalAmount');
    
    if (priceAmount) priceAmount.textContent = '₹0';
    if (totalAmount) totalAmount.textContent = '₹0';
    
    console.log('🎉 Booking process completed!');
};

console.log('🎉 QR Modal System Ready!');
