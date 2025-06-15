// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separate vendor code into its own chunk(s)
            if (id.includes('react')) {
              return 'vendor_react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor_icons';
            }
            // all other node_modules
            return 'vendor_misc';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600, // optionally raise warning limit
  }
});
