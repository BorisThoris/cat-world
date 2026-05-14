# Cat World

Historical SoftUni Angular project originally built as **Cat World**.

This is an Angular 6 single-page app for listing cats for adoption, browsing cat profiles, managing user accounts, and sending messages between users. It is kept as a portfolio/archive project that shows early Angular, TypeScript, routing, forms, REST API integration, role-based UI behavior, and component-driven frontend work.

## What It Demonstrates

- Angular 6 application structure with routed feature pages.
- TypeScript models, services, and component state.
- Authentication flows backed by Kinvey-style REST endpoints.
- Conditional navigation for guest, user, and admin states.
- Cat listing, creation, detail, update, and delete workflows.
- Profile editing with persisted session data.
- Message board, private message creation, inbox, and unread-message count logic.
- Admin user-management surface.
- Form validation and user feedback with `ngx-toastr`.
- Bootstrap-based styling and image-heavy UI.
- A secondary SpaceX rocket visualization route using structured rocket data.

## Tech Stack

- Angular 6
- TypeScript
- Angular Router
- Angular Forms
- Angular HttpClient
- RxJS
- Bootstrap / ng-bootstrap
- ngx-toastr / angular-notifier
- ng-simple-slideshow
- Kinvey-style REST API integration
- Karma / Jasmine / Protractor scaffold from Angular CLI

## Main Routes

- `/about` - landing/about page
- `/login` - login
- `/register` - registration
- `/viewAll` - all cat listings
- `/create` - create a cat adoption listing
- `/view-cat/:id` - view, update, delete, or message about a cat
- `/profile` - user profile
- `/messages` - message board
- `/Inbox` - private inbox
- `/pm-create/:id` - send message about a listing
- `/admin` - admin user view
- `/rockets_page` - rocket visualization demo

## Project Structure

```text
src/app/
  services/                       REST/auth/session helpers
  create-cat/                     cat listing creation
  view-all/                       listing overview
  view-cat-info/                  listing detail/update/delete
  profile/                        profile editing
  messages/, inbox/, pm-writer/   messaging features
  admin/                          admin user view
  rockets-page/, rocket/          SpaceX rocket visualization demo
  naivagtion-bar/                 conditional navigation
```

## Running Locally

This project was built with Angular CLI 6 and old dependency versions. A modern Node version may not install or build it cleanly without using an older Node/npm environment.

```bash
npm install
npm start
```

Then open:

```text
http://localhost:4200
```

## Security / Backend Note

The original student project used a Kinvey backend. Historical app keys/secrets have been removed from the source and replaced with placeholders. To run the backend-backed flows, provide your own Kinvey-compatible app key and secret in `src/app/services/kinvey-remote-service.service.ts`.

Because this is an archived portfolio project, the original hosted backend may no longer exist.

## Status

Archived portfolio project. The goal of this repository is to show early Angular application work, not to represent current production practices.

Known limitations:

- Old Angular/CLI dependency stack.
- Backend configuration is intentionally removed.
- Some code and naming reflect its 2019 student-project origin.
- No modernization/refactor pass has been applied.
