# Mosaic Portfolio - Build Instructions

This is the portfolio website for Mosaic (Freyja Reffelmann), featuring a fractured glass cyberpunk aesthetic.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Assets

Before building, you need to organize your Figma assets:

1. Create a `public` folder in the root directory
2. Copy all your image files (PNG/JPG) that are referenced with `figma:asset/` into the `public` folder
3. The file names should match exactly what's in your imports (e.g., `a76009b40925b0452de19cde0d67c8c219c8f4a2.png`)

Your `public` folder should look like:
```
public/
├── a76009b40925b0452de19cde0d67c8c219c8f4a2.png
├── 12b376718a2142e58ee380f278397829435e31b1.png
├── 9ae6701af8ca31941a1d4b92298833e2a3d05104.png
├── 6576d4da695e1339c399e3274411318f3f4a29f4.png
└── ... (all other assets)
```

### 3. Configure Adobe Fonts

In `index.html`, replace `YOUR_ADOBE_FONTS_KIT_ID` with your actual Adobe Fonts kit ID for the Ethnocentric font:

```html
<link rel="stylesheet" href="https://use.typekit.net/YOUR_ACTUAL_KIT_ID.css">
```

## Development

Run the development server:

```bash
npm run dev
```

This will start the Vite dev server, usually at `http://localhost:5173`

## Production Build

### Build the project:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview the build:

```bash
npm run preview
```

## Deployment

### Option 1: Static Hosting (Netlify, Vercel, etc.)

1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider
3. The site will work correctly with relative paths

### Option 2: Manual Deployment

1. Build the project: `npm run build`
2. Copy the contents of the `dist` folder to your web server
3. Make sure all files are in the root directory or configure your server accordingly

### Option 3: GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist` folder contents to your `gh-pages` branch
3. Enable GitHub Pages in your repository settings

## Troubleshooting Blank Page

If you get a blank page after building:

1. **Check the browser console** - Look for 404 errors or JavaScript errors
2. **Verify asset paths** - Make sure all images are in the `public` folder
3. **Check base path** - If deploying to a subdirectory, update `base` in `vite.config.ts`
4. **Check Adobe Fonts** - Ensure your Adobe Fonts kit ID is correct
5. **Open DevTools** - Check Network tab for failed requests

### Common Issues:

**Blank page with no errors:**
- Check if JavaScript is enabled in your browser
- Open the built `index.html` with a local server, not by double-clicking (use `npm run preview`)

**Images not loading:**
- Verify all `figma:asset` imports have corresponding files in `public` folder
- Check that file names match exactly (case-sensitive)

**Fonts not loading:**
- Verify Adobe Fonts kit ID is correct
- Check network tab for font loading errors

## Project Structure

```
mosaic-portfolio/
├── public/              # Static assets (images)
├── components/          # React components
│   ├── ui/             # UI components
│   └── figma/          # Figma-specific components
├── styles/             # Global styles
├── imports/            # SVG imports
├── App.tsx             # Main app component
├── main.tsx            # Entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Motion (Framer Motion)
- Lucide React (icons)

## License

Private portfolio - All rights reserved
