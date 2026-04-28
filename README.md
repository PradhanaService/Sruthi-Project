# Blog Platform

A clean Firebase blog platform where users can read, search, and upload blog posts.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Cloud Firestore

## Run The Application

Open a terminal in the project and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Seed Sample Blog Posts

Sample posts have already been seeded. Run this only if the Firestore `blogs` collection is empty:

```bash
cd frontend
npm run seed
```

## Build Commands

```bash
cd frontend
npm run lint
npm run build
```

## Netlify Deployment

Use these settings if Netlify does not detect them automatically:

```text
Build command: npm --prefix frontend run build
Publish directory: frontend/dist
```

The project includes `netlify.toml` and `frontend/public/_redirects` so React Router pages work after refresh or direct URL access.

## Project Files

```text
blog-platform/
  frontend/
    scripts/
    src/
      components/
      pages/
      services/
      utils/
    firebase.json
    firestore.rules
  docs/
    Inkline_Blog_Platform_Documentation.docx
    screenshots/
```

## Features

- Home page with latest blog posts
- Blog listing page
- Blog details page
- Public blog upload page
- Search by title or category
- Filter by category
- Public create/upload posts
- Responsive UI with loading and error states

## Documentation

Full documentation with screenshots is available here:

```text
docs/Inkline_Blog_Platform_Documentation.docx
```
