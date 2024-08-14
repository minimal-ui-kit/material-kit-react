// import path from 'path';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import checker from 'vite-plugin-checker';

// // ----------------------------------------------------------------------

// export default defineConfig({
//   plugins: [
//     react(),
//     checker({
//       eslint: {
//         lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
//       },
//     }),
//   ],
//   resolve: {
//     alias: [
//       {
//         find: /^~(.+)/,
//         replacement: path.join(process.cwd(), 'node_modules/$1'),
//       },
//       {
//         find: /^src(.+)/,
//         replacement: path.join(process.cwd(), 'src/$1'),
//       },
//     ],
//   },
//   server: {
//     port: 3030,
//   },
//   preview: {
//     port: 3030,
//   },
// });
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ----------------------------------------------------------------------

export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3030',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
  plugins: [
    react(),
    // `vite-plugin-checker` ni o'chirdik
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});

