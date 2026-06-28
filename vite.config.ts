import { defineConfig } from 'vite'

import { foldkit } from '@foldkit/vite-plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), foldkit({ devToolsMcpPort: 9988 })],
  optimizeDeps: {
    entries: ['src/entry.ts', 'src/preview-v001/entry.ts'],
  },
  build: {
    rolldownOptions: {
      input: {
        main: 'index.html',
        preview: 'src/preview-v001/preview.html',
      },
    },
  },
})
