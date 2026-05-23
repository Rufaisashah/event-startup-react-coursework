img src="./images/hyf.svg" alt="image" width="200px" height="200px">

# HYF Events — Ticketing Platform

A full stack ticketing platform built with React where users can browse events, add tickets to a cart, authenticate, and place orders.

Built over 5 weeks at HackYourFuture Denmark with weekly mentor code reviews.

---

## Live Demo

- **Frontend:**( https://event-startup-react-coursework.vercel.app/)
- **API:** [https://event-startup-react-coursework.onrender.com/api/events](https://event-startup-react-coursework.onrender.com/api/events)

> Note: The API is hosted on Render's free tier and may take 30–60 seconds to wake up on the first request after inactivity.

---

## Features

### Browsing
- Browse 10 events across multiple categories — conferences, workshops, hackathons, meetups and bootcamps
- Search events with 400ms debounce — one fetch per search, not one per keystroke
- Filter by category
- Sort by date, price or name
- Pagination — 4 events per page
- Loading and error states on all fetches

### Event Detail
- Full event information — date, time, venue, city, description, availability
- Quantity selector with live total price calculation
- Sold out events hide the ticket selector automatically

### Authentication
- Register with email and password
- Login with JWT token authentication
- Session persists on page refresh via localStorage
- Sign out clears session and cart

### Shopping Cart
- Add tickets from any event detail page
- Update quantity or remove items in the cart
- Cart persists across page refreshes via localStorage
- Cart clears on logout
- Real-time item count badge in the nav bar
- Unauthenticated users redirected to login on checkout

### Checkout and Orders
- Authenticated checkout posts order to the API
- Cart clears after successful checkout
- View order history with all past orders
- View individual order details
- Remove orders

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 |
| Routing | React Router v6 |
| Global state | React Context API |
| Styling | Tailwind CSS + plain CSS |
| HTTP requests | fetch with async/await |
| Authentication | JWT via json-server-auth |
| Local persistence | localStorage |
| Build tool | Vite |
| Frontend deployment | Vercel |
| Backend deployment | Render |
| Mock API | json-server + json-server-auth |

---

## Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx     # user session — login, register, logout, token
│   └── CartContext.jsx     # cart state — add, remove, update, persist
├── components/
│   ├── Layout/             # header, nav, footer shell
│   ├── HomePage/           # landing page hero
│   ├── EventList/          # event browsing with search, filter, sort, pagination
│   ├── EventCard/          # single event card used in the list
│   ├── EventDetail/        # full event with quantity selector
│   ├── Cart/               # cart items, quantities, total, checkout
│   ├── Checkout/           # success page after order
│   ├── Orders/             # order history list
│   ├── OrderDetail/        # single order view
│   ├── Login/              # login form with validation
│   └── Register/           # register form with validation
├── api.js                  # URL builder using VITE_API_URL env variable
├── main.jsx                # router config and provider setup
└── main.css                # global base styles + Tailwind import
api/
├── db.json                 # mock database — users, events, orders
└── server.cjs              # json-server setup with auth and route guards
```

---

## Getting Started

### Prerequisites
- Node.js v20+
- npm v10+

### Installation

```bash
# Clone the repository
git clone https://github.com/Rufaisashah/event-startup-react-coursework.git

# Navigate to the app folder
cd templates/app/app-vite

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in `templates/app/app-vite/`:

```
VITE_API_URL=http://localhost:3001
API_PORT=3001
PORT=5173
SECRET=mysecretkey123
```

### Running Locally

```bash
# Start both the React app and mock API together
npm run dev:all
```

- React app: [http://localhost:5173](http://localhost:5173)
- Mock API: [http://localhost:3001](http://localhost:3001)

### Demo Account

A demo user is seeded in `api/db.json`:

```
Email:    demo@test.com
Password: password
```

---

## API Reference

The mock API is powered by json-server and json-server-auth.

### Public endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/register` | Create account `{ email, password }` |
| POST | `/api/login` | Sign in → returns `{ accessToken, user }` |
| GET | `/api/events` | List all events |
| GET | `/api/events/:id` | Get a single event |

### Protected endpoints (requires Bearer token)

| Method | Route | Description |
|---|---|---|
| GET | `/api/orders` | List your own orders |
| POST | `/api/orders` | Place an order |
| PATCH | `/api/orders/:id` | Update an order |
| DELETE | `/api/orders/:id` | Delete an order |

### Authentication header

```
Authorization: Bearer <accessToken>
```

---

## Key Technical Decisions

**React Context for cart and auth**
Both the cart and user session are needed in multiple unrelated components simultaneously. Context avoids prop drilling through intermediate components that don't need the data.

**localStorage for persistence**
React state resets on page refresh. Cart and session data is saved to localStorage and loaded on first render so users don't lose their cart or get logged out on refresh.

**Debounced search**
Search fires one fetch after the user stops typing (400ms delay) rather than one fetch per keystroke. An AbortController cancels the previous request if a new one starts before it resolves.

**JWT authentication**
Login returns a token encoded with the user's id. Every protected request includes the token as an Authorization Bearer header. The server decodes it to verify identity without a database lookup on every request.

**useEffect for data fetching**
Fetch calls live inside useEffect so they run after the component renders — not during. This prevents infinite render loops and ensures the component exists before data is loaded into it.

---

## Known Limitations

- **json-server resets on restart** — user accounts and orders are lost when the Render server restarts. A production app would use a persistent database like PostgreSQL.
- **Render free tier cold starts** — the API sleeps after 15 minutes of inactivity. The first request after sleep takes 30–60 seconds.
- **No real payments** — checkout saves an order record only. A production app would integrate Stripe or similar.
- **No email verification** — any email address can register without verification.

---

## What I Would Add Next

- PostgreSQL for persistent data storage
- Stripe for real payment processing
- Email confirmation after order
- Refresh token rotation for better auth security
- End to end tests with Cypress
- Server side rendering with Next.js for SEO

---

## Development Process

Built over 5 weekly sprints with mentor code reviews after each sprint:

| Week | Focus | Key features |
|---|---|---|
| 1 | Components and composition | EventCard, EventDetail, Layout, routing |
| 2 | State and interaction | Props, useState, sort, filter, quantity selector |
| 3 | Data fetching and forms | useEffect, fetch, search, pagination, auth forms |
| 4 | Context and routing | CartContext, Cart page, protected routes |
| 5 | Checkout and deployment | Orders, checkout flow, Tailwind polish, Vercel + Render |

---

## Deployment

### Frontend — Vercel

```
Framework:        Vite
Root Directory:   templates/app/app-vite
Build Command:    npm run build
Output Directory: dist
Environment:      VITE_API_URL=https://your-render-url.onrender.com
```

### Backend — Render

```
Root Directory:  templates/app/app-vite
Build Command:   npm install
Start Command:   node api/server.cjs
Environment:     SECRET=your-secret, PORT=10000
```

---

## Author

**Rufaisa Ashraf Shah**
Junior Web Developer — Odense, Denmark

- [LinkedIn](https://www.linkedin.com/in/rufaisashah)
- [GitHub](https://github.com/Rufaisashah)
- [Portfolio](https://rufaisashah.github.io/portfolio/)

---

*Built as part of the HackYourFuture Denmark web development bootcamp, 2025–2026.*
