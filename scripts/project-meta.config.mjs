// Metadata inputs for this repository - unique to angular-cat-adoption-app.
//
// Everything here is curated by hand: identity, commands, the screenshot recipe
// (capture), the recorded trailer (trailers.items, kind: capture) and where the
// card, icons and trailers are published. scripts/generate-project-meta.mjs
// derives the rest into project.meta.json; scripts/project-media.test.mjs
// checks that everything here was actually produced.
//   npm run meta:refresh   trailers -> shots -> social -> icons -> meta
//   npm run test:media     the media contract

import path from 'node:path';

const portfolioRoot = process.env.PORTFOLIO_ROOT ?? String.raw`C:\Users\Gaming PC\Desktop\Repos\portfolio`;

export default {
  "slug": "cat-world",
  "classification": "web-app",
  "curated": {
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
  "capture": {
    "route": "/",
    "actions": [
      {
        "type": "click",
        "target": {
          "role": "link",
          "name": "All Cats"
        },
        "label": "open the adoption board",
        "optional": true
      },
      {
        "type": "wait",
        "ms": 1500
      }
    ],
    "waitAfterReadyMs": 800
  },
  "scores": {
    "priorityScore": 84,
    "demoabilityScore": 70,
    "depthScore": 60,
    "polishScore": 64,
    "uniquenessScore": 62,
    "maintenanceScore": 56
  },
  "analysisNotes": "Older Angular adoption app, useful as an archive demo but lower priority due to dated framework and narrower surface.",
  "social": {
    "htmlFile": "src/index.html",
    "pageTitle": "Cat World",
    "staticDir": "src/assets",
    "imageName": "og-image.jpg",
    "imageUrlPath": "/assets/og-image.jpg"
  },
  "icons": {
    "background": "#4c0519",
    "themeColor": "#4c0519",
    "shortName": "Cat World"
  },
  "media": {
    "sourceDir": path.join(portfolioRoot, "public", "project-shots", "cat-world", "latest"),
    "publicPathPrefix": "/project-shots/cat-world/latest",
    "primaryProfile": "card"
  },
  "trailers": {
    "items": [
      {
        "id": "tour",
        "title": "Cat World: the adoption board",
        "kind": "capture",
        "inputs": [
          "src",
          "angular.json"
        ],
        "source": "deployment",
        "music": "project-media/music/tour.m4a",
        "posterAt": 0.5,
        "recipe": {
          "route": "/",
          "viewport": {
            "width": 1280,
            "height": 720
          },
          "durationMs": 20000,
          "setup": {
            "actions": [
              {
                "type": "waitFor",
                "target": {
                  "role": "link",
                  "name": "All Cats"
                },
                "state": "visible",
                "label": "wait for the nav"
              }
            ],
            "waitAfterReadyMs": 1500
          },
          "timeline": [
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "All Cats"
              },
              "label": "all cats",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 3000
            },
            {
              "type": "scroll",
              "deltaY": 400,
              "steps": 2
            },
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "Details"
              },
              "label": "a cat's details",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 3500
            },
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "News"
              },
              "label": "news",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 3000
            },
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "About"
              },
              "label": "about",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 2500
            },
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "Cat World"
              },
              "label": "home",
              "optional": true
            }
          ]
        }
      }
    ]
  }
};
