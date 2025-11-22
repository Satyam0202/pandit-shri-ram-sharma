// ============================================
// FIREBASE CONNECTION CHECK & FIX
// ============================================

console.log('🔥 Firebase Check Script Loaded!');

window.addEventListener('load', function() {
    console.log('✅ Checking Firebase Connection...');
    
    // Wait a bit for Firebase to initialize
    setTimeout(function() {
        
        // Check if Firebase is loaded
        if (typeof firebase === 'undefined') {
            console.error('❌ Firebase SDK not loaded!');
            console.error('Please check if Firebase scripts are included in HTML');
            return;
        }
        
        console.log('✅ Firebase SDK loaded');
        
        // Check if Firebase is initialized
        try {
            const app = firebase.app();
            console.log('✅ Firebase initialized:', app.name);
        } catch (error) {
            console.error('❌ Firebase not initialized:', error);
            return;
        }
        
        // Check if Firestore is available
        if (typeof firebase.firestore === 'undefined') {
            console.error('❌ Firestore not loaded!');
            return;
        }
        
        console.log('✅ Firestore available');
        
        // Check if db is accessible
        if (!window.db) {
            console.error('❌ window.db not found!');
            console.log('Attempting to get Firestore instance...');
            
            try {
                window.db = firebase.firestore();
                console.log('✅ window.db created successfully');
            } catch (error) {
                console.error('❌ Failed to create window.db:', error);
                return;
            }
        } else {
            console.log('✅ window.db available');
        }
        
        // Test Firebase connection
        console.log('🧪 Testing Firebase connection...');
        
        window.db.collection('_test_').doc('connection_test').set({
            test: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log('✅ Firebase connection successful!');
            console.log('✅ Data can be written to Firestore');
            
            // Clean up test document
            return window.db.collection('_test_').doc('connection_test').delete();
        })
        .then(() => {
            console.log('✅ Test document cleaned up');
        })
        .catch((error) => {
            console.error('❌ Firebase connection failed:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            
            if (error.code === 'permission-denied') {
                console.error('⚠️ PERMISSION DENIED!');
                console.error('Please check Firebase Security Rules');
                console.error('Go to: Firebase Console → Firestore Database → Rules');
                console.error('Set rules to allow read/write (for testing):');
                console.error(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
                `);
            }
        });
        
        // Display Firebase status on page
        displayFirebaseStatus();
        
    }, 2000); // Wait 2 seconds for Firebase to fully initialize
});

// Display Firebase status on page
function displayFirebaseStatus() {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'firebaseStatus';
    statusDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
    `;
    
    const isConnected = window.db && typeof firebase !== 'undefined';
    
    if (isConnected) {
        statusDiv.innerHTML = '🔥 Firebase: Connected ✅';
        statusDiv.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    } else {
        statusDiv.innerHTML = '🔥 Firebase: Disconnected ❌';
        statusDiv.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
    }
    
    // Click to toggle details
    statusDiv.addEventListener('click', function() {
        console.log('=== FIREBASE STATUS ===');
        console.log('Firebase SDK:', typeof firebase !== 'undefined' ? '✅' : '❌');
        console.log('Firestore:', typeof firebase !== 'undefined' && typeof firebase.firestore !== 'undefined' ? '✅' : '❌');
        console.log('window.db:', window.db ? '✅' : '❌');
        console.log('window.firebase:', window.firebase ? '✅' : '❌');
        
        if (window.db) {
            console.log('Firestore instance:', window.db);
        }
        
        alert('Firebase Status:\n\n' +
              'SDK: ' + (typeof firebase !== 'undefined' ? '✅ Loaded' : '❌ Not Loaded') + '\n' +
              'Firestore: ' + (typeof firebase !== 'undefined' && typeof firebase.firestore !== 'undefined' ? '✅ Available' : '❌ Not Available') + '\n' +
              'window.db: ' + (window.db ? '✅ Connected' : '❌ Not Connected') + '\n\n' +
              'Check console (F12) for detailed logs');
    });
    
    // Auto-hide after 5 seconds
    setTimeout(function() {
        statusDiv.style.opacity = '0.3';
        statusDiv.style.transform = 'scale(0.8)';
    }, 5000);
    
    // Show on hover
    statusDiv.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(statusDiv);
}

console.log('🎉 Firebase Check System Ready!');
