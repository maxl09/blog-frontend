// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': { // any request that starts with /api
//         target: 'http://localhost:5000', // your Express server
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// });
// vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/', // make sure this is set correctly
//   preview: {
//     port: 4173, // default preview port
//     preview: {
//       allowedHosts: ['*']
//     }
//   }
// })

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // keep this for correct asset paths
  preview: {
    port: 4173,           // default preview port
    host: '0.0.0.0',      // important for Render
    allowedHosts: ['*']   // allow all hosts, including your Render domain
  }
})

