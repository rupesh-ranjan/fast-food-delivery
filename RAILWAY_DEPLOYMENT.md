# 🚀 Deploy Full Stack App on Railway

This guide will help you deploy both your React frontend and Node.js backend on Railway in a single deployment.

## ✅ What's Been Set Up

1. **Combined Server** (`server.js`):

    - Serves React app from `dist` folder
    - Handles API proxy to Swiggy
    - No CORS issues (same domain)

2. **Updated Package.json**:

    - Added backend dependencies (Express, CORS, Axios)
    - Added `start` script for Railway

3. **Railway Configuration** (`railway.json`):

    - Configures deployment settings
    - Sets up health checks

4. **Updated Constants**:
    - API URLs use relative paths (`/api/swiggy/...`)
    - Works with combined server

## 🛠️ Deployment Steps

### Step 1: Push to GitHub

Make sure your code is pushed to GitHub with all the new files:

- `server.js`
- `railway.json`
- Updated `package.json`
- Updated `src/utils/constants.js`

### Step 2: Deploy to Railway

1. **Go to Railway Dashboard**

    - Visit https://railway.app/
    - Sign in with GitHub

2. **Create New Project**

    - Click "New Project"
    - Select "Deploy from GitHub repo"
    - Choose your repository

3. **Railway will automatically**:
    - Detect it's a Node.js app
    - Install dependencies
    - Build your React app (`npm run build`)
    - Start the server (`npm start`)
    - Give you a live URL

## 🔧 How It Works

### Architecture

```
Railway Server
├── dist/                  # Built React app (served statically)
│   ├── index.html
│   ├── assets/
│   └── ...
├── server.js             # Express server (API + static files)
└── package.json          # Dependencies
```

### Request Flow

1. **Frontend Request**: `https://your-app.railway.app/`

    - Serves React app from `dist` folder

2. **API Request**: `https://your-app.railway.app/api/swiggy/...`

    - Proxies to Swiggy API
    - Returns data to frontend

3. **React Router**: Any route serves `index.html`
    - React Router handles client-side routing

## 🌐 Your App URLs

After deployment, your app will be available at:

- **Frontend**: `https://your-app.railway.app`
- **API Health**: `https://your-app.railway.app/health`
- **API Proxy**: `https://your-app.railway.app/api/swiggy/*`

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**

    ```bash
    # Check if build works locally
    npm run build
    ```

2. **Server Won't Start**

    ```bash
    # Test server locally
    npm start
    ```

3. **API Calls Failing**
    - Check Railway logs
    - Verify proxy endpoint is working
    - Test health endpoint: `/health`

### Debug Commands

```bash
# Install dependencies
npm install

# Build frontend
npm run build

# Test server locally
npm start

# Check if dist folder exists
ls dist/
```

## 💰 Cost

**Railway Free Tier:**

- 500 hours/month
- 1GB RAM
- Shared CPU
- Perfect for this use case!

## ✅ Success Checklist

- [ ] All files are pushed to GitHub
- [ ] `server.js` is in root directory
- [ ] `package.json` has backend dependencies
- [ ] `railway.json` is configured
- [ ] API URLs use relative paths (`/api/swiggy/...`)
- [ ] Deployed to Railway
- [ ] App loads without CORS errors
- [ ] API calls work correctly

## 🎯 Next Steps

After successful deployment:

1. **Custom Domain**: Add your own domain in Railway
2. **Environment Variables**: Configure for different environments
3. **Monitoring**: Set up logging and monitoring
4. **Scaling**: Upgrade if you need more resources

## 🔗 Useful Links

- [Railway Documentation](https://docs.railway.app/)
- [Express.js Documentation](https://expressjs.com/)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)

Your app should now work perfectly on Railway with no CORS issues! 🎉
