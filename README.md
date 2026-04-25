# Blog Platform

A clean Firebase blog platform mini project where public users can read and search posts, while an authenticated admin can create, edit, delete, publish, and unpublish posts.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Firebase Authentication
- Cloud Firestore
- Optional Firebase Hosting

## Screenshots

### Home

![Home page](docs/screenshots/home.png)

### Blog Listing

![Blog listing page](docs/screenshots/blogs.png)

### Blog Details

![Blog details page](docs/screenshots/blog-details.png)

### Admin Login

![Admin login page](docs/screenshots/admin-login.png)

### Admin Dashboard

![Admin dashboard](docs/screenshots/admin-dashboard.png)

## Folder Structure

```text
blog-platform/
  frontend/
    scripts/
      seedFirestore.mjs
    src/
      components/
      pages/
      services/
      utils/
      App.jsx
      main.jsx
    .env.example
    firebase.json
    firestore.rules
```

## Firebase Setup

1. Create a Firebase project at `https://console.firebase.google.com`.
2. Add a Web App in Firebase project settings.
3. Enable Authentication, then enable the Email/Password sign-in provider.
4. Create one admin user in Firebase Authentication.
5. Create a Firestore Database.
6. Copy `frontend/firestore.rules` into Firebase Firestore Rules and publish them.
7. The submitted project already includes the provided Firebase config in `frontend/.env`. If your evaluator uses a different Firebase project, replace those values.

Example `frontend/.env`:

```env
VITE_FIREBASE_API_KEY=AIzaSyAO8wuBMGE5ojGis2_9UMcxLkgdcDqChxo
VITE_FIREBASE_AUTH_DOMAIN=inkline-d699b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=inkline-d699b
VITE_FIREBASE_STORAGE_BUCKET=inkline-d699b.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=2300925871
VITE_FIREBASE_APP_ID=1:2300925871:web:2c2440d4b7c25e6faac15a
VITE_FIREBASE_MEASUREMENT_ID=G-6KZYESRENS

VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=Admin@12345
VITE_USE_MOCKS=false
```

`VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD` are only used by the sample-data seed script. The app login uses Firebase Authentication directly.

## Run Locally

```bash
cd blog-platform/frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Seed Sample Blog Posts

First create the admin user in Firebase Authentication and place the same email/password in `frontend/.env`.

Then run:

```bash
cd blog-platform/frontend
npm run seed
```

This creates sample documents in the `blogs` Firestore collection.

## Admin Login

Use the admin account you created in Firebase Authentication.

Example:

```text
Email: admin@example.com
Password: Admin@12345
```

## Firestore Collection

Collection name:

```text
blogs
```

Blog document fields:

```text
title
slug
shortDescription
content
category
authorName
coverImageUrl
createdAt
updatedAt
published
```

## Features

- Public home page with latest posts
- Blog listing page
- Single blog details page
- Search by title or category
- Filter by category
- Firebase admin login
- Protected admin dashboard
- Create, edit, delete, publish, and unpublish posts
- Responsive layout for mobile, tablet, and desktop
- Loading states and error messages

## UI Demo Mode

If the client wants to preview the UI before setting up Firebase, create `frontend/.env.local`:

```env
VITE_USE_MOCKS=true
```

Then run:

```bash
cd blog-platform/frontend
npm run dev
```

Demo credentials:

```text
Email: admin@example.com
Password: Admin@12345
```

## Build

```bash
cd blog-platform/frontend
npm run lint
npm run build
```

## Deploy With Firebase Hosting

Install Firebase CLI if needed:

```bash
npm install -g firebase-tools
```

Login and deploy:

```bash
cd blog-platform/frontend
firebase login
firebase init
npm run build
firebase deploy
```

The included `firebase.json` is already configured to serve the Vite `dist` folder.
