const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/notes
// @desc    Get all notes for user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const { contentType, search, pinned, favorite, limit = 50, page = 1 } = req.query;

        let query = { userId: req.user._id };

        if (contentType) {
            query.contentType = contentType;
        }

        if (pinned === 'true') {
            query.isPinned = true;
        }

        if (favorite === 'true') {
            query.isFavorite = true;
        }

        let notes;

        if (search) {
            notes = await Note.searchNotes(req.user._id, search);
        } else {
            const skip = (page - 1) * limit;
            notes = await Note.find(query)
                .sort({ isPinned: -1, updatedAt: -1 })
                .limit(parseInt(limit))
                .skip(skip);
        }

        const total = await Note.countDocuments(query);

        res.json({
            success: true,
            notes,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get notes error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching notes'
        });
    }
});

// @route   GET /api/notes/:id
// @desc    Get single note
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        res.json({
            success: true,
            note
        });
    } catch (error) {
        console.error('Get note error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching note'
        });
    }
});

// @route   POST /api/notes
// @desc    Create new note
// @access  Private
router.post('/', protect, [
    body('contentType').isIn(['verse', 'hadith', 'lesson', 'general']).withMessage('Invalid content type'),
    body('contentId').notEmpty().withMessage('Content ID is required'),
    body('contentReference').notEmpty().withMessage('Content reference is required'),
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
    body('noteText').trim().isLength({ min: 1, max: 5000 }).withMessage('Note text must be between 1 and 5000 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const { contentType, contentId, contentReference, title, noteText, tags, color } = req.body;

        const note = new Note({
            userId: req.user._id,
            contentType,
            contentId,
            contentReference,
            title,
            noteText,
            tags: tags || [],
            color: color || '#fef3c7'
        });

        await note.save();

        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            note
        });
    } catch (error) {
        console.error('Create note error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating note'
        });
    }
});

// @route   PUT /api/notes/:id
// @desc    Update note
// @access  Private
router.put('/:id', protect, [
    body('title').optional().trim().isLength({ min: 1, max: 200 }),
    body('noteText').optional().trim().isLength({ min: 1, max: 5000 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        const { title, noteText, tags, color, isPinned, isFavorite } = req.body;

        if (title !== undefined) note.title = title;
        if (noteText !== undefined) note.noteText = noteText;
        if (tags !== undefined) note.tags = tags;
        if (color !== undefined) note.color = color;
        if (isPinned !== undefined) note.isPinned = isPinned;
        if (isFavorite !== undefined) note.isFavorite = isFavorite;

        note.updatedAt = new Date();

        await note.save();

        res.json({
            success: true,
            message: 'Note updated successfully',
            note
        });
    } catch (error) {
        console.error('Update note error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating note'
        });
    }
});

// @route   DELETE /api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        res.json({
            success: true,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        console.error('Delete note error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting note'
        });
    }
});

// @route   GET /api/notes/content/:contentId
// @desc    Get notes for specific content
// @access  Private
router.get('/content/:contentId', protect, async (req, res) => {
    try {
        const { contentType } = req.query;

        const query = {
            userId: req.user._id,
            contentId: req.params.contentId
        };

        if (contentType) {
            query.contentType = contentType;
        }

        const notes = await Note.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            notes
        });
    } catch (error) {
        console.error('Get content notes error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching notes'
        });
    }
});

// @route   GET /api/notes/tags
// @desc    Get all unique tags for user
// @access  Private
router.get('/tags/all', protect, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id }).select('tags');

        const tagsSet = new Set();
        notes.forEach(note => {
            note.tags.forEach(tag => tagsSet.add(tag));
        });

        const tags = Array.from(tagsSet).sort();

        res.json({
            success: true,
            tags
        });
    } catch (error) {
        console.error('Get tags error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tags'
        });
    }
});

// @route   POST /api/notes/:id/pin
// @desc    Toggle pin status
// @access  Private
router.post('/:id/pin', protect, async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        note.isPinned = !note.isPinned;
        note.updatedAt = new Date();
        await note.save();

        res.json({
            success: true,
            message: note.isPinned ? 'Note pinned' : 'Note unpinned',
            note
        });
    } catch (error) {
        console.error('Toggle pin error:', error);
        res.status(500).json({
            success: false,
            message: 'Error toggling pin'
        });
    }
});

// @route   POST /api/notes/:id/favorite
// @desc    Toggle favorite status
// @access  Private
router.post('/:id/favorite', protect, async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        note.isFavorite = !note.isFavorite;
        note.updatedAt = new Date();
        await note.save();

        res.json({
            success: true,
            message: note.isFavorite ? 'Added to favorites' : 'Removed from favorites',
            note
        });
    } catch (error) {
        console.error('Toggle favorite error:', error);
        res.status(500).json({
            success: false,
            message: 'Error toggling favorite'
        });
    }
});

module.exports = router;
