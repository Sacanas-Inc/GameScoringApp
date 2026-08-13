# Game Scoring App

[![Azure Static Web Apps CI/CD](https://github.com/Sacanas-Inc/GameScoringApp/actions/workflows/azure-static-web-apps-lively-bay-05f413403.yml/badge.svg)](https://github.com/Sacanas-Inc/GameScoringApp/actions/workflows/azure-static-web-apps-lively-bay-05f413403.yml)
[![Tests](https://github.com/Sacanas-Inc/GameScoringApp/actions/workflows/run-tests.yml/badge.svg)](https://github.com/Sacanas-Inc/GameScoringApp/actions/workflows/run-tests.yml)

A personal board- and card-game score tracker. Create games, add matches for each game, record individual score entries per player, and view per-match scoreboards broken down by scoring category — all in a dark-themed, responsive web UI.

> Deployed app: [lively-bay-05f413403.5.azurestaticapps.net](https://lively-bay-05f413403.5.azurestaticapps.net/)

## Why I built this

We played a lot of board games, and wanted a unified place where we could keep track of our scores. The objective was that we could also download a CSV file for each match so we could do some data visualization with it.

## Features

- **Manage games** — create games (name + optional description) and delete them.
- **Manage matches** — add and delete matches per game, with optional notes.
- **Record scores** — log individual score entries with player name, points, and a points description (e.g. scoring categories like *busts*, *territories*, or *cards* in Hadara).
- **Scoreboards** — each match shows a card per player with their points grouped by scoring category; click a card for the full breakdown.
- **Per-player totals** — match lists aggregate each player's total across all entries.
- **CSV export** — download a match's scoreboard as a CSV file.

## How it works

- The app is a single-page React app (Create React App + TypeScript) that runs entirely in the browser.
- Game data, matches, and score entries live in a separate backend REST API — the Game Scoring API — hosted on Azure App Service.
- TanStack Query drives all data fetching: hooks like `useGetAllGames`, `useGetMatchById`, and `usePostMatchDataPoints` issue Axios calls to that API and cache the results.
- Users manage games and matches through modal forms, then record per-player score entries with a points description (scoring category) for each round.
- Each match's scoreboard is aggregated per player and grouped by category; clicking a player card expands the full breakdown.
- The CSV export hook (`useDownloadAsCSV`) builds a downloadable CSV of the match's scoreboard for offline analysis.

## Screenshots

Here's an example flow through the app:

1. **Game list** — all your games on the home screen.

   ![Game list](/public/screenshots/screen_1.png)

2. **Add a new game** — give your game a name and a description.

   ![Add a game](/public/screenshots/screen_add_game.png)

3. **Match scoreboard** — shows a card per match with their corresponding points.

   ![Match scoreboard](/public/screenshots/match_screen.png)

4. **Score entries** — each match shows a card per player with their points grouped by scoring category.

   ![Score entries](/public/screenshots/score_screens.png)

5. **Add a score entry** — record points with a player name and a scoring category.

   ![Add a score](/public/screenshots/add_scores_screen.png)

6. **Score details** — click a player card for the full per-category breakdown.

   ![Score details](/public/screenshots/score_details.png)

7. **CSV export** — download the match's scoreboard as a CSV file.

   ![CSV export](/public/screenshots/csv_example.png)

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

## License

[MIT](LICENSE) — Copyright (c) 2026 Miguel Gonçalves and Pedro Nunes.
