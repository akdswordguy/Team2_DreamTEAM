import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom", // Use jsdom for DOM testing
    globals: true, // Enable global variables like `describe`, `test`, etc.
    setupFiles: ["./src/setupTests.js"], // Include the setup file
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Optional: Add path aliases
    },
  },
});