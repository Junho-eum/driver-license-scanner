import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    //establish a proxy from the dev server to express for the purpose of development
    proxy: {
      "/postsurvey": "http://localhost:8080",
    },
  },
});
