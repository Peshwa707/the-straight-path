# Deployment Guide - The Straight Path

This guide will help you deploy The Straight Path Islamic Guidance App to various cloud platforms.

## Prerequisites

- Git installed on your computer
- GitHub account
- Node.js v14 or higher (for local testing)

## Railway Deployment (Recommended)

Railway offers the easiest deployment experience with a generous free tier.

### Step-by-Step Guide

#### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

#### 2. Sign Up for Railway

1. Visit [Railway.app](https://railway.app/)
2. Click "Login" and sign in with your GitHub account
3. Authorize Railway to access your GitHub repositories

#### 3. Create New Project

1. Click "New Project" on your Railway dashboard
2. Select "Deploy from GitHub repo"
3. Choose your repository: `the-straight-path`
4. Railway will automatically:
   - Detect the Node.js application
   - Run `npm install` to install dependencies
   - Start the server with `npm start`
   - Assign a public URL

#### 4. Monitor Deployment

1. Watch the deployment logs in real-time
2. Look for the message: "🕌 The Straight Path app is running on port..."
3. Once deployment succeeds, click "View Logs" to see any issues

#### 5. Access Your Application

1. In your Railway project, click "Settings"
2. Under "Domains", you'll see your app URL: `https://your-app-name.up.railway.app`
3. Click the URL to open your deployed app
4. Share this URL with others!

### Railway Configuration

The app includes these configuration files for Railway:
- `package.json` - Defines dependencies and start command
- `railway.json` - Railway-specific configuration
- `Procfile` - Process configuration
- `.npmrc` - NPM configuration

### Troubleshooting Railway Deployment

**Issue: Build fails**
- Check the build logs in Railway dashboard
- Ensure `package.json` is valid
- Verify Node.js version compatibility

**Issue: App crashes on startup**
- Check runtime logs for errors
- Ensure the PORT environment variable is being used
- Verify all dependencies are listed in `package.json`

**Issue: 404 errors**
- Ensure `index.html` is in the root directory
- Check that static file paths are correct
- Verify the server.js file is serving static files

## Alternative: Heroku Deployment

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps

```bash
# Login to Heroku
heroku login

# Create new app
heroku create the-straight-path-islamic

# Deploy
git push heroku main

# Open app
heroku open
```

### Heroku Configuration

No additional configuration needed. Heroku will:
- Detect the Node.js app from `package.json`
- Use the Procfile for the start command
- Set the PORT environment variable automatically

## Alternative: Vercel Deployment

### Prerequisites
- Vercel account
- Vercel CLI (optional)

### Option 1: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository
5. Vercel auto-detects settings
6. Click "Deploy"

### Option 2: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts
```

## Alternative: Render Deployment

### Steps

1. Go to [render.com](https://render.com)
2. Sign up/Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: the-straight-path
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click "Create Web Service"

## Alternative: DigitalOcean App Platform

### Steps

1. Go to [DigitalOcean](https://www.digitalocean.com/)
2. Navigate to App Platform
3. Click "Create App"
4. Connect your GitHub repository
5. DigitalOcean auto-detects the Node.js app
6. Review and deploy

## Local Testing Before Deployment

Always test locally before deploying:

```bash
# Install dependencies
npm install

# Start server
npm start

# Open browser to http://localhost:3000
```

## Custom Domain Setup

### Railway

1. In Railway project settings, go to "Domains"
2. Click "Add Domain"
3. Enter your domain name
4. Update your DNS records:
   - Type: CNAME
   - Name: @ (or subdomain)
   - Value: [provided by Railway]

### Heroku

```bash
# Add custom domain
heroku domains:add www.yourdomain.com

# Get DNS target
heroku domains
```

Update DNS:
- Type: CNAME
- Name: www
- Value: [provided by Heroku]

## Environment Variables (Optional)

Currently, no environment variables are required. If you add features requiring secrets:

### Railway
1. Go to project settings
2. Click "Variables"
3. Add your environment variables

### Heroku
```bash
heroku config:set VARIABLE_NAME=value
```

## Monitoring and Logs

### Railway
- View logs in the Railway dashboard
- Access metrics and resource usage
- Set up webhooks for deployment notifications

### Heroku
```bash
# View logs
heroku logs --tail

# View app info
heroku info
```

## Performance Optimization

The app already includes:
- Gzip compression for faster loading
- Static file caching (1 day)
- Security headers
- Optimized asset delivery

## SSL/HTTPS

All mentioned platforms provide free SSL certificates automatically:
- Railway: Automatic
- Heroku: Automatic
- Vercel: Automatic
- Render: Automatic

## Cost Estimates

### Free Tier Limits

**Railway Free Tier:**
- $5 credit per month
- 500 GB bandwidth
- Sufficient for moderate traffic

**Heroku Free Tier:**
- Note: Heroku discontinued free tier in 2022
- Eco Dynos: $5/month

**Vercel Free Tier:**
- 100 GB bandwidth
- Unlimited personal projects

**Render Free Tier:**
- 750 hours/month
- Spins down after inactivity

## Backup and Updates

### Updating the App

```bash
# Make changes to your code
git add .
git commit -m "Update app"
git push origin main
```

Railway, Vercel, and Render will automatically redeploy on push to main.

### Database Backup (Future)

When you add a database:
- Use Railway's backup features
- Enable automatic backups
- Export data regularly

## Support and Resources

- Railway Docs: https://docs.railway.app/
- Heroku Docs: https://devcenter.heroku.com/
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs

## Security Checklist

Before deploying:
- ✅ No sensitive data in code
- ✅ `.gitignore` excludes `node_modules/`
- ✅ Environment variables for secrets (if needed)
- ✅ HTTPS enabled (automatic on all platforms)
- ✅ Security headers configured in server.js

---

**May Allah make this deployment smooth and the app beneficial for all who seek guidance.**

بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
