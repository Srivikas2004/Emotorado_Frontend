import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // You can change this if needed
    host: "0.0.0.0" ,// Ensure it binds to all interfaces
    allowedHosts: ["emotorado-frontend.onrender.com"]
  }
});
