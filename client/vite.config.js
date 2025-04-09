import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Output folder for build
    assetsDir: "assets", // Folder for assets
    rollupOptions: {
      input: {
        main: "./index.html", // Main entry point
      },
    },
  },
  server: {
    proxy: {
      // Proxy for local development only
      "/api": {
        target: "https://gearbot-api.onrender.com/",
        changeOrigin: true, // Ensures the origin header is updated to match the target
        secure: true, // Set to false if you’re using an HTTP target
      },
    },
  },
});
