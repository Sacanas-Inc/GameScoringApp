# Breaking Changes — feat/postgres-net10

Changes that affect existing API consumers migrating from `master`.

---

## 1. Error Response Body Format (All Endpoints)

All error responses now return a JSON object instead of a plain string.

**Before:**
```
"Game with ID 5 not found."
```

**After:**
```json
{ "error": "Game with ID 5 not found." }
```

Validation errors (400) return an array:
```json
{ "errors": ["GameName cannot be empty.", "MinPlayers cannot be negative."] }
```

**Affected endpoints:** all `GET`, `POST`, `PUT`, `DELETE` endpoints on `/game`, `/games`, `/match`, `/matches`, `/match-data-point`, `/match-data-points`.

---

## 2. `GET /games` — Query Parameter Renamed

The `description` filter query parameter had a typo in the previous version.

| | Parameter |
|---|---|
| **Before** | `?descripiton=` |
| **After** | `?description=` |

Clients using the old misspelled parameter will receive unfiltered results with no error.

---

## 3. `POST /match` — Invalid GameId Status Code Changed

| | Status Code |
|---|---|
| **Before** | `404 Not Found` |
| **After** | `400 Bad Request` |

Validation of `GameId` now happens at the service/validator layer and throws a `ValidationException`, resulting in a 400 instead of 404.

---

## 4. `POST /game` — 201 Created Location Header

The `Location` header in the created response points to a different path.

| | Location |
|---|---|
| **Before** | `/games/{id}` |
| **After** | `/game/{id}` |

---

## 5. `POST /match` — 201 Created Location Header

The `Location` header in the created response points to a different path.

| | Location |
|---|---|
| **Before** | `/matches/{id}` |
| **After** | `/match/{id}` |

---

## 6. `POST /match` — `MatchDate` Is Now Required

`MatchValidator.ValidateForCreateAsync` rejects a request whose `MatchDate` is the
`default` value:

```csharp
if (request.MatchDate == default)
    errors.Add("MatchDate is required.");
```

The previous version accepted any value. A client that omits `matchDate` now gets
`400 Bad Request` with `{ "errors": ["MatchDate is required."] }` instead of the
match being created with a `0001-01-01` date.

---

## 7. `GET /matches` — Empty Result Status Code Changed

| | Empty result |
|---|---|
| **Before** | `404 Not Found` (`"No matches found."`) |
| **After** | `200 OK` with `[]` |

The previous handler returned `NotFound` when the query produced no matches; the
current handler always returns `200 OK` with an empty list.

---

## 8. `GET /match/{id}?includeDataPoints=true` — `winningPlayer` No Longer Set

The old handler called `MatchMapper.CalculateWinnerFor(match)` for single-match
GETs. The new `MatchService.GetMatchByIdAsync` only calls `CreateMathStatsFor`, so
`matchStats.winningPlayer` is now always `null` on this endpoint. (`GET /matches`
still computes it for each match.) The property is also now nullable (`string?`).

This is **not** caused by the refactor of `CalculateWinnerFor` itself: that method's
condition changed from `if (Any())` to `if (!Any()) { WinningPlayer = null; return; }`,
which is logically identical and still correct.

---

## Non-Breaking Changes

These do not change behavior for existing consumers, but are worth knowing.

### `POST /match-data-point/{matchId}` — `createdDate` Request Field Removed

The old `PostMatchDataPointDto` declared `createdDate`; the new
`CreateMatchDataPointRequest` does not. This is not a behavior change: the old
handler already ignored the field and set `CreatedDate = DateTime.Now` server-side,
and unknown JSON members are ignored by default.

**Old fields:** `playerName`, `gamePoints`, `pointsDescription`, `createdDate`  
**New fields:** `playerName`, `gamePoints`, `pointsDescription`

### `PUT /match-data-point/{id}` — Newly Implemented

Previously the mapping method was empty, so the endpoint did not exist. It is now
implemented and, being additive, does not affect existing consumers. Validation
failures return `409 Conflict` (not `400 Bad Request`) — non-standard, but the
endpoint is new.

### `DELETE /match/{id}` — New Endpoint

New route that deletes a match and cascades to its data points via DB triggers.
The old `DELETE /match-and-data-points/{id}` endpoint is still available.
