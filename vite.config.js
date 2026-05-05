import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const appRoutes = new Set([
  '/app',
  '/features',
  '/pricing',
  '/manual',
  '/faq',
  '/contact',
  '/impressum',
  '/privacy',
  '/terms',
  '/welcome',
])

const routeFallbackPlugin = () => ({
  name: 'katsumii-route-fallback',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const pathname = new URL(req.url, 'http://localhost').pathname
      const acceptsHtml = req.headers.accept?.includes('text/html')
      if (acceptsHtml && (appRoutes.has(pathname) || (pathname !== '/' && !pathname.includes('.')))) {
        req.url = '/app.html'
      }
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const pathname = new URL(req.url, 'http://localhost').pathname
      const acceptsHtml = req.headers.accept?.includes('text/html')
      if (acceptsHtml && (appRoutes.has(pathname) || (pathname !== '/' && !pathname.includes('.')))) {
        req.url = '/app.html'
      }
      next()
    })
  },
})

export default defineConfig({
  plugins: [routeFallbackPlugin(), vue()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
      },
    },
  },
})


