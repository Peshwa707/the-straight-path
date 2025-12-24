# The Straight Path - Islamic Guidance App

**الصراط المستقيم**

This app helps people find their true purpose in life, which is to be a humble servant of Allah, the Lord of this universe - the Lord of Moses, Jesus, Muhammad and all creation.

## About

The Straight Path is a comprehensive Islamic guidance application that teaches:
- **Belief in Allah (Tawhid)** - Understanding and embracing Allah as the One True God
- **Morality based on Prophet Muhammad's (ﷺ) life** - Learning from the exemplary character of the final messenger
- **Quranic guidance with Tafseer Ibn Kathir** - Understanding the Quran through scholarly commentary
- **Hadith Qudsi** - Sacred narrations directly from Allah through the Prophet

## Features

### 🕌 Main Sections

1. **Home** - Introduction to Islam and the Five Pillars
2. **Quran & Tafseer** - Selected verses with detailed commentary from Tafseer Ibn Kathir
3. **Hadith Qudsi** - Sacred narrations with explanations
4. **Prophet's Life** - Lessons from the life of Prophet Muhammad (ﷺ)
5. **Daily Guidance** - Daily verses, hadith, and Islamic practices
6. **About Islam** - Core beliefs, purpose of life, and Islamic morality

### ✨ Key Features

- Beautiful, responsive Islamic design
- Search functionality for Quran verses and Hadith
- Daily rotating content for continuous learning
- Comprehensive explanations from authentic sources
- Mobile-friendly interface
- **User Accounts** - Secure registration and authentication
- **Progress Tracking** - Track your reading of verses, hadith, and lessons
- **Daily Streak** - Maintain your learning streak with daily activity tracking
- **Notes System** - Take and organize notes while studying
- **Personal Dashboard** - View your statistics and achievements

## Content Sources

The app's knowledge base is derived from:
- **The Holy Quran** - The word of Allah
- **Tafseer Ibn Kathir** - Commentary by the renowned scholar Imam Ibn Kathir
- **Hadith Qudsi** - Sacred narrations from authentic collections
- **Authentic Hadith** - From Sahih al-Bukhari and Sahih Muslim
- **Biography of Prophet Muhammad (ﷺ)** - From authenticated historical sources

## How to Use

### Local Usage
1. Open `index.html` directly in any modern web browser
2. Navigate between sections using the navigation menu
3. Use search boxes to find specific topics
4. Read daily guidance for spiritual growth

### Running with Node.js Server
```bash
# Install dependencies
npm install

# Start the server
npm start

# Access at http://localhost:3000
```

## Purpose

The purpose of this application is to:
- Help people understand Islam and embrace Allah as their Lord
- Teach Islamic morality through the example of Prophet Muhammad (ﷺ)
- Provide authentic knowledge from the Quran and Sunnah
- Guide people to the straight path as mentioned in Surah Al-Fatiha

## Technology

### Frontend
- Pure HTML5, CSS3, and JavaScript
- Responsive design for all devices
- No build process required
- Works offline after initial load

### Backend (for deployment)
- Node.js with Express server
- Compression middleware for performance
- Static file serving with caching
- Security headers

### Database & Authentication
- MongoDB with Mongoose ODM
- JWT-based authentication
- Secure password hashing with bcryptjs
- Session management with express-session
- Progress tracking and statistics
- Notes system with tagging and search

## Database Setup

The app includes user accounts, progress tracking, and notes functionality powered by MongoDB.

### Quick Setup

1. **Choose a MongoDB option:**
   - **MongoDB Atlas** (Recommended for production) - Free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - **Local MongoDB** (For development) - Install from [mongodb.com](https://www.mongodb.com/try/download/community)

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Start the application:**
   ```bash
   npm install
   npm start
   ```

For detailed setup instructions, see [DATABASE_SETUP.md](./DATABASE_SETUP.md)

### Environment Variables

Required environment variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `SESSION_SECRET` - Secret key for sessions

See `.env.example` for full configuration options.

## Deployment

### Deploy to Railway

Railway is a modern deployment platform that makes it easy to deploy web applications. Follow these steps:

#### Quick Deploy

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/your-username/the-straight-path.git
   cd the-straight-path
   ```

2. **Sign up for Railway**
   - Go to [Railway.app](https://railway.app/)
   - Sign up with your GitHub account (free tier available)

3. **Deploy from GitHub**
   - Click "New Project" in Railway dashboard
   - Select "Deploy from GitHub repo"
   - Choose the `the-straight-path` repository
   - Railway will automatically detect the Node.js app and deploy it

4. **Automatic Configuration**
   - Railway automatically reads `package.json` and runs `npm install`
   - The app will start using the `npm start` command
   - Railway assigns a public URL automatically

5. **Access Your App**
   - Railway provides a public URL: `https://your-app.railway.app`
   - Share this URL to make the app accessible worldwide

#### Manual Deploy (Railway CLI)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize and deploy
railway init
railway up

# Open in browser
railway open
```

#### Deploy to Other Platforms

**Heroku:**
```bash
# Install Heroku CLI and login
heroku login

# Create new app
heroku create the-straight-path

# Deploy
git push heroku main

# Open app
heroku open
```

**Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

**Render:**
1. Connect your GitHub repository to Render
2. Create a new "Web Service"
3. Use these settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Deploy

### Environment Variables

No environment variables are required for basic deployment. The app will run on the port provided by the hosting platform (using `process.env.PORT`).

### Custom Domain (Optional)

After deployment on Railway:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

## Future Enhancements

We will continue to add new features as the need arises:
- More Quranic verses and Tafseer content
- Extended Hadith collections
- Prayer time calculator
- Islamic calendar
- Dhikr counter
- Audio recitations

## Disclaimer

This application aims to present authentic Islamic knowledge. For religious rulings and detailed guidance, please consult qualified Islamic scholars.

---

**May Allah guide us all to the straight path and grant us understanding of His religion.**

*"Guide us to the straight path - The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." - Surah Al-Fatiha (1:6-7)* 
