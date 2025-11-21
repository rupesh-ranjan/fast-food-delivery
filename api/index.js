import axios from 'axios';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // Extract the path after /api/swiggy
        // req.url in Vercel function might be just the path relative to the function or full path depending on rewrite
        // If we rewrite /api/swiggy/* -> /api/index.js, we need to parse the original URL or query params
        
        // A safer way with Vercel rewrites is to look at the request URL.
        // If the rewrite is /api/swiggy/(.*) -> /api/index.js?path=$1
        // Then we can use req.query.path.
        
        // However, let's try to construct the target URL from the request URL.
        // If the incoming request is /api/swiggy/dapi/restaurants/..., we want https://www.swiggy.com/dapi/restaurants/...
        
        const url = req.url.replace('/api/swiggy', '');
        const targetUrl = `https://www.swiggy.com${url}`;

        console.log('Proxying to:', targetUrl);

        const response = await axios.get(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Referer": "https://www.swiggy.com/",
                "Origin": "https://www.swiggy.com"
            },
            timeout: 10000 // 10 second timeout
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Proxy error:', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({
                error: 'Failed to fetch data from Swiggy API',
                message: error.message
            });
        }
    }
}
