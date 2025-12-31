const mongoose = require('mongoose');

const connectDB = async () => {
    // If no MONGODB_URI is provided, skip database connection
    if (!process.env.MONGODB_URI) {
        console.log('ℹ️  No MONGODB_URI found - skipping database connection');
        return Promise.reject(new Error('No database configured'));
    }

    try {
        const mongoURI = process.env.MONGODB_URI;

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        };

        const conn = await mongoose.connect(mongoURI, options);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error(`❌ MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

        return conn;
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        // Don't exit process, allow app to run without database
        return Promise.reject(error);
    }
};

module.exports = connectDB;
