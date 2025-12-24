# Database Setup Guide

This guide will help you set up the database for The Straight Path app with user accounts, progress tracking, and notes functionality.

## Overview

The app now includes:
- **User Authentication** - Secure registration and login
- **Progress Tracking** - Track Quran verses, Hadith, and lessons completed
- **Notes System** - Take and organize notes while studying
- **Daily Streak** - Maintain your learning streak

## Database Technologies

- **MongoDB** - NoSQL database for flexibility
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-session** - Session management

## Quick Start

### Option 1: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster (Free tier M0 available)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `the-straight-path`

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your MongoDB Atlas URI
   ```

   Example `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/the-straight-path?retryWrites=true&w=majority
   JWT_SECRET=your-random-secret-key-here
   SESSION_SECRET=another-random-secret-key
   ```

4. **Whitelist IP Address**
   - In Atlas, go to Network Access
   - Add your IP address or allow from anywhere (0.0.0.0/0) for development

### Option 2: Local MongoDB (Development)

1. **Install MongoDB**
   ```bash
   # macOS
   brew install mongodb-community
   brew services start mongodb-community

   # Ubuntu/Debian
   sudo apt-get install mongodb
   sudo systemctl start mongodb

   # Windows
   # Download from mongodb.com and install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```

   Your `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/the-straight-path
   JWT_SECRET=your-local-secret-key
   SESSION_SECRET=another-local-secret
   ```

3. **Start the App**
   ```bash
   npm install
   npm start
   ```

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  lastLogin: Date,
  preferences: {
    theme: String,
    notifications: Boolean,
    dailyReminder: Boolean
  }
}
```

### Progress Model
```javascript
{
  userId: ObjectId (ref: User),
  quranVersesRead: [{
    verseId: String,
    reference: String,
    readAt: Date,
    timesRead: Number
  }],
  hadithRead: [{
    hadithId: String,
    title: String,
    readAt: Date,
    timesRead: Number
  }],
  lessonsCompleted: [{
    lessonId: String,
    title: String,
    completedAt: Date,
    timesReviewed: Number
  }],
  dailyStreak: {
    currentStreak: Number,
    longestStreak: Number,
    lastActiveDate: Date
  },
  statistics: {
    totalVersesRead: Number,
    totalHadithRead: Number,
    totalLessonsCompleted: Number,
    totalTimeSpent: Number
  }
}
```

### Note Model
```javascript
{
  userId: ObjectId (ref: User),
  contentType: String (verse/hadith/lesson/general),
  contentId: String,
  contentReference: String,
  title: String,
  noteText: String,
  tags: [String],
  color: String,
  isPinned: Boolean,
  isFavorite: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

### Progress Tracking
- `GET /api/progress` - Get user's progress summary
- `POST /api/progress/verse` - Mark verse as read
- `POST /api/progress/hadith` - Mark hadith as read
- `POST /api/progress/lesson` - Mark lesson as completed
- `GET /api/progress/stats` - Get detailed statistics
- `GET /api/progress/history` - Get reading history
- `DELETE /api/progress/reset` - Reset progress

### Notes
- `GET /api/notes` - Get all notes (with filters)
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `GET /api/notes/content/:contentId` - Get notes for specific content
- `GET /api/notes/tags/all` - Get all tags
- `POST /api/notes/:id/pin` - Toggle pin status
- `POST /api/notes/:id/favorite` - Toggle favorite status

## Example API Usage

### Register a User
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Ahmad',
    email: 'ahmad@example.com',
    password: 'securepassword123'
  })
});

const data = await response.json();
// Returns: { success: true, token: '...', user: {...} }
```

### Mark Verse as Read
```javascript
const response = await fetch('/api/progress/verse', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    verseId: 'fatiha-1-1-7',
    reference: 'Surah Al-Fatiha (1:1-7)'
  })
});
```

### Create a Note
```javascript
const response = await fetch('/api/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    contentType: 'verse',
    contentId: 'fatiha-1-1-7',
    contentReference: 'Surah Al-Fatiha (1:1-7)',
    title: 'Reflection on Al-Fatiha',
    noteText: 'This surah teaches us the importance of guidance...',
    tags: ['guidance', 'prayer', 'reflection']
  })
});
```

## Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Tokens** - Secure authentication
- **Session Management** - MongoDB session store
- **Input Validation** - express-validator
- **Protected Routes** - Authentication middleware
- **CORS Protection** - Configured CORS headers
- **Security Headers** - XSS, CSRF protection

## Railway Deployment with MongoDB Atlas

1. **Create MongoDB Atlas cluster** (free tier)
2. **Get connection string** from Atlas
3. **Add Environment Variables in Railway:**
   - `MONGODB_URI` = your Atlas connection string
   - `JWT_SECRET` = random secure string
   - `SESSION_SECRET` = another random string
   - `NODE_ENV` = production

4. **Deploy to Railway:**
   ```bash
   git add .
   git commit -m "Add database functionality"
   git push origin main
   ```

5. **Railway will automatically:**
   - Install dependencies
   - Connect to MongoDB Atlas
   - Start the server

## Testing the Setup

1. **Check Server Health**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Register a Test User**
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

3. **Check Database Connection**
   - Look for "✅ MongoDB Connected" in server logs

## Troubleshooting

### Connection Issues
- **Error: ECONNREFUSED**
  - Make sure MongoDB is running locally
  - Check MONGODB_URI in .env file

- **Error: Authentication failed**
  - Verify username/password in connection string
  - Check IP whitelist in Atlas

### Common Issues
- **Port already in use**: Change PORT in .env
- **Token expired**: Tokens expire after 7 days, login again
- **Session issues**: Clear browser cookies and localStorage

## Data Backup

### Export Data
```bash
# Export all data
mongodump --uri="your-mongodb-uri" --out=./backup

# Export specific collection
mongodump --uri="your-mongodb-uri" --collection=users --out=./backup
```

### Import Data
```bash
mongorestore --uri="your-mongodb-uri" ./backup
```

## Performance Optimization

- **Indexes**: Models include optimized indexes
- **Session Caching**: Sessions stored in MongoDB for scalability
- **Query Optimization**: Efficient queries with proper projections
- **Connection Pooling**: Mongoose handles connection pooling

## Next Steps

1. Install dependencies: `npm install`
2. Set up MongoDB (Atlas or local)
3. Configure .env file
4. Start server: `npm start`
5. Test API endpoints
6. Deploy to Railway

## Support

For issues or questions:
- Check server logs for detailed error messages
- Verify environment variables are set correctly
- Ensure MongoDB is accessible
- Test API endpoints with curl or Postman

---

**May Allah bless this effort and make it beneficial for those seeking knowledge.**

بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
