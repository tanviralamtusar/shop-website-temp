# 🏗️ E-Commerce Platform

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)

A high-performance, professional e-commerce platform built for the Bangladeshi market. Designed with a primary focus on the fashion industry, featuring a Bengali-first UI, integrated courier tracking, and server-side conversion tracking.

---

## ✨ Key Features

### 🛍️ Customer Experience
- **Bengali-First Interface**: Optimized typography (Noto Sans Bengali, Hind Siliguri) and content for local users.
- **Dynamic Landing Pages**: Purpose-built marketing pages for specific products with high-conversion layouts.
- **Variation Support**: Real-time price and stock updates based on size, color, or material variations.
- **Guest Checkout**: Fast, 1-step checkout process requiring no account creation.
- **Wishlist & Cart**: Persistent local-storage driven shopping experience.
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop devices.
- **Social Integration**: Floating WhatsApp, Messenger, and Phone widgets for instant customer support.

### 🛡️ Admin Dashboard
- **Comprehensive Analytics**: Real-time sales, order, and customer metrics via an intuitive dashboard.
- **Order Management**: Bulk order processing, status tracking (Pending → Processing → Shipped → Delivered).
- **Courier Integration**: One-click order submission to **Steadfast/Packzy** courier API with automatic tracking number generation.
- **Inventory System**: Managed stock levels for both parent products and specific variations.
- **Landing Page Builder**: Create and edit product landing pages dynamically from the admin panel.
- **Global Settings**: Customize site logo, colors, tracking pixel IDs, and contact info without code changes.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (SWC)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion + tailwindcss-animate
- **State Management**: 
  - **Redux Toolkit**: Cart, Wishlist, and Auth state longevity.
  - **React Query**: Server state caching and revalidation.
- **Icons**: Lucide React

### Backend (Baas)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (with role-based access control)
- **Serverless Logic**: Supabase Edge Functions (Deno runtime) for order processing, SMS/Email, and API integrations.

### Tracking & Analytics
- **Facebook Pixel**: Full client-side and server-side (CAPI) event tracking.
- **Google Analytics**: E-commerce event tracking via Measurement Protocol.
- **TikTok Pixel**: Conversion tracking for marketing campaigns.

---

## 📁 Project Structure

```bash
src/
├── components/       # Reusable UI primitives (shadcn) & Layout components
├── hooks/            # Custom React hooks (Auth, tracking, viewport)
├── integrations/     # Supabase client and generated types
├── lib/               # Utility functions (cn, video helpers)
├── pages/            # View components (Home, Products, Admin panel)
├── services/         # API abstraction layer (Product, Order, Admin)
├── store/            # Redux Toolkit slices and store configuration
├── types/            # Shared TypeScript interfaces
└── index.css         # Global styles & CSS Variable-based theming system

supabase/
├── migrations/       # SQL schema and RLS policies
└── functions/        # Deno edge functions for integrations
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / bun
- Supabase Project

### Installation

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd modessi-clone
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development Server**:
   ```sh
   npm run dev
   ```

---

## 🏗️ Production Commands

- **Build**: `npm run build` (Outputs to `dist/`)
- **Lint**: `npm run lint`
- **Deploy Edge Functions**: `supabase functions deploy`

---

## 🌐 Deployment

The project is configured for seamless deployment on **Netlify** or **Vercel**.
- **Netlify**: Use `netlify.toml` for SPA routing.
- **Vercel**: Use `vercel.json` for SPA routing.

Ensure all environment variables are added to your hosting provider's dashboard.

---

## 📝 License

Internal project template. All rights reserved.
