# Blog Platform

A clean Firebase blog platform where public users can read and search posts, while an authenticated admin can create, edit, delete, publish, and unpublish posts.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Firebase Authentication
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

## Admin Login

Use the admin account created in Firebase Authentication.

Example:

```text
Email: admin@example.com
Password: Admin@12345
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
- Search by title or category
- Filter by category
- Admin login
- Protected admin dashboard
- Create, edit, delete, publish, and unpublish posts
- Responsive UI with loading and error states

## Documentation

Full documentation with screenshots is available here:

```text
docs/Inkline_Blog_Platform_Documentation.docx
```
