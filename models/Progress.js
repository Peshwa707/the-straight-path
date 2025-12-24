const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    quranVersesRead: [{
        verseId: {
            type: String,
            required: true
        },
        reference: String, // e.g., "Surah Al-Fatiha 1:1-7"
        readAt: {
            type: Date,
            default: Date.now
        },
        timesRead: {
            type: Number,
            default: 1
        }
    }],
    hadithRead: [{
        hadithId: {
            type: String,
            required: true
        },
        title: String, // e.g., "Hadith Qudsi 1"
        readAt: {
            type: Date,
            default: Date.now
        },
        timesRead: {
            type: Number,
            default: 1
        }
    }],
    lessonsCompleted: [{
        lessonId: {
            type: String,
            required: true
        },
        title: String, // e.g., "The Trustworthy - Al-Amin"
        completedAt: {
            type: Date,
            default: Date.now
        },
        timesReviewed: {
            type: Number,
            default: 1
        }
    }],
    dailyStreak: {
        currentStreak: {
            type: Number,
            default: 0
        },
        longestStreak: {
            type: Number,
            default: 0
        },
        lastActiveDate: {
            type: Date,
            default: Date.now
        }
    },
    statistics: {
        totalVersesRead: {
            type: Number,
            default: 0
        },
        totalHadithRead: {
            type: Number,
            default: 0
        },
        totalLessonsCompleted: {
            type: Number,
            default: 0
        },
        totalTimeSpent: {
            type: Number,
            default: 0 // in minutes
        }
    },
    achievements: [{
        name: String,
        description: String,
        earnedAt: {
            type: Date,
            default: Date.now
        },
        icon: String
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Method to mark verse as read
progressSchema.methods.markVerseRead = function(verseId, reference) {
    const existing = this.quranVersesRead.find(v => v.verseId === verseId);

    if (existing) {
        existing.timesRead += 1;
        existing.readAt = new Date();
    } else {
        this.quranVersesRead.push({
            verseId,
            reference,
            readAt: new Date(),
            timesRead: 1
        });
        this.statistics.totalVersesRead += 1;
    }

    this.updateStreak();
    this.lastUpdated = new Date();
};

// Method to mark hadith as read
progressSchema.methods.markHadithRead = function(hadithId, title) {
    const existing = this.hadithRead.find(h => h.hadithId === hadithId);

    if (existing) {
        existing.timesRead += 1;
        existing.readAt = new Date();
    } else {
        this.hadithRead.push({
            hadithId,
            title,
            readAt: new Date(),
            timesRead: 1
        });
        this.statistics.totalHadithRead += 1;
    }

    this.updateStreak();
    this.lastUpdated = new Date();
};

// Method to mark lesson as completed
progressSchema.methods.markLessonCompleted = function(lessonId, title) {
    const existing = this.lessonsCompleted.find(l => l.lessonId === lessonId);

    if (existing) {
        existing.timesReviewed += 1;
        existing.completedAt = new Date();
    } else {
        this.lessonsCompleted.push({
            lessonId,
            title,
            completedAt: new Date(),
            timesReviewed: 1
        });
        this.statistics.totalLessonsCompleted += 1;
    }

    this.updateStreak();
    this.lastUpdated = new Date();
};

// Method to update daily streak
progressSchema.methods.updateStreak = function() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActive = new Date(this.dailyStreak.lastActiveDate);
    lastActive.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
        // Same day, no change
        return;
    } else if (daysDiff === 1) {
        // Consecutive day, increase streak
        this.dailyStreak.currentStreak += 1;
        if (this.dailyStreak.currentStreak > this.dailyStreak.longestStreak) {
            this.dailyStreak.longestStreak = this.dailyStreak.currentStreak;
        }
    } else {
        // Streak broken, reset to 1
        this.dailyStreak.currentStreak = 1;
    }

    this.dailyStreak.lastActiveDate = new Date();
};

// Method to get progress summary
progressSchema.methods.getSummary = function() {
    return {
        statistics: this.statistics,
        dailyStreak: this.dailyStreak,
        recentActivity: {
            versesRead: this.quranVersesRead.slice(-5).reverse(),
            hadithRead: this.hadithRead.slice(-5).reverse(),
            lessonsCompleted: this.lessonsCompleted.slice(-5).reverse()
        },
        achievements: this.achievements
    };
};

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
