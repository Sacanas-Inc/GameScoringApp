# Game Scoring App

A personal board- and card-game score tracker. Create games, add matches for each game, record individual score entries per player, and view per-match scoreboards broken down by scoring category — all in a dark-themed, responsive web UI.

> Deployed app: [lively-bay-05f413403.5.azurestaticapps.net](https://lively-bay-05f413403.5.azurestaticapps.net/)

## Features

- **Manage games** — create games (name + optional description) and delete them.
- **Manage matches** — add and delete matches per game, with optional notes.
- **Record scores** — log individual score entries with player name, points, and a points description (e.g. scoring categories like *busts*, *territories*, or *cards* in Hadara).
- **Scoreboards** — each match shows a card per player with their points grouped by scoring category; click a card for the full breakdown.
- **Per-player totals** — match lists aggregate each player's total across all entries.
- **CSV export** — download a match's scoreboard as a CSV file.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Create React App |
| UI | PrimeReact (Soho Dark theme), React-Bootstrap, Bootstrap 5, SCSS/CSS Modules |
| Data fetching | TanStack Query v5 |
| Routing | React Router v7 |
| Testing | Jest, Testing Library |
| Tooling | ESLint, Prettier, patch-package |
| CI/CD | GitHub Actions → Azure Static Web Apps |

## Getting Started

### Prerequisites

- Node.js >= 18
- Yarn (the repo ships a `yarn.lock`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sacanas-Inc/GameScoringApp.git
   cd GameScoringApp
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure the API base URL:

   Create a `.env` file in the project root and set the API base URL, e.g.:

   ```
   REACT_APP_API_BASE_URL=https://gamescoringapi.azurewebsites.net/
   ```

   > `.env` is gitignored. Since this is a Create React App, only variables prefixed with `REACT_APP_` are exposed to the client, and they are baked in at **build time** — you must rebuild after changing them.

4. Start the dev server:

   ```bash
   yarn start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `yarn start` — run the app in development mode
- `yarn build` — build the production bundle to `build/`
- `yarn test` — run the Jest test suite
- `yarn lint` — run ESLint

## Backend API

This frontend consumes the [Game Scoring API](https://github.com/Sacanas-Inc/GameScoringApi). Interactive API docs are hosted at [gamescoringapi.azurewebsites.net/index.html](https://gamescoringapi.azurewebsites.net/index.html). The base URL is configured through the `REACT_APP_API_BASE_URL` variable described above.

## Deployment

The app is built and deployed to **Azure Static Web Apps** by GitHub Actions on every push to `master` (`.github/workflows/azure-static-web-apps-lively-bay-05f413403.yml`). During the build, `REACT_APP_API_BASE_URL` is injected from the GitHub Actions repository variable of the same name, so the app points at the hosted API without committing the value. The same pipeline provides staging previews for pull requests, and `.github/workflows/run-tests.yml` runs lint + tests on every PR.

Live app: [https://lively-bay-05f413403.5.azurestaticapps.net/](https://lively-bay-05f413403.5.azurestaticapps.net/)

## Known Limitations & Roadmap

- **No authentication** — the app is small-scale and has no user table; anyone can read/write the data exposed by the API.
- **No editing or deletion of scores** — score entries can be added but not edited; the delete button exists in the UI but is not wired up yet. Editing scores is a likely future addition.
