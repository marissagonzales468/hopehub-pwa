import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/hopehub-pwa/',
  plugins: [react()],
});
