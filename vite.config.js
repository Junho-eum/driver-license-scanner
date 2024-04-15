import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const exPort = process.env.EXPRESS_PORT || 8080;


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    //establish a proxy from the dev server to express for the purpose of development
    proxy: {
      "/postsurvey": 'http://localhost:8888',
    }
  }
})
