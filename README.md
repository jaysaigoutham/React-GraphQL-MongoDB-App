# React + GraphQL + MongoDB (Vite)

A small React application using GraphQL and Vite for development.

## Quickstart

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Run the optional local GraphQL server (from the project root):

```bash
npm run server
# or run both frontend + server concurrently
npm run dev:full
```

## Environment

The GraphQL server is expected at `http://localhost:4000/graphql` by default. You can change the URL in `src/main.jsx` or provide an environment variable.

If the server is run locally from `server/`, it will attempt to read `MONGODB_URI` and `JWT_SECRET` from a `.env` file. Example `.env` (do NOT commit):

```
MONGODB_URI=mongodb://127.0.0.1:27017/phonebook
JWT_SECRET=your_secret_here
```

Note: the server models use CommonJS files with `.cjs` extensions to avoid conflicts when the repo `package.json` sets `type: "module"`. Model files live in `server/models/` (for example `server/models/person.cjs`).

## Scripts

- `npm run dev` — start Vite development server
- `npm run build` — build for production
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint (if configured)

## Project structure

- `React-GraphQL/` — front-end app (Vite + React)
  - `src/` — source files
  - `public/` — static assets
  - `server/` — optional local server files

## Notes

- Add any GraphQL server URL or secrets to a `.env` file (do not commit `.env`).

## License

This project is unlicensed. Add a license file if needed.
