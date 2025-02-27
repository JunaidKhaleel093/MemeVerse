import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // Allows network access (useful for testing on mobile)
    port: 3000, // Default Vite port
  },
  build: {
    outDir: 'dist', // Ensure Vercel picks up the right output folder
    sourcemap: true, // Useful for debugging in production
  },
  base: "/", // Ensure correct routing; change to "/repo-name/" if deploying to GitHub Pages
});
