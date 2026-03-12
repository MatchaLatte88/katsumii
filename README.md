# Katsumii Website

Vue 3 + Vite landing page for the Katsumii website.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## GitHub Pages

Deployment is handled automatically with the GitHub Actions workflow in `.github/workflows/deploy.yml`.

To enable it in the repository once:

1. Open the GitHub repository settings.
2. Go to `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Set the custom domain to `www.katsumii.com`.
5. Push to `main` to trigger a deployment.

The site is built for a custom domain and includes a `CNAME` file for `www.katsumii.com`.
