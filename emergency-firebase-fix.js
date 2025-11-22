// ============================================
// EMERGENCY FIREBASE FIX - FORCE SAVE
// ============================================

console.log('🚨 Emergency Firebase Fix Loaded!');

window.addEventListener('load', function() {
    console.log('🔧 Forcing Firebase initialization...');
    
    // Wait for Firebase to load
    setTimeout(function() {
        
        // Force check Firebase
        if (typeof firebase === 'undefined') {
            console.error('❌ CRITICAL: Firebase SDK not loaded!');
            alert('❌ Firebase SDK missing! Check internet connection.');
            return;
        }
        
        console.log('✅ Firebase SDK found');
        
        // Force get Firestore instance
        if (!window.db) {
            try {
                window.db = firebase.firestore();
                console.log('✅ Firestore instance created');
            } catch (error) {
                console.error('❌ Failed to create Firestore:', error);
                alert('❌ Firestore error: ' + error.message);
                return;
            }
        }
        
        // Test write immediately
        console.log('🧪 Testing Firebase write...');
        
        window.db.collection('_connection_test').add({
            test: true,
            message: 'Emergency test',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((docRef) => {
            console.log('✅✅✅ FIREBASE WORKING! Test doc ID:', docRef.id);
            alert('✅ Firebase is WORKING!\n\nTest document created: ' + docRef.id);
            
            // Clean up
            return window.db.collection('_connection_test').doc(docRef.id).delete();
        })
        .then(() => {
            console.log('✅ Test document cleaned up');
        })
        .catch((error) => {
            console.error('❌❌❌ FIREBASE ERROR:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            
            alert('❌ Firebase Error!\n\n' +
                  'Code: ' + error.code + '\n' +
                  'Message: ' + error.message + '\n\n' +
                  'Check console for details (F12)');
        });
        
    }, 3000); // Wait 3 seconds
});

// Override contact form submit
window.addEventListener('load', function() {
    setTimeout(function() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) {
            console.error('❌ Contact form not found!');
            return;
        }
        
        console.log('✅ Contact form found, adding emergency handler');
        
        // Add emergency submit handler
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            console.log('🚨 EMERGENCY SUBMIT TRIGGERED!');
            
            // Get values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            console.log('📝 Form data:', { name, phone, email, service, message });
            
            // Validate
            if (!name || !phone || !email || !service || !message) {
                alert('⚠️ कृपया सभी फ़ील्ड भरें!');
                return;
            }
            
            // Prepare data
            const contactData = {
                name: name,
                phone: phone,
                email: email,
                service: service,
                message: message,
                status: 'new',
                type: 'contact_inquiry',
                createdAt: new Date().toISOString(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            console.log('💾 Attempting to save to Firebase...');
            console.log('Data:', contactData);
            
            try {
                const docRef = await window.db.collection('contacts').add(contactData);
                
                console.log('✅✅✅ SUCCESS! Contact saved!');
                console.log('Document ID:', docRef.id);
                
                alert('✅ संदेश सफलतापूर्वक भेजा गया!\n\n' +
                      'Contact ID: ' + docRef.id + '\n\n' +
                      'Firebase में save हो गया है!');
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                console.error('❌❌❌ SAVE FAILED!');
                console.error('Error:', error);
                console.error('Code:', error.code);
                console.error('Message:', error.message);
                
                alert('❌ Error saving to Firebase!\n\n' +
                      'Code: ' + error.code + '\n' +
                      'Message: ' + error.message + '\n\n' +
                      'Data saved to localStorage instead.');
                
                // Fallback to localStorage
                const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
                contactData.id = 'CNT-' + Date.now();
                contacts.push(contactData);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                
                console.log('✅ Saved to localStorage:', contactData.id);
            }
            
        }, true); // Use capture phase to override other handlers
        
        console.log('✅ Emergency handler attached!');
        
    }, 2000);
});

console.log('🎉 Emergency Fix Ready!');
