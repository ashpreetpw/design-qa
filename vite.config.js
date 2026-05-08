import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
        // Forward /api/* to the Express server on :4000 so the frontend
        // can call relative paths without dealing with CORS in dev.
        proxy: {
            "/api": {
                target: "http://localhost:4000",
                changeOrigin: true,
            },
        },
    },
});
