import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/api/swiggy": {
                target: "https://www.swiggy.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/swiggy/, ""),
                configure: (proxy, options) => {
                    proxy.on("proxyReq", (proxyReq, req, res) => {
                        // Add necessary headers
                        proxyReq.setHeader(
                            "User-Agent",
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                        );
                        proxyReq.setHeader(
                            "Accept",
                            "application/json, text/plain, */*"
                        );
                        proxyReq.setHeader("Accept-Language", "en-US,en;q=0.9");
                        proxyReq.setHeader(
                            "Accept-Encoding",
                            "gzip, deflate, br"
                        );
                        proxyReq.setHeader("Connection", "keep-alive");
                        proxyReq.setHeader(
                            "Referer",
                            "https://www.swiggy.com/"
                        );
                    });
                },
            },
        },
    },
});
