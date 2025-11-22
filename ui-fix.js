// ============================================
// UI FIX - Theme Toggle & Typing Animation
// ============================================

console.log('🎨 UI Fix Script Loaded!');

window.addEventListener('load', function() {
    console.log('✅ Initializing UI Components...');
    
    // ==========================================
    // 1. TYPING ANIMATION FIX
    // ==========================================
    const typedTextElement = document.getElementById('typedText');
    
    if (typedTextElement) {
        console.log('✅ Typed text element found');
        
        const textToType = 'पंडित श्री राम शर्मा';
        let charIndex = 0;
        
        // Clear any existing text
        typedTextElement.textContent = '';
        
        function typeText() {
            if (charIndex < textToType.length) {
                typedTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 150);
            } else {
                console.log('✅ Typing animation completed!');
            }
        }
        
        // Start typing after 1 second
        setTimeout(function() {
            console.log('🔤 Starting typing animation...');
            typeText();
        }, 1000);
        
    } else {
        console.error('❌ Typed text element not found!');
    }
    
    // ==========================================
    // 2. THEME TOGGLE FIX
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        console.log('✅ Theme toggle button found');
        
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');
        
        if (!themeIcon) {
            console.error('❌ Theme icon not found!');
            return;
        }
        
        // Check saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        console.log('💾 Saved theme:', savedTheme);
        
        // Apply saved theme
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            console.log('🌙 Dark mode activated');
        } else {
            body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            console.log('☀️ Light mode activated');
        }
        
        // Add click event listener
        themeToggle.addEventListener('click', function() {
            console.log('🔄 Theme toggle clicked!');
            
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                // Switch to dark mode
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
                console.log('🌙 Switched to dark mode');
            } else {
                // Switch to light mode
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
                console.log('☀️ Switched to light mode');
            }
        });
        
        console.log('✅ Theme toggle initialized!');
        
    } else {
        console.error('❌ Theme toggle button not found!');
    }
    
    // ==========================================
    // 3. VERIFY BUTTON VISIBILITY
    // ==========================================
    setTimeout(function() {
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            const styles = window.getComputedStyle(themeBtn);
            console.log('🔍 Theme button visibility:', styles.display);
            console.log('🔍 Theme button position:', styles.position);
            
            // Force visibility if hidden
            if (styles.display === 'none') {
                themeBtn.style.display = 'flex';
                console.log('✅ Theme button visibility forced!');
            }
        }
    }, 500);
    
    console.log('🎉 UI Components Ready!');
});
