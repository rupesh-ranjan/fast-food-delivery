# CORS Issue Solution for Swiggy API

This project provides multiple solutions to handle CORS (Cross-Origin Resource Sharing) issues when making requests to Swiggy API from your React frontend.

## Problem

When making direct API calls to `https://www.swiggy.com` from your frontend, you get this error:

```
Access to fetch at 'https://www.swiggy.com/dapi/restaurants/list/v5?...' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solutions

### Solution 1: Vite Proxy (Development Only)

This solution uses Vite's built-in proxy feature to handle CORS during development.

**Setup:**

1. The `vite.config.js` file has been updated with proxy configuration
2. API URLs in `src/utils/constants.js` are configured to use the proxy

**Usage:**

- Start your development server: `npm run dev`
- The proxy will automatically handle CORS issues

**Pros:**

- Easy to set up
- No additional server needed
- Works seamlessly in development

**Cons:**

- Only works in development
- Not suitable for production

### Solution 2: Backend Proxy Server (Recommended for Production)

This solution creates a Node.js backend server that acts as a proxy between your frontend and Swiggy API.

**Setup:**

1. Navigate to the backend directory: `cd api/proxy`
2. Install dependencies: `npm install`
3. Start the proxy server: `npm start` or `npm run dev`

**Usage:**

1. Start the backend proxy server (runs on port 3001)
2. Start your frontend development server (runs on port 5173)
3. The frontend will make requests to the proxy server, which forwards them to Swiggy

**Pros:**

- Works in both development and production
- More control over headers and error handling
- Can add caching, rate limiting, etc.
- Secure and scalable

**Cons:**

- Requires additional server setup
- More complex deployment

## Current Configuration

The project is currently configured to use **Solution 2 (Backend Proxy)**. The API URLs in `src/utils/constants.js` point to `http://localhost:3001/api/swiggy/...`.

## Switching Between Solutions

### To use Vite Proxy (Solution 1):

Update `src/utils/constants.js`:

```javascript
export const MENU_API =
    "/api/swiggy/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4444751&lng=78.3858388&restaurantId=";
export const RESTAURANT_API =
    "/api/swiggy/dapi/restaurants/list/v5?lat=17.4444751&lng=78.3858388&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
```

### To use Backend Proxy (Solution 2):

Update `src/utils/constants.js`:

```javascript
export const MENU_API =
    "http://localhost:3001/api/swiggy/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4444751&lng=78.3858388&restaurantId=";
export const RESTAURANT_API =
    "http://localhost:3001/api/swiggy/dapi/restaurants/list/v5?lat=17.4444751&lng=78.3858388&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
```

## Production Deployment

For production, you should:

1. Deploy the backend proxy server to a hosting service (Heroku, Vercel, etc.)
2. Update the API URLs to point to your deployed proxy server
3. Configure environment variables for different environments

## Alternative Solutions

1. **CORS Browser Extensions**: Not recommended for production
2. **Public CORS Proxy Services**: May have rate limits and security concerns
3. **Swiggy Official API**: If available, would be the best solution

## Troubleshooting

- If the proxy server doesn't start, check if port 3001 is available
- If requests fail, check the browser's Network tab for detailed error messages
- Ensure both frontend and backend servers are running
