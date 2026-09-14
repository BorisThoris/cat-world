// Metadata inputs for this repository - unique to angular-cat-adoption-app.
//
// Everything here is curated by hand. Derived facts (stack, metrics, git,
// screenshots) are computed by scripts/generate-project-meta.mjs, which writes
// project.meta.json. Run it with:
//   npm run meta          regenerate project.meta.json
//   npm run meta:check    fail if project.meta.json is stale

import path from 'node:path';

// Screenshots are captured by the portfolio (npm run capture there). Point
// PORTFOLIO_ROOT elsewhere, or drop images in ./project-media, to override.
const portfolioRoot = process.env.PORTFOLIO_ROOT ?? String.raw`C:\Users\Gaming PC\Desktop\Repos\portfolio`;

export default {
  slug: "cat-world",
  classification: "web-app",

  curated: {
    "title": "Cat World",
    "subtitle": "Angular adoption archive",
    "description": "An archived Angular adoption app preserved as an early full-stack-style portfolio sample with demo-safe backend boundaries.",
    "tags": [
      "Angular",
      "Archive",
      "Mock Backend"
    ],
    "accent": "#e11d48",
    "deploymentUrl": "https://cat-world-git.pages.dev/",
    "localUrl": "http://127.0.0.1:4108/",
    "buildCommand": "npm run build",
    "buildOutput": "dist",
    "runCommand": "npm start -- --host 127.0.0.1 --port 4108",
    "devPort": 4108,
    "showcaseTier": "showcase",
    "showcaseOrder": 8
  },

  // How the portfolio screenshot pipeline photographs this project.
  capture: {
    "route": "/"
  },

  scores: {
    "priorityScore": 84,
    "demoabilityScore": 70,
    "depthScore": 60,
    "polishScore": 64,
    "uniquenessScore": 62,
    "maintenanceScore": 56
  },

  analysisNotes:
    "Older Angular adoption app, useful as an archive demo but lower priority due to dated framework and narrower surface.",

  // Where the link-preview card lives: the page head that carries the Open
  // Graph tags, and the static directory the image is published from.
  social: {
    "htmlFile": "src/index.html",
    "staticDir": "src/assets",
    "imageName": "og-image.jpg",
    "imageUrlPath": "/assets/og-image.jpg"
  },

  // The icon set is rendered from favicon.svg by scripts/generate-app-icons.mjs.
  icons: {
    "background": "#4c0519",
    "themeColor": "#4c0519",
    "shortName": "Cat World"
  },

  media: {
    sourceDir: path.join(portfolioRoot, "public", "project-shots", "cat-world", "latest"),
    publicPathPrefix: "/project-shots/cat-world/latest",
    primaryProfile: "card"
  }
};
