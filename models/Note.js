const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    contentType: {
        type: String,
        enum: ['verse', 'hadith', 'lesson', 'general'],
        required: true
    },
    contentId: {
        type: String,
        required: true
    },
    contentReference: {
        type: String, // e.g., "Surah Al-Fatiha 1:1-7", "Hadith Qudsi 1"
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    noteText: {
        type: String,
        required: [true, 'Note text is required'],
        trim: true,
        maxlength: [5000, 'Note cannot exceed 5000 characters']
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    color: {
        type: String,
        default: '#fef3c7' // Light yellow
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
noteSchema.index({ userId: 1, contentType: 1 });
noteSchema.index({ userId: 1, isPinned: -1, createdAt: -1 });
noteSchema.index({ userId: 1, tags: 1 });

// Method to update note
noteSchema.methods.updateNote = function(updates) {
    Object.keys(updates).forEach(key => {
        if (updates[key] !== undefined && key !== '_id' && key !== 'userId') {
            this[key] = updates[key];
        }
    });
    this.updatedAt = new Date();
};

// Static method to find notes by user and content
noteSchema.statics.findByUserAndContent = function(userId, contentType, contentId) {
    return this.find({ userId, contentType, contentId }).sort({ createdAt: -1 });
};

// Static method to find notes by tags
noteSchema.statics.findByTags = function(userId, tags) {
    return this.find({ userId, tags: { $in: tags } }).sort({ createdAt: -1 });
};

// Static method to get user's pinned notes
noteSchema.statics.findPinnedNotes = function(userId) {
    return this.find({ userId, isPinned: true }).sort({ updatedAt: -1 });
};

// Static method to get user's favorite notes
noteSchema.statics.findFavoriteNotes = function(userId) {
    return this.find({ userId, isFavorite: true }).sort({ updatedAt: -1 });
};

// Static method to search notes
noteSchema.statics.searchNotes = function(userId, searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    return this.find({
        userId,
        $or: [
            { title: regex },
            { noteText: regex },
            { contentReference: regex },
            { tags: regex }
        ]
    }).sort({ updatedAt: -1 });
};

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
