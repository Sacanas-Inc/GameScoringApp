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

## 6. `POST /match-data-point/{matchId}` — Request Body Field Removed

The old `PostMatchDataPointDto` accepted a `createdDate` field. The new `CreateMatchDataPointRequest` does not — the date is now set server-side.

**Old fields:** `playerName`, `gamePoints`, `pointsDescription`, `createdDate`  
**New fields:** `playerName`, `gamePoints`, `pointsDescription`

Clients sending `createdDate` will have it silently ignored.

---

## 7. `PUT /match-data-point/{id}` — Validation Error Status Code

This endpoint is new in this PR. Validation failures return `409 Conflict` (not `400 Bad Request`), which is non-standard. Clients should handle `409` for validation errors on this endpoint.

---

## 8. `GET /match/{id}?includeDataPoints=true` — Winner Calculation Bug

`MatchMapper.CalculateWinnerFor` had its condition inverted (`if (Any())` → `if (!Any())`). This may cause the `winner` field in the match response to be incorrect or always `null` when data points are present.

---

## Additive Changes (Non-Breaking)

These are new additions and do not affect existing consumers:

- **`DELETE /match/{id}`** — new endpoint; deletes a match and cascades to data points via DB triggers. The old `DELETE /match-and-data-points/{id}` endpoint is still available.
- **`PUT /match-data-point/{id}`** — new endpoint; was previously unimplemented.
