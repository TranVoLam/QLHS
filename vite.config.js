import { defineConfig } from "vite";
import React from "@vitejs/plugin-react";
import path from 'path'

export default defineConfig({
    plugins: [
        React()
    ],
    root: path.join(__dirname, 'src'),
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
    },
    build: {
        outDir: '../dist'
    }
})