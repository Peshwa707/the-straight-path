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
            notes: [],
            bookmarks: [],
            flashcards: []
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

    // ============ Bookmark Management ============

    // Add or update a bookmark
    addBookmark(surahNumber, verseNumber, surahName) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to save bookmarks' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            // Initialize bookmarks array if it doesn't exist
            if (!users[userIndex].bookmarks) {
                users[userIndex].bookmarks = [];
            }

            // Check if bookmark already exists
            const existingIndex = users[userIndex].bookmarks.findIndex(
                b => b.surahNumber === surahNumber && b.verseNumber === verseNumber
            );

            const bookmark = {
                id: this.generateId(),
                surahNumber: surahNumber,
                verseNumber: verseNumber,
                surahName: surahName,
                createdAt: new Date().toISOString()
            };

            if (existingIndex !== -1) {
                users[userIndex].bookmarks[existingIndex] = bookmark;
            } else {
                users[userIndex].bookmarks.push(bookmark);
            }

            localStorage.setItem('users', JSON.stringify(users));
            this.currentUser = users[userIndex];

            return { success: true, message: 'Bookmark saved successfully', bookmark: bookmark };
        }

        return { success: false, message: 'User not found' };
    }

    // Get all bookmarks
    getBookmarks() {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to view bookmarks' };
        }

        return { success: true, bookmarks: this.currentUser.bookmarks || [] };
    }

    // Delete a bookmark
    deleteBookmark(bookmarkId) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to delete bookmarks' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            users[userIndex].bookmarks = users[userIndex].bookmarks.filter(b => b.id !== bookmarkId);
            localStorage.setItem('users', JSON.stringify(users));
            this.currentUser = users[userIndex];

            return { success: true, message: 'Bookmark deleted successfully' };
        }

        return { success: false, message: 'User not found' };
    }

    // ============ Flashcard Management ============

    // Create a flashcard from a verse
    createFlashcard(surahNumber, verseNumber, surahName, arabic, translation) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to create flashcards' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            // Initialize flashcards array if it doesn't exist
            if (!users[userIndex].flashcards) {
                users[userIndex].flashcards = [];
            }

            const flashcard = {
                id: this.generateId(),
                surahNumber: surahNumber,
                verseNumber: verseNumber,
                surahName: surahName,
                arabic: arabic,
                translation: translation,
                reviewCount: 0,
                lastReviewed: null,
                mastered: false,
                createdAt: new Date().toISOString()
            };

            users[userIndex].flashcards.push(flashcard);
            localStorage.setItem('users', JSON.stringify(users));
            this.currentUser = users[userIndex];

            return { success: true, message: 'Flashcard created successfully', flashcard: flashcard };
        }

        return { success: false, message: 'User not found' };
    }

    // Get all flashcards
    getFlashcards() {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to view flashcards' };
        }

        return { success: true, flashcards: this.currentUser.flashcards || [] };
    }

    // Update flashcard review status
    reviewFlashcard(flashcardId, mastered = false) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to review flashcards' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            const flashcardIndex = users[userIndex].flashcards.findIndex(f => f.id === flashcardId);

            if (flashcardIndex !== -1) {
                users[userIndex].flashcards[flashcardIndex].reviewCount += 1;
                users[userIndex].flashcards[flashcardIndex].lastReviewed = new Date().toISOString();
                users[userIndex].flashcards[flashcardIndex].mastered = mastered;

                localStorage.setItem('users', JSON.stringify(users));
                this.currentUser = users[userIndex];

                return { success: true, message: 'Flashcard reviewed', flashcard: users[userIndex].flashcards[flashcardIndex] };
            }
        }

        return { success: false, message: 'Flashcard not found' };
    }

    // Delete a flashcard
    deleteFlashcard(flashcardId) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to delete flashcards' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            users[userIndex].flashcards = users[userIndex].flashcards.filter(f => f.id !== flashcardId);
            localStorage.setItem('users', JSON.stringify(users));
            this.currentUser = users[userIndex];

            return { success: true, message: 'Flashcard deleted successfully' };
        }

        return { success: false, message: 'User not found' };
    }

    // Get flashcards due for review (not mastered or reviewed more than 7 days ago)
    getDueFlashcards() {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to view flashcards' };
        }

        const flashcards = this.currentUser.flashcards || [];
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dueCards = flashcards.filter(card => {
            if (card.mastered) return false;
            if (!card.lastReviewed) return true;
            return new Date(card.lastReviewed) < sevenDaysAgo;
        });

        return { success: true, flashcards: dueCards };
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
