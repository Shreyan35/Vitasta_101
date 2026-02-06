# Vitasta Programming Gymnasium

Vitasta is a philosophy-forward fitness and learning experience. This repo contains the production-ready front-end built with React, Vite, and Tailwind CSS.

## Backend (Node.js + Express + MongoDB)

The backend lives in `backend/` and exposes API routes under `/api`. The front-end dev server proxies `/api` requests to `http://localhost:5000`.

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Front-end

## Getting Started

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Project Structure

- `src/pages`: Route-level views for the home experience, article detail, and program detail.
- `src/data`: Centralized content sources for programs, services, and articles.
- `public`: Static assets (images, icons, robots.txt).
