const express = require('express');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/progress
// @desc    Get user's progress
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let progress = await Progress.findOne({ userId: req.user._id });

        // If no progress exists, create one
        if (!progress) {
            progress = new Progress({ userId: req.user._id });
            await progress.save();
        }

        res.json({
            success: true,
            progress: progress.getSummary()
        });
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching progress'
        });
    }
});

// @route   POST /api/progress/verse
// @desc    Mark verse as read
// @access  Private
router.post('/verse', protect, async (req, res) => {
    try {
        const { verseId, reference } = req.body;

        if (!verseId || !reference) {
            return res.status(400).json({
                success: false,
                message: 'Verse ID and reference are required'
            });
        }

        let progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            progress = new Progress({ userId: req.user._id });
        }

        progress.markVerseRead(verseId, reference);
        await progress.save();

        res.json({
            success: true,
            message: 'Verse marked as read',
            progress: progress.getSummary()
        });
    } catch (error) {
        console.error('Mark verse read error:', error);
        res.status(500).json({
            success: false,
            message: 'Error marking verse as read'
        });
    }
});

// @route   POST /api/progress/hadith
// @desc    Mark hadith as read
// @access  Private
router.post('/hadith', protect, async (req, res) => {
    try {
        const { hadithId, title } = req.body;

        if (!hadithId || !title) {
            return res.status(400).json({
                success: false,
                message: 'Hadith ID and title are required'
            });
        }

        let progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            progress = new Progress({ userId: req.user._id });
        }

        progress.markHadithRead(hadithId, title);
        await progress.save();

        res.json({
            success: true,
            message: 'Hadith marked as read',
            progress: progress.getSummary()
        });
    } catch (error) {
        console.error('Mark hadith read error:', error);
        res.status(500).json({
            success: false,
            message: 'Error marking hadith as read'
        });
    }
});

// @route   POST /api/progress/lesson
// @desc    Mark lesson as completed
// @access  Private
router.post('/lesson', protect, async (req, res) => {
    try {
        const { lessonId, title } = req.body;

        if (!lessonId || !title) {
            return res.status(400).json({
                success: false,
                message: 'Lesson ID and title are required'
            });
        }

        let progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            progress = new Progress({ userId: req.user._id });
        }

        progress.markLessonCompleted(lessonId, title);
        await progress.save();

        res.json({
            success: true,
            message: 'Lesson marked as completed',
            progress: progress.getSummary()
        });
    } catch (error) {
        console.error('Mark lesson completed error:', error);
        res.status(500).json({
            success: false,
            message: 'Error marking lesson as completed'
        });
    }
});

// @route   GET /api/progress/stats
// @desc    Get detailed statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
    try {
        const progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            return res.json({
                success: true,
                stats: {
                    totalVersesRead: 0,
                    totalHadithRead: 0,
                    totalLessonsCompleted: 0,
                    currentStreak: 0,
                    longestStreak: 0
                }
            });
        }

        res.json({
            success: true,
            stats: {
                ...progress.statistics,
                currentStreak: progress.dailyStreak.currentStreak,
                longestStreak: progress.dailyStreak.longestStreak,
                lastActiveDate: progress.dailyStreak.lastActiveDate
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics'
        });
    }
});

// @route   GET /api/progress/history
// @desc    Get reading history
// @access  Private
router.get('/history', protect, async (req, res) => {
    try {
        const { type, limit = 20 } = req.query;

        const progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            return res.json({
                success: true,
                history: []
            });
        }

        let history = [];

        if (type === 'verse' || !type) {
            history = history.concat(progress.quranVersesRead.slice(-limit).reverse());
        }

        if (type === 'hadith' || !type) {
            history = history.concat(progress.hadithRead.slice(-limit).reverse());
        }

        if (type === 'lesson' || !type) {
            history = history.concat(progress.lessonsCompleted.slice(-limit).reverse());
        }

        // Sort by date
        history.sort((a, b) => {
            const dateA = a.readAt || a.completedAt;
            const dateB = b.readAt || b.completedAt;
            return dateB - dateA;
        });

        res.json({
            success: true,
            history: history.slice(0, limit)
        });
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching history'
        });
    }
});

// @route   DELETE /api/progress/reset
// @desc    Reset progress (for testing or user request)
// @access  Private
router.delete('/reset', protect, async (req, res) => {
    try {
        const progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'No progress found'
            });
        }

        // Reset all progress
        progress.quranVersesRead = [];
        progress.hadithRead = [];
        progress.lessonsCompleted = [];
        progress.dailyStreak = {
            currentStreak: 0,
            longestStreak: 0,
            lastActiveDate: new Date()
        };
        progress.statistics = {
            totalVersesRead: 0,
            totalHadithRead: 0,
            totalLessonsCompleted: 0,
            totalTimeSpent: 0
        };

        await progress.save();

        res.json({
            success: true,
            message: 'Progress reset successfully'
        });
    } catch (error) {
        console.error('Reset progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Error resetting progress'
        });
    }
});

module.exports = router;
