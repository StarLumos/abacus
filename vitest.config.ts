import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    includeSource: [
        'models/**/*.{js,ts}',
        'components/**/*.{js,ts}',
        'utils.ts'
    ]
  },
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './')
    }
  }
})

