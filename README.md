# FIFO Lab

An interactive React + Vite learning experience for the First-In, First-Out page replacement algorithm.

## Run locally

```bash
npm install
npm run dev
```

The production build can be checked with `npm run build`.

## Deploy to Vercel

This is a static Vite application and does not require a server or environment
variables.

### Option 1: Deploy through GitHub

1. Create a GitHub repository and push this project to it.
2. Open [vercel.com/new](https://vercel.com/new) and sign in.
3. Import the GitHub repository.
4. Keep the detected Vite settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
5. Select **Deploy**. Vercel will provide a public URL and redeploy on future
   pushes to the repository.

### Option 2: Deploy with the Vercel CLI

After installing the CLI and signing in:

```bash
npm install --global vercel
vercel login
vercel
```

For a production deployment:

```bash
vercel --prod
```

Run `npm run build` first if you want to verify the production build locally.
