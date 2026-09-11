import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()], base: '/', build: { target: 'es2020', sourcemap: false, chunkSizeWarningLimit: 800, rollupOptions: { output: { manualChunks: { react: ['react', 'react-dom', 'react-router-dom'], charts: ['recharts'] } } } } });
