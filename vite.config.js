import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
    // This changes the output dir from dist to build
    // comment this out if that isn't relevant for your project
    envPrefix: 'REACT_APP_',
    build: {
        outDir: 'build',
    },
    server: {
        port: '3000'
    },
    plugins: [
        react(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
                // ...svgr options (https://react-svgr.com/docs/options/)
            },
            plugins: [
                // ...other plugins
                envCompatible(/* options */)
            ],
        }),
    ],
})