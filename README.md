# React Final Project - Cafe App

## Description

This is your final React project. It is an **individual** project. You will build a cafe ordering app using the **`products.json` file provided to you** - everyone builds against the same data and the same requirements, and is graded against the checklist below.

This is a **frontend-only** project. There is no backend.

Your finished app must be **hosted online**. You will submit your live URL through a **Google Form** (the link will be shared with you).

## The Data

You are given a `products.json` file containing the cafe's products (`id`, `name`, `desc`, `photo`, `price`). Your app must load this data **when the app loads**, in one of two ways:

1. **Recommended:** place `products.json` in your `public/` folder and `fetch("/products.json")` inside a `useEffect` when the app mounts, storing the result in state. This behaves like a real API call and works the same once deployed.
2. Alternatively, import the file directly (`import data from "./products.json"`) - Vite supports JSON imports.

Note: `price` is a **string** in the JSON - convert it to a number before doing any math.

## Requirements Checklist

### React Fundamentals & Code Quality

- [ ] Built with **Vite + React**
- [ ] Proper **folder structure** (e.g. `components/`, `pages/`, `context/`)
- [ ] Broken into **reusable components** (Header, Sidebar, Card, etc.)
- [ ] **Best code practices**: meaningful names, small focused components, no unused code or files
- [ ] **`useState`** for interactive UI
- [ ] **`useEffect`** used correctly (loading the data on mount, proper dependency array)

### Pages (React Router)

- [ ] **Home** (`/`) - a landing page with whatever relevant content you like (hero, featured items, link to the menu)
- [ ] **Items** (`/items`) - browse all the items
- [ ] The items page has **pagination** (client-side)
- [ ] **Item detail** (`/items/:id`) - clicking any item navigates to its detail view (**URL parameter**)
- [ ] **Cart** (`/cart`) - a dedicated cart page
- [ ] **Checkout** (`/checkout`) - with a **Confirm** button (nothing else needed) that **clears the cart and redirects back to Home**
- [ ] A **404 page** for unknown routes
- [ ] Navigation through a shared **Header** (no full page reloads)

### Cart (Context)

- [ ] Cart state lives in a **Context** whose provider wraps all your routes
- [ ] A **sidebar cart visible on every page**, showing the items in the cart and the total
- [ ] **Add to cart** from the item detail page
- [ ] Cart page: view items, **remove** items, see the **total**
- [ ] Cart **persists on refresh** via `localStorage`

Note: passing props from page to page does not count as Context. At least the sidebar, the detail page, and the cart page must consume it.

### Hosting & Submission

- [ ] Deployed and **publicly accessible** (Netlify or Vercel)
- [ ] Refreshing on any route (e.g. `/items/3`) does **not** break the app
- [ ] Live URL submitted through the **Google Form**

### Bonus (extra credit)

- [ ] **Favorites** - mark/unmark items as favorites and view them somewhere (a favorites page or section), separate from the cart

## Hosting

Deploy with **Netlify** or **Vercel** (both free). Figuring out how to deploy is part of the project.

Deploy early - don't leave hosting for the last hour.

## Suggested Build Order

1. Scaffold Vite with a clean folder structure (`components/`, `pages/`, `context/`). Set up all routes and page shells, Header. Load `products.json` and render the items page.
2. Pagination on the items page. Item detail page with URL param.
3. Cart Context: add to cart, sidebar cart, cart page with remove/total, `localStorage`.
4. Checkout flow (confirm, clear cart, redirect home), Home page content, 404 page, styling polish, deploy, submit the form.

## Rules

- This is an **individual** project.
- No backend, database, or auth - frontend only.
- Functionality first, styling last.
- There is no presentation for this project. **However: do not just copy and paste from AI. Understand what you are building and how it works - this matters.**

## Grading

| Area | Weight |
| --- | --- |
| Cart Context (sidebar, add/remove, checkout flow) | 35% |
| Routing + pages | 25% |
| Data loading, pagination, folder structure & code quality | 20% |
| Hosted, working, submitted correctly | 20% |
| Bonus (favorites) | up to +10% |