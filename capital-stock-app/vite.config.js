import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
   css: {
   //transformer: 'lightningcss',
    lightningcss: {
      // This tells the compiler to ignore unknown Tailwind directives instead of crashing
      ignoredAtRules: ['theme', 'layer', 'tailwind', 'apply'] 
    }
  }
});
