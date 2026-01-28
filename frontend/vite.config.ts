import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      app: path.resolve(__dirname, "src/app"),
      features: path.resolve(__dirname, "src/features"),
    },
  },
});
