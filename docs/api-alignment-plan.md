# Frontend ↔ API alignment plan

Status: **planned** · Branch: `docs/api-alignment-plan` · Owner: TBD

## Why

The backend (`Sacanas-Inc/GameScoringAPI`) was migrated to **.NET 10 + PostgreSQL**.
The migration changed a few request/response details (documented in the backend's
`BREAKING_CHANGES.md`). This app is the only consumer of that API, and parts of it
were written against the older contract.

This plan brings the frontend back in line with the **current** contract. It is a
compatibility pass only — **no new features**. Everything below is either a
correctness fix or a type/cleanup change with no intended behavior change.

## Scope

- In scope: API calls (`src/api`), data hooks (`src/hooks`), the TypeScript types
  they produce/consume (`src/utils/types.ts`), and the error handling those hooks
  expose to forms/screens.
- Out of scope: new UI, editing/deleting score entries, auth, styling, routing.

## Current API contract (only the routes this app calls)

Base URL comes from `REACT_APP_API_BASE_URL` (`src/api/apiUtils.ts`). Routes are
relative and rely on the base URL ending in `/`.

| App call | Method & route | Request body | Success | Notes |
| --- | --- | --- | --- | --- |
| `GetAllGames` | `GET /games` | — | `200` `List<GameDto>` | `404 { error }` when **no games exist** |
| `GetGameById` | `GET /game/{id}` | — | `200` `GameDto` | `404 { error }` |
| `PostGame` | `POST /game` | `{ gameName, gameDescription }` | `201` `GameDto` | `Location: /game/{id}` |
| `DeleteGame` | `DELETE /game/{id}` | — | `204` | `404 { error }` |
| `GetAllMatches` | `GET /matches?includeDataPoints=true` | — | `200` `List<MatchForMatchDto>` | |
| `GetAllMatchesByGameId` | `GET /matches?includeDataPoints=true&gameId={id}` | — | `200` `List<MatchForMatchDto>` | |
| `GetMatchById` | `GET /match/{id}?includeDataPoints=true` | — | `200` `MatchForMatchDto` | `404 { error }` |
| `PostMatch` | `POST /match` | `{ gameId, notes }` | `201` `MatchForMatchDto` | **`matchDate` is required** — validator rejects `default` with `400`; `isFinished` optional. Invalid `gameId` is now **`400`** (was `404`) |
| `DeleteMatch` | `DELETE /match-and-data-points/{id}` | — | `204` | still supported; `DELETE /match/{id}` is the newer, preferred route |
| `PostMatchDataPoints` | `POST /match-data-point/{matchId}` | `{ playerName, gamePoints, pointsDescription }` | `201` `ReturnPostMatchDataPointDto` | `matchId` in the body is ignored — the route value wins |

### Error bodies (breaking change)

All error responses are JSON objects, not plain strings:

```json
{ "error": "Game with ID 5 not found." }
```

Validation errors (`400`) return an array:

```json
{ "errors": ["GameName cannot be empty.", "MinPlayers cannot be negative."] }
```

Exception: `PUT /match-data-point/{id}` returns `409` for validation errors (not
used by this app).

### Response DTOs

```
GameDto:                  id, gameName, gameDescription, minPlayers,
                          maxPlayers, averageDuration, matchesCount

MatchForMatchDto:         matchId, gameId, matchDate, notes, playerCount,
                          isFinished, matchDataPoints[], matchStats

MatchDataPointForMatchDto: id, playerName, gamePoints, pointsDescription,
                           createdDate

MatchStatsDto:            totalGamePoints, winningPlayer, playerPoints { name: total }

ReturnPostMatchDataPointDto: id, matchId, playerName, gamePoints,
                             pointsDescription, createdDate
```

## Gaps to fix

### P0 — correctness

1. **API error messages are never shown.**
   Every hook collapses failures to `String(error)`, which for Axios renders as
   `"AxiosError: Request failed with status code 400"`. The useful message in
   `response.data.error` / `response.data.errors` is thrown away.
   → Add `getApiErrorMessage(error)` (checks `error.response.data.error`, then
   `.errors.join(", ")`, then falls back to `error.message`) and use it in the
   read hooks and the mutation hooks so forms can display server validation text.

2. **`gamePoints` is posted as a string.**
   `NewScoreForm` / `Form` keep the number input's value as a string in state, so
   the JSON body has `"gamePoints": "10"`. .NET's `System.Text.Json` rejects a
   string for an `int` → `400`.
   → Coerce to a number before posting (in the form submit or in
   `usePostMatchDataPoints`). Guard `NaN`.

3. **`POST /match` does not send `matchDate`, which is now required.**
   The validator rejects a missing/`default` `MatchDate` with
   `400 { "errors": ["MatchDate is required."] }`, so match creation currently
   fails outright (and even when accepted it would store `0001-01-01`).
   → Send `matchDate: new Date().toISOString()` (and `isFinished: false`). Keep it
   a default — no new date picker.

4. **`GET /games` `404` is treated as an error.**
   The API returns `404 { error: "No games found." }` when the table is empty, so
   the home screen shows an error on a fresh database instead of an empty state.
   → Handle `404` → `[]` in `useGetAllGames`, mirroring `useGetAllMatchesByGameId`.

### P1 — types

5. **`Game` type is wrong.** It declares `matches: Match[]`, but `GameDto` returns
   `matchesCount: number` (and nothing in the UI reads `game.matches`).
   → Replace with `matchesCount: number`.

6. **Nested data point type is over-specified.** `MatchDataPoints` requires
   `gameId`, `gameName`, `matchId`, which `MatchDataPointForMatchDto` does not
   return (the UI only uses `id`, `playerName`, `gamePoints`, `pointsDescription`,
   `createdDate`).
   → Split into a lean `MatchDataPoint` for the nested case; keep a separate type
   only if `/match-data-points/all/detailed` is adopted.

7. **`Match` type is incomplete.** Add the optional fields the API now returns:
   `playerCount`, `isFinished`, `matchStats` (`totalGamePoints`, `winningPlayer`,
   `playerPoints`). Client-side aggregation can stay as-is; adding the types just
   stops the shapes from drifting.

8. **Request type reuse.** `usePostMatchDataPoints` types its payload as
   `MatchDataRow` (a CSV row type). Introduce a dedicated
   `CreateMatchDataPointRequest = { playerName; gamePoints; pointsDescription }`.

### P2 — cleanup (no behavior change)

9. Switch the match delete to `DELETE /match/{id}` (the API now deletes cleanly,
   including child rows). Keep the current route if you want zero churn.
9. Remove dead code: `api.GetMatchDataPoints` (points at `GET /match/{id}`) and
   `useGetMatchGames` appear unused outside their own definitions — confirm with a
   grep before deleting.
10. README fixes: the backend link points to `GameScoringApi` (should be
   `GameScoringAPI`), and the interactive docs link can point at the app root
   (`https://gamescoringapi.azurewebsites.net/`) since Swagger now serves at `/`.

## Verification

- `yarn lint` and `yarn test` must stay green (these run on every PR).
- `yarn build` must succeed.
- Manual pass against the API (`REACT_APP_API_BASE_URL` → the hosted API, or a
  local `dotnet run`): create game → create match → add score → view scoreboard →
  export CSV → delete match/game. Confirm empty-state on a fresh DB and that
  server validation messages surface in the UI.

## Suggested PR breakdown

1. **Error handling + request fixes** (P0): `getApiErrorMessage`, coerce
   `gamePoints`, send `matchDate`, `404`-as-empty for games.
2. **Types** (P1): align `src/utils/types.ts` with the DTOs.
3. **Cleanup + docs** (P2): delete route, unused APIs, README.

## References

- Breaking changes: `BREAKING_CHANGES.md` (copied from the backend repo)
- Backend endpoint source: `Api/Endpoints/{Game,Match,MatchDataPoint}`
- Swagger UI: <https://gamescoringapi.azurewebsites.net/>
