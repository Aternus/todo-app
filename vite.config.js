/**
 * @see https://vite.dev/config/
 * @type {import('vite').UserConfig}
 */
const config = {
  esbuild: {
    target: 'ES2024',
  },
  server: {
    port: 8888,
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin'],
      },
    },
  },
};

export default config;
