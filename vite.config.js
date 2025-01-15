import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determinar la base dinámicamente
const base = process.env.VITE_DEPLOY_TARGET === 'github' ? '/aluraflix/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
});
