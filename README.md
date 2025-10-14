# Tewnet

Discover, track, and review movies. Built with Vite, React, TypeScript, shadcn-ui, Tailwind CSS, and React Query.

## Getting Started

Requirements:

- Node.js 18+
- npm 9+

### 1) Install dependencies

```sh
npm i
```

### 2) Configure environment

Create a `.env` file (see `.env.example`) with your TMDB API key.

PowerShell (Windows):

```powershell
$env:VITE_TMDB_API_KEY="YOUR_TMDB_API_KEY"
```

Bash:

```bash
export VITE_TMDB_API_KEY="YOUR_TMDB_API_KEY"
```

### 3) Run the dev server

```sh
npm run dev
```

If port 8080 is busy:

```sh
npm run dev -- --port 5173
```

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run preview` — preview build locally
- `npm run lint` — run ESLint

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui
- @tanstack/react-query
- axios

## Configuration

See `src/config/tmdb.ts` and `src/utils/imageUrl.ts`. Path alias `@` points to `src/` via `vite.config.ts` and `tsconfig.json`.

## License

MIT
