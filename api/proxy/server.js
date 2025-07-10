const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(
    cors({
        origin: "http://localhost:5173", // Your frontend URL
        credentials: true,
    })
);

app.use(express.json());

// Proxy endpoint for Swiggy API
app.get("/api/swiggy/*", async (req, res) => {
    try {
        const targetUrl = req.url.replace(
            "/api/swiggy",
            "https://www.swiggy.com"
        );

        const response = await axios.get(targetUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                Accept: "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive",
                Referer: "https://www.swiggy.com/",
                Origin: "https://www.swiggy.com",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Proxy error:", error.message);
        res.status(500).json({
            error: "Failed to fetch data from Swiggy API",
            message: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
