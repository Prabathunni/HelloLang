// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stdLibBrowser from 'vite-plugin-node-stdlib-browser'; // good one

export default defineConfig({
  define: {
    global: 'globalThis'
  },
  plugins: [
    react(),
    stdLibBrowser() // 
  ],
  resolve: {
    alias: {
      buffer: 'buffer', // ✅ use standard buffer
      process: 'node-stdlib-browser/process',
      global: 'globalthis'
    }
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'globalthis'], // ✅ ensure these are bundled
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
});
