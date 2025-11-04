# Farm Store - Local Produce E-Commerce Platform

> Full-stack e-commerce platform for a local farm/store to sell fresh produce directly to customers through online ordering, including an admin panel for product and order management.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## Features

### Customer Shop (`/mercado`)
- Product catalog with dual-unit pricing (kg/unit)
- Shopping cart with localStorage persistence
- Low stock indicators
- Category filtering
- Mobile-responsive design
- Order submission via contact form

### Admin Panel (`/admin`)
- Product & category management (CRUD)
- Stock tracking & price management
- In-line editing
- Secure authentication
- Order management

## Technology Stack

**Frontend**
- Next.js 15.5.2 (App Router, Server Components, Server Actions)
- React 18 with TypeScript
- Tailwind CSS 3.3
- SWR for data fetching
- React Context for state management

**Backend**
- Supabase (PostgreSQL + Authentication)
- Next.js Server Actions
- Row Level Security (RLS)

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Copy `.env.example` to `.env.local` and add your Supabase credentials.

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

**Available routes:**
- `/mercado` - Customer shop
- `/admin` - Admin dashboard
- `/login` - Admin authentication
