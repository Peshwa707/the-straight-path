// Authentication and User Management

class AuthManager {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = null;
        this.init();
    }

    init() {
        if (this.token) {
            this.verifyToken();
        }
    }

    async verifyToken() {
        try {
            const response = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.user = data.user;
                this.updateUI(true);
            } else {
                this.logout();
            }
        } catch (error) {
            console.error('Token verification error:', error);
            this.logout();
        }
    }

    async register(name, email, password) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', this.token);
                this.updateUI(true);
                return { success: true, message: 'Registration successful!' };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    async login(email, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', this.token);
                this.updateUI(true);
                return { success: true, message: 'Login successful!' };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    async logout() {
        try {
            if (this.token) {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        }

        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        this.updateUI(false);
    }

    updateUI(isAuthenticated) {
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        const progressNav = document.querySelector('[data-section="user-progress"]');
        const notesNav = document.querySelector('[data-section="user-notes"]');

        if (isAuthenticated && this.user) {
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'flex';
                const userName = document.getElementById('user-name');
                if (userName) userName.textContent = this.user.name;
            }
            if (progressNav) progressNav.style.display = 'inline-block';
            if (notesNav) notesNav.style.display = 'inline-block';
        } else {
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
            if (progressNav) progressNav.style.display = 'none';
            if (notesNav) notesNav.style.display = 'none';
        }
    }

    isAuthenticated() {
        return !!this.token && !!this.user;
    }

    getToken() {
        return this.token;
    }

    getUser() {
        return this.user;
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Show login modal
function showLoginModal() {
    const modal = document.getElementById('auth-modal');
    const form = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (modal && form) {
        form.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        modal.style.display = 'flex';
    }
}

// Show register modal
function showRegisterModal() {
    const modal = document.getElementById('auth-modal');
    const form = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (modal && form) {
        form.style.display = 'block';
        if (loginForm) loginForm.style.display = 'none';
        modal.style.display = 'flex';
    }
}

// Close modal
function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const messageDiv = document.getElementById('login-message');

    const result = await authManager.login(email, password);

    if (messageDiv) {
        messageDiv.textContent = result.message;
        messageDiv.className = `auth-message ${result.success ? 'success' : 'error'}`;
    }

    if (result.success) {
        setTimeout(() => {
            closeAuthModal();
            showNotification('Welcome back! ' + authManager.user.name, 'success');
        }, 1000);
    }
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const messageDiv = document.getElementById('register-message');

    if (password !== confirmPassword) {
        if (messageDiv) {
            messageDiv.textContent = 'Passwords do not match';
            messageDiv.className = 'auth-message error';
        }
        return;
    }

    const result = await authManager.register(name, email, password);

    if (messageDiv) {
        messageDiv.textContent = result.message;
        messageDiv.className = `auth-message ${result.success ? 'success' : 'error'}`;
    }

    if (result.success) {
        setTimeout(() => {
            closeAuthModal();
            showNotification('Welcome to The Straight Path, ' + authManager.user.name + '!', 'success');
        }, 1000);
    }
}

// Handle logout
async function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        await authManager.logout();
        showNotification('Logged out successfully', 'info');

        // Navigate to home
        const homeSection = document.querySelector('[data-section="home"]');
        if (homeSection) {
            homeSection.click();
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Export for use in other files
window.authManager = authManager;
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.closeAuthModal = closeAuthModal;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleLogout = handleLogout;
window.showNotification = showNotification;
