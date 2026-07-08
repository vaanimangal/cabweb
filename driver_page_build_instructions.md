# Driver dashboard integration (driver_page visible from /driver-dashboard)

This repo has **two separate frontend apps**:
- **Passenger app** (CRA): `cabweb/src/...`
- **Driver app** (Vite): `cabweb/src/driver_page/...`

To make the driver app visible from the passenger app route **`/driver-dashboard`**, you must serve the Vite build output under that path.

## Recommended (simple) approach for development
1. Build the driver app:
   - `cd src/driver_page`
   - `npm run build`
   - This generates `src/driver_page/dist/*`.
2. Copy the contents of that `dist` into CRA’s `public/driver_page/` (or configure Vite base).
   - Example:
     - ensure: `public/driver_page/` exists
     - copy: `src/driver_page/dist/*` -> `public/driver_page/`
3. In CRA, route `/driver-dashboard` should render an `<iframe>` pointing to `/driver_page/`.

## What I already changed
- Added `Route path="/driver-dashboard"` in `cabweb/src/App.js` (currently placeholder until static serving is wired).

## Next implementation step (what to do)
Tell me which option you want:
- **A)** iframe-based embedding (fastest)
- **B)** full SPA routing / reverse proxy (cleanest, but needs server/proxy setup)

