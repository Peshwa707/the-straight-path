require('dotenv').config();
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const path = require('path');

// Import database connection
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database (optional - app will work without it)
let isDBConnected = false;
connectDB().then(() => {
    isDBConnected = true;
}).catch(err => {
    console.log('⚠️  Running in frontend-only mode (database not available)');
    console.log('📖 All Islamic content sections are fully functional');
    console.log('💡 User accounts, progress tracking, and notes are disabled');
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
}));

// Enable gzip compression for better performance
app.use(compression());

// Session configuration
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: process.env.NODE_ENV === 'production' // HTTPS only in production
    }
};

// Use MongoDB for session storage only if MONGODB_URI is provided
if (process.env.MONGODB_URI) {
    try {
        sessionConfig.store = MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            touchAfter: 24 * 3600 // lazy session update (24 hours)
        });
        console.log('📦 Using MongoDB for session storage');
    } catch (err) {
        console.log('⚠️  Using memory store for sessions (not recommended for production)');
    }
} else {
    console.log('📦 Using memory store for sessions (frontend-only mode)');
}

app.use(session(sessionConfig));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// API Routes - only load if database features are available
if (process.env.MONGODB_URI) {
    // Import routes only when database is configured
    const authRoutes = require('./routes/auth');
    const progressRoutes = require('./routes/progress');
    const notesRoutes = require('./routes/notes');

    app.use('/api/auth', authRoutes);
    app.use('/api/progress', progressRoutes);
    app.use('/api/notes', notesRoutes);
} else {
    // Provide informative message for API routes when database is not available
    app.use('/api/auth/*', (req, res) => {
        res.status(503).json({
            success: false,
            message: 'Database features are not available. The app is running in frontend-only mode.'
        });
    });
    app.use('/api/progress/*', (req, res) => {
        res.status(503).json({
            success: false,
            message: 'Database features are not available. The app is running in frontend-only mode.'
        });
    });
    app.use('/api/notes/*', (req, res) => {
        res.status(503).json({
            success: false,
            message: 'Database features are not available. The app is running in frontend-only mode.'
        });
    });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        mode: process.env.MONGODB_URI ? 'Full-stack' : 'Frontend-only',
        database: isDBConnected ? 'Connected' : 'Not connected',
        timestamp: new Date().toISOString()
    });
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname), {
    maxAge: '1d', // Cache static files for 1 day
    etag: true
}));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle SPA routing - redirect to home page for non-API routes
app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api/')) {
        return next();
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);

    // Don't leak error details in production
    const message = process.env.NODE_ENV === 'production'
        ? 'Something went wrong!'
        : err.message;

    res.status(err.status || 500).json({
        success: false,
        message
    });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`🕌 The Straight Path app is running on port ${PORT}`);
    console.log(`📖 Access the app at: http://localhost:${PORT}`);
    console.log(`🔌 API available at: http://localhost:${PORT}/api`);
    console.log(`بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\nSIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});
