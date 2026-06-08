// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 👈 Fixed exact package naming string here
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 🚀 Safely maps the "@/" alias straight to your /src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
});
