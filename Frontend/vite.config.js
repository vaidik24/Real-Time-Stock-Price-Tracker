import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://ws.finnhub.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Adjust path if necessary
      },
    },
  },
});
