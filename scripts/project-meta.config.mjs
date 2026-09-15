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
    "subtitle": "An Angular adoption board for cats",
    "description": "An Angular single-page app for listing cats up for adoption: browse profiles, post and edit your own listings, message other users, and manage accounts from an admin view. An early full-stack-style project preserved with demo-safe backend boundaries.",
    "tags": [
      "Angular",
      "Adoption",
      "Messaging",
      "Archive"
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
    "pageTitle": "Cat World",
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
