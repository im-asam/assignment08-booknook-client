# BookNook

A small online library — add a book, borrow a book, return a book.

**Live site:** https://assignment08-booknook-client.vercel.app/

## Features

- **Browse the shelf** — view all books as cards with cover, title, author and category, newest arrivals first on the home page.
- **Borrow & return** — borrow a book for 14 days from its details page; return it from My Borrows and the copy goes back on the shelf automatically.
- **Add & manage books** — logged-in users add books with a cover image (imgbb upload), then edit or delete their own books from My Books.
- **Available copies** — every book tracks total vs. available copies; borrowing decreases the count, returning increases it, and the Borrow button disables at zero.
- **No double borrowing** — a user cannot borrow the same book twice at the same time.
- **Secure auth with JWT** — BetterAuth (email + Google) with the MongoDB adapter; protected API calls carry a JWT that the server verifies.
- **Dark / light theme** — one-click toggle in the Navbar, saved in localStorage with no flash on load.
- **Animated, responsive UI** — Swiper hero slider, Framer Motion reveals, and a layout that works on mobile, tablet and desktop.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- BetterAuth + MongoDB Adapter + JWT plugin
- Express API server (separate repo) + MongoDB Atlas
- imgbb for book cover uploads
- Swiper.js, Framer Motion, react-hot-toast

## Getting Started

1. Copy `.env.example` to `.env.local` and fill in the values (see the comments in `.env.example` for where to get each one).
2. Install dependencies:

```bash
npm install
```

3. Start the development server (make sure the API server is running on port 5000):

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

| Route          | Access  | Description                              |
| -------------- | ------- | ---------------------------------------- |
| `/`            | Public  | Hero slider, new arrivals, library info  |
| `/books`       | Public  | All books                                |
| `/books/:id`   | Private | Book details + borrow                    |
| `/add-book`    | Private | Add a new book                           |
| `/my-books`    | Private | Your books (edit / delete)               |
| `/my-borrows`  | Private | Your borrowed books (return)             |
| `/login`       | Public  | Log in (email or Google)                 |
| `/register`    | Public  | Create an account                        |
| `/profile`     | Private | Your profile                             |
