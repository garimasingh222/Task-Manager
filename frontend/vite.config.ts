import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./", // ensures assets load correctly on Vercel
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      app: path.resolve(__dirname, "src/app"),
      features: path.resolve(__dirname, "src/features"),
    },
  },
  server: {
    port: 5173, // local dev port
  },
});
