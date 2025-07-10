const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(
    cors({
        origin: true, // Allow all origins since both frontend and backend are on Railway
        credentials: true,
    })
);

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" });
});

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
            timeout: 10000, // 10 second timeout
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

// Serve static files from the dist directory (built React app)
app.use(express.static(path.join(__dirname, "dist")));

// For any other routes, serve the React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend: http://localhost:${PORT}`);
    console.log(`API Proxy: http://localhost:${PORT}/api/swiggy/*`);
});
