# React + GraphQL (Vite)

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

## Environment

The GraphQL server is expected at `http://localhost:4000/graphql` by default. You can change the URL in `src/main.jsx` or provide an environment variable.

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
