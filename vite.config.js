import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
    return {
        define: {
            [command === 'serve' ? 'global' : '_global']: {},
        },
        root: 'src',
        build: {
            sourcemap: true,
            rollupOptions: {
                input: {
                    index: './src/index.html',
                    gallery: './src/1-gallery.html',
                    form: './src/2-form.html',
                },
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    },
                    entryFileNames: chunkInfo => {
                        if (chunkInfo.name === 'commonHelpers') {
                            return 'commonHelpers.js';
                        }
                        return '[name].js';
                    },
                    assetFileNames: assetInfo => {
                        if (assetInfo.name && assetInfo.name.endsWith('.html')) {
                            return '[name].[ext]';
                        }
                        return 'assets/[name]-[hash][extname]';
                    },
                },
            },
            outDir: '../dist',
            emptyOutDir: true,
        },
        plugins: [
            injectHTML(),
            FullReload(['./src/**/**.html']),
            SortCss({
                sort: 'mobile-first',
            }),
        ],
    };
});
