// Authentication UI Handler for The Straight Path App

document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    // Get DOM elements
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');

    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');

    // Check if user is already logged in
    updateUIForAuthState();

    // Login button click
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
            loginMessage.textContent = '';
            loginForm.reset();
        });
    }

    // Signup button click
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            signupModal.style.display = 'flex';
            signupMessage.textContent = '';
            signupForm.reset();
        });
    }

    // Logout button click
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const result = window.storageService.logout();
            if (result.success) {
                updateUIForAuthState();
                alert('Logged out successfully');
            }
        });
    }

    // Close modals
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const result = window.storageService.login(email, password);

            if (result.success) {
                loginMessage.textContent = result.message;
                loginMessage.style.color = '#14a085';
                loginModal.style.display = 'none';
                updateUIForAuthState();
                alert('Login successful! Welcome back.');
            } else {
                loginMessage.textContent = result.message;
                loginMessage.style.color = '#e74c3c';
            }
        });
    }

    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;

            // Validate passwords match
            if (password !== confirmPassword) {
                signupMessage.textContent = 'Passwords do not match';
                signupMessage.style.color = '#e74c3c';
                return;
            }

            // Validate password length
            if (password.length < 6) {
                signupMessage.textContent = 'Password must be at least 6 characters';
                signupMessage.style.color = '#e74c3c';
                return;
            }

            const result = window.storageService.register(username, email, password);

            if (result.success) {
                signupMessage.textContent = result.message + ' - Please login.';
                signupMessage.style.color = '#14a085';

                // Clear form and show login modal after 2 seconds
                setTimeout(() => {
                    signupModal.style.display = 'none';
                    loginModal.style.display = 'flex';
                    document.getElementById('login-email').value = email;
                }, 2000);
            } else {
                signupMessage.textContent = result.message;
                signupMessage.style.color = '#e74c3c';
            }
        });
    }
}

// Update UI based on authentication state
function updateUIForAuthState() {
    const isLoggedIn = window.storageService.isLoggedIn();
    const loggedOutView = document.getElementById('logged-out-view');
    const loggedInView = document.getElementById('logged-in-view');

    if (isLoggedIn) {
        const user = window.storageService.getCurrentUser();
        loggedOutView.style.display = 'none';
        loggedInView.style.display = 'block';

        // Update user info
        document.getElementById('username-display').textContent = user.username;
        document.getElementById('verses-count').textContent = user.progress.versesRead;
        document.getElementById('hadith-count').textContent = user.progress.hadithStudied;
        document.getElementById('streak-count').textContent = user.progress.dailyStreak + ' days';
    } else {
        loggedOutView.style.display = 'block';
        loggedInView.style.display = 'none';
    }
}

// Function to track verse reading (call this when user reads a verse)
function trackVerseRead() {
    if (window.storageService.isLoggedIn()) {
        const result = window.storageService.updateProgress('verse', 1);
        if (result.success) {
            updateUIForAuthState();
        }
    }
}

// Function to track hadith study (call this when user reads a hadith)
function trackHadithStudied() {
    if (window.storageService.isLoggedIn()) {
        const result = window.storageService.updateProgress('hadith', 1);
        if (result.success) {
            updateUIForAuthState();
        }
    }
}

// Function to track lesson completion (call this when user completes a lesson)
function trackLessonCompleted() {
    if (window.storageService.isLoggedIn()) {
        const result = window.storageService.updateProgress('lesson', 1);
        if (result.success) {
            updateUIForAuthState();
        }
    }
}

// Export functions for use in other scripts
window.authUI = {
    updateUI: updateUIForAuthState,
    trackVerseRead: trackVerseRead,
    trackHadithStudied: trackHadithStudied,
    trackLessonCompleted: trackLessonCompleted
};
