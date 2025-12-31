// Local Storage Service for The Straight Path App
// Handles user authentication, progress tracking, and notes

class LocalStorageService {
    constructor() {
        this.currentUser = null;
        this.initializeStorage();
    }

    // Initialize storage structure
    initializeStorage() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('currentUser')) {
            localStorage.setItem('currentUser', null);
        }
        // Load current user if logged in
        const currentUserId = localStorage.getItem('currentUser');
        if (currentUserId) {
            this.currentUser = this.getUserById(currentUserId);
        }
    }

    // ============ User Authentication ============

    // Register new user
    register(username, email, password) {
        const users = this.getAllUsers();

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }
        if (users.find(u => u.username === username)) {
            return { success: false, message: 'Username already taken' };
        }

        // Create new user
        const newUser = {
            id: this.generateId(),
            username: username,
            email: email,
            password: this.hashPassword(password), // Simple hash for local storage
            createdAt: new Date().toISOString(),
            progress: {
                versesRead: 0,
                hadithStudied: 0,
                lessonsCompleted: 0,
                dailyStreak: 0,
                lastActive: new Date().toISOString()
            },
            notes: []
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        return { success: true, message: 'Account created successfully', user: newUser };
    }

    // Login user
    login(email, password) {
        const users = this.getAllUsers();
        const hashedPassword = this.hashPassword(password);

        const user = users.find(u => u.email === email && u.password === hashedPassword);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', user.id);
            return { success: true, message: 'Login successful', user: user };
        }

        return { success: false, message: 'Invalid email or password' };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.setItem('currentUser', null);
        return { success: true, message: 'Logged out successfully' };
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // ============ Progress Tracking ============

    // Update user progress
    updateProgress(type, increment = 1) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to track progress' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            const today = new Date().toDateString();
            const lastActive = new Date(users[userIndex].progress.lastActive).toDateString();

            // Update streak
            if (today !== lastActive) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                if (yesterday.toDateString() === lastActive) {
                    users[userIndex].progress.dailyStreak += 1;
                } else {
                    users[userIndex].progress.dailyStreak = 1;
                }
            }

            // Update specific progress
            switch(type) {
                case 'verse':
                    users[userIndex].progress.versesRead += increment;
                    break;
                case 'hadith':
                    users[userIndex].progress.hadithStudied += increment;
                    break;
                case 'lesson':
                    users[userIndex].progress.lessonsCompleted += increment;
                    break;
            }

            users[userIndex].progress.lastActive = new Date().toISOString();

            localStorage.setItem('users', JSON.stringify(users));
            this.currentUser = users[userIndex];

            return { success: true, progress: users[userIndex].progress };
        }

        return { success: false, message: 'User not found' };
    }

    // Get user progress
    getProgress() {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to view progress' };
        }

        return { success: true, progress: this.currentUser.progress };
    }

    // ============ Notes Management ============

    // Add a note
    addNote(title, content, tags = []) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to save notes' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            const newNote = {
                id: this.generateId(),
                title: title,
                content: content,
                tags: tags,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            users[userIndex].notes.push(newNote);
            localStorage.setItem('users', JSON.stringify(users));
            this.currentUser = users[userIndex];

            return { success: true, message: 'Note saved successfully', note: newNote };
        }

        return { success: false, message: 'User not found' };
    }

    // Get all notes
    getNotes() {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to view notes' };
        }

        return { success: true, notes: this.currentUser.notes };
    }

    // Update a note
    updateNote(noteId, title, content, tags) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to update notes' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            const noteIndex = users[userIndex].notes.findIndex(n => n.id === noteId);

            if (noteIndex !== -1) {
                users[userIndex].notes[noteIndex].title = title;
                users[userIndex].notes[noteIndex].content = content;
                users[userIndex].notes[noteIndex].tags = tags;
                users[userIndex].notes[noteIndex].updatedAt = new Date().toISOString();

                localStorage.setItem('users', JSON.stringify(users));
                this.currentUser = users[userIndex];

                return { success: true, message: 'Note updated successfully', note: users[userIndex].notes[noteIndex] };
            }
        }

        return { success: false, message: 'Note not found' };
    }

    // Delete a note
    deleteNote(noteId) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to delete notes' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            users[userIndex].notes = users[userIndex].notes.filter(n => n.id !== noteId);
            localStorage.setItem('users', JSON.stringify(users));
            this.currentUser = users[userIndex];

            return { success: true, message: 'Note deleted successfully' };
        }

        return { success: false, message: 'User not found' };
    }

    // ============ Helper Methods ============

    getAllUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    getUserById(userId) {
        const users = this.getAllUsers();
        return users.find(u => u.id === userId) || null;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Simple hash function for password (for demo purposes)
    // In production, use a proper hashing library
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }
}

// Create global instance
window.storageService = new LocalStorageService();
