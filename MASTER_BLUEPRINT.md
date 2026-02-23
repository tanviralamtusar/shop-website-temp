# 🏗️ MASTER PROJECT BLUEPRINT — Modessi E-Commerce Platform

> **Purpose**: A comprehensive, exhaustive template to repeatedly build identical Bengali-focused e-commerce websites from scratch.  
> **Generated from**: `modessi clone` workspace — full codebase analysis.

---

## Table of Contents

1. [Tech Stack & Dependencies](#1-tech-stack--dependencies)
2. [Project Architecture](#2-project-architecture)
3. [Configuration Files](#3-configuration-files)
4. [Theming & Design System](#4-theming--design-system)
5. [Database Schema (Supabase)](#5-database-schema-supabase)
6. [TypeScript Type Definitions](#6-typescript-type-definitions)
7. [State Management (Redux Toolkit)](#7-state-management-redux-toolkit)
8. [Authentication System](#8-authentication-system)
9. [Services Layer](#9-services-layer)
10. [Supabase Edge Functions](#10-supabase-edge-functions)
11. [Routing & Pages](#11-routing--pages)
12. [Component Architecture](#12-component-architecture)
13. [Tracking & Analytics](#13-tracking--analytics)
14. [Deployment Configuration](#14-deployment-configuration)
15. [Step-by-Step Replication Guide](#15-step-by-step-replication-guide)

---

## 1. Tech Stack & Dependencies

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| React | ^18.3.1 | UI library |
| TypeScript | ~5.6.2 | Type safety |
| Vite | ^5.4.11 | Build tool & dev server |
| SWC | via @vitejs/plugin-react-swc | Fast JSX/TS compilation |

### Styling
| Technology | Version | Purpose |
|---|---|---|
| Tailwind CSS | ^3.4.17 | Utility-first CSS |
| PostCSS | ^8.4.49 | CSS processing |
| Autoprefixer | ^10.4.20 | Browser prefixing |
| tailwindcss-animate | ^1.0.7 | Animation utilities |
| tailwind-merge | ^2.6.0 | Class merging |
| clsx | ^2.1.1 | Conditional classes |
| class-variance-authority | ^0.7.1 | Component variants |

### State Management
| Technology | Version | Purpose |
|---|---|---|
| @reduxjs/toolkit | ^2.5.0 | State management |
| react-redux | ^9.2.0 | React-Redux bindings |
| @tanstack/react-query | ^5.62.11 | Server state / caching |

### Backend (BaaS)
| Technology | Version | Purpose |
|---|---|---|
| @supabase/supabase-js | ^2.49.1 | Supabase client |
| Supabase Edge Functions | Deno runtime | Serverless backend logic |
| PostgreSQL (via Supabase) | — | Database |

### UI Component Library
| Technology | Purpose |
|---|---|
| shadcn/ui (49 components) | Pre-built accessible UI primitives |
| @radix-ui/* (20+ packages) | Headless UI primitives |
| lucide-react ^0.462.0 | Icon library |
| framer-motion | Animations |
| sonner ^1.7.3 | Toast notifications |
| recharts ^2.15.0 | Charts (admin dashboard) |
| embla-carousel-react | Carousel component |
| react-day-picker | Calendar/date picker |

### Routing & Navigation
| Technology | Version | Purpose |
|---|---|---|
| react-router-dom | ^7.0.2 | Client-side routing |

### Fonts (Google Fonts via CDN)
- **Noto Sans Bengali** — weights: 400, 500, 600, 700
- **Hind Siliguri** — weights: 400, 500, 600, 700
- **Playfair Display** — weights: 400, 700 (serif accents)

---

## 2. Project Architecture

```
modessi-clone/
├── index.html                    # Entry HTML, meta tags, Google Fonts
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite config (SWC, aliases)
├── tailwind.config.ts            # Tailwind theme customization
├── tsconfig.json                 # TypeScript root config
├── tsconfig.app.json             # App-specific TS config
├── tsconfig.node.json            # Node/Vite TS config
├── postcss.config.js             # PostCSS (Tailwind + Autoprefixer)
├── eslint.config.js              # ESLint config
├── components.json               # shadcn/ui configuration
├── netlify.toml                  # Netlify SPA rewrites
├── vercel.json                   # Vercel SPA rewrites
├── .env                          # Environment variables
│
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Root component (routing, providers)
│   ├── App.css                   # Basic root styles
│   ├── index.css                 # Global CSS + theming system
│   │
│   ├── assets/                   # Static images (hero slides, logo)
│   ├── types/index.ts            # Shared TypeScript interfaces
│   ├── lib/utils.ts              # cn() utility + videoEmbed helpers
│   ├── data/mockData.ts          # Fallback mock products/categories
│   │
│   ├── store/                    # Redux Toolkit
│   │   ├── store.ts              # Store config (4 reducers)
│   │   ├── hooks.ts              # Typed useAppDispatch/useAppSelector
│   │   └── slices/
│   │       ├── cartSlice.ts      # Cart state + localStorage persistence
│   │       ├── wishlistSlice.ts  # Wishlist state + localStorage
│   │       ├── authSlice.ts      # Auth state (user, isAuthenticated)
│   │       └── productSlice.ts   # Products, filters, featured
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.tsx           # Supabase auth context + admin check
│   │   ├── useFacebookPixel.ts   # FB Pixel init + event tracking
│   │   ├── use-mobile.tsx        # Mobile viewport detection (768px)
│   │   └── use-toast.ts          # Toast notification system
│   │
│   ├── services/                 # API/data service layer
│   │   ├── productService.ts     # Product CRUD + fetch operations
│   │   ├── orderService.ts       # Order creation + user order history
│   │   └── adminService.ts       # Full admin panel API operations
│   │
│   ├── integrations/supabase/
│   │   ├── client.ts             # Supabase client initialization
│   │   └── types.ts              # Auto-generated DB types (18 tables)
│   │
│   ├── components/
│   │   ├── layout/               # Header, Footer, HeroBanner
│   │   ├── cart/CartDrawer.tsx    # Slide-out cart drawer
│   │   ├── checkout/             # Checkout form components
│   │   ├── products/             # Product card, grid components
│   │   ├── admin/                # AdminLayout + sidebar navigation
│   │   ├── landing-builder/      # 12 landing page builder components
│   │   ├── tracking/             # FB Pixel, GA, TikTok Pixel
│   │   ├── ui/                   # 49 shadcn/ui components
│   │   ├── FaviconLoader.tsx     # Dynamic favicon from settings
│   │   ├── NavLink.tsx           # Active navigation link
│   │   └── SocialChatWidget.tsx  # Floating social chat buttons
│   │
│   └── pages/
│       ├── FashionHomePage.tsx    # Main homepage (1304 lines)
│       ├── ProductsPage.tsx      # Product listing with filters
│       ├── ProductDetailPage.tsx # Single product with variations
│       ├── CartPage.tsx          # Full cart page
│       ├── CheckoutPage.tsx      # Checkout flow (694 lines)
│       ├── OrderConfirmationPage.tsx
│       ├── AuthPage.tsx          # Login/Register
│       ├── MyAccountPage.tsx     # User account & order history
│       ├── WishlistPage.tsx      # Saved products
│       ├── AboutPage.tsx         # About us
│       ├── ContactPage.tsx       # Contact form
│       ├── ResetPasswordPage.tsx # Password reset
│       ├── LandingPage.tsx       # Dynamic landing page renderer
│       ├── ProductLandingPage.tsx # Product-specific landing
│       ├── CottonTarselLandingPage.tsx
│       ├── DigitalTarselLandingPage.tsx
│       ├── ReyonCottonLandingPage.tsx
│       ├── TulshiLandingPage.tsx
│       ├── HomePage.tsx          # Alternative homepage
│       ├── NotFound.tsx          # 404 page
│       └── admin/ (23 pages)     # Full admin panel
│
└── supabase/
    ├── config.toml               # Supabase project config
    ├── migrations/               # SQL schema migrations
    └── functions/                # 13 Edge Functions
        ├── place-order/          # Order creation (guest + auth)
        ├── steadfast-courier/    # Courier integration (Packzy API)
        ├── steadfast-status/     # Courier status tracking
        ├── send-sms/             # SMS notifications
        ├── send-order-email/     # Email notifications
        ├── facebook-capi/        # FB Conversions API (server-side)
        ├── google-analytics/     # GA server-side events
        ├── tiktok-events-api/    # TikTok server-side events
        ├── create-admin-user/    # Admin user provisioning
        ├── reset-user-password/  # Password reset
        ├── customer-history/     # Customer order history
        ├── courier-history/      # Courier tracking history
        └── combined-courier-history/
```

---

## 3. Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080 },
  plugins: [react(), mode === 'development' && componentTagger()].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
```

### tailwind.config.ts (Key Theme Customizations)
```typescript
// Font families
fontFamily: {
  bengali: ['Noto Sans Bengali', 'Hind Siliguri', 'sans-serif'],
  sans: ['Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
  serif: ['Playfair Display', 'serif'],
}

// Color palette (via CSS variables — see Section 4)
colors: {
  border, input, ring, background, foreground,
  primary: { DEFAULT, foreground },
  secondary: { DEFAULT, foreground },
  destructive: { DEFAULT, foreground },
  muted: { DEFAULT, foreground },
  accent: { DEFAULT, foreground },
  popover: { DEFAULT, foreground },
  card: { DEFAULT, foreground },
  sidebar: { DEFAULT, foreground, primary, accent, border, ring },
  chart: { 1-5 },
}

// Custom animations
keyframes: {
  "accordion-down", "accordion-up",
  "fade-in", "slide-up", "scale-in",
  "shimmer", "float",
}
```

### components.json (shadcn/ui)
```json
{
  "style": "new-york",
  "tailwind": { "config": "tailwind.config.ts", "css": "src/index.css", "baseColor": "neutral" },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### .env (Required Environment Variables)
```
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

---

## 4. Theming & Design System

### CSS Variable System (index.css)
The entire theme is driven by CSS custom properties in `:root`, enabling easy re-skinning.

```css
:root {
  /* === Burgundy & Gold Theme === */
  --deep-burgundy: #4A0E2E;
  --rich-burgundy: #6B1D4A;
  --warm-gold: #D4A855;
  --soft-gold: #E8C97A;
  --cream: #FFF8F0;
  --deep-charcoal: #1a1a2e;
  --warm-gray: #6B7280;

  /* === Gradients === */
  --gradient-primary: linear-gradient(135deg, #4A0E2E, #6B1D4A, #8B2E5A);
  --gradient-gold: linear-gradient(135deg, #D4A855, #E8C97A, #F0D68A);
  --gradient-hero: linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 50%, #4A0E2E 100%);
  --gradient-card: linear-gradient(145deg, #ffffff 0%, #faf8f5 100%);
  --gradient-elegant: linear-gradient(135deg, #4A0E2E 0%, #6B1D4A 30%, #D4A855 100%);

  /* === Shadows === */
  --shadow-elegant: 0 4px 20px rgba(74, 14, 46, 0.08);
  --shadow-gold: 0 4px 15px rgba(212, 168, 85, 0.2);
  --shadow-hover: 0 8px 30px rgba(74, 14, 46, 0.12);

  /* === shadcn/ui variables (HSL) === */
  --background: 30 50% 98%;
  --foreground: 240 10% 10%;
  --primary: 325 67% 18%;
  --primary-foreground: 30 50% 98%;
  --secondary: 30 30% 93%;
  --accent: 40 60% 65%;
  --muted: 30 15% 93%;
  --destructive: 0 84.2% 60.2%;
  --border: 30 20% 88%;
  --ring: 325 67% 18%;
  --radius: 0.75rem;
  /* ... card, popover, sidebar, chart variables ... */
}
```

### Key CSS Utilities & Animations
```css
/* Custom gradient text */
.gradient-text {
  background: var(--gradient-elegant);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Elegant card hover */
.elegant-card {
  background: var(--gradient-card);
  border: 1px solid rgba(212, 168, 85, 0.1);
  box-shadow: var(--shadow-elegant);
  transition: all 0.3s ease;
}
.elegant-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
  border-color: rgba(212, 168, 85, 0.3);
}

/* Button variants */
.btn-burgundy { background: var(--gradient-primary); }
.btn-gold { background: var(--gradient-gold); color: var(--deep-burgundy); }

/* Animations */
@keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
```

---

## 5. Database Schema (Supabase)

### Core Tables (18 total)

#### `users` (extends Supabase auth.users)
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK, FK→auth.users) | |
| name | text | |
| email | text | |
| phone | text | |
| avatar_url | text | |
| created_at | timestamptz | DEFAULT now() |

#### `user_roles`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK→auth.users) | |
| role | text | 'admin', 'user' |

#### `profiles`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK, FK→auth.users) | |
| first_name, last_name | text | |
| avatar_url | text | |

#### `categories`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| name, slug | text (UNIQUE slug) | |
| description | text | |
| image_url | text | |
| parent_id | uuid (FK→self) | Subcategories |
| sort_order | int (DEFAULT 0) | |
| is_active | boolean (DEFAULT true) | |

#### `products`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| name, slug | text (UNIQUE slug) | |
| description, short_description, long_description | text | |
| price | decimal(10,2) NOT NULL | |
| original_price | decimal(10,2) | For showing discounts |
| images | text[] | Array of image URLs |
| category_id | uuid (FK→categories) | |
| stock | int (DEFAULT 0) | |
| is_active, is_featured, is_new | boolean | |
| rating | decimal(3,2) DEFAULT 0 | Auto-updated by trigger |
| review_count | int DEFAULT 0 | Auto-updated by trigger |
| tags | text[] | |
| video_url | text | Product video |
| created_at, updated_at | timestamptz | |

#### `product_variations`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| product_id | uuid (FK→products) | |
| name | text NOT NULL | e.g., "Size M", "Color Red" |
| price | decimal(10,2) NOT NULL | Override price |
| original_price | decimal(10,2) | |
| stock | int DEFAULT 0 | |
| sort_order | int DEFAULT 0 | |
| is_active | boolean DEFAULT true | |

#### `orders`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK→auth.users, nullable) | Null for guest orders |
| order_number | text UNIQUE | Auto-generated by function |
| status | text DEFAULT 'pending' | pending/processing/shipped/delivered/cancelled |
| subtotal, shipping_cost, total | decimal(10,2) | |
| discount_amount | decimal(10,2) | |
| payment_method | text DEFAULT 'cod' | |
| payment_status | text DEFAULT 'pending' | |
| shipping_name, shipping_phone, shipping_address | text | |
| shipping_zone | text | 'inside_dhaka' / 'outside_dhaka' |
| notes, invoice_note | text | |
| tracking_number | text | |
| steadfast_consignment_id | text | Courier integration |
| order_source | text DEFAULT 'web' | web/manual/landing_page |
| coupon_code | text | |
| created_at, updated_at | timestamptz | |

#### `order_items`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| order_id | uuid (FK→orders) | |
| product_id | uuid (FK→products) | |
| variation_id | uuid (FK→product_variations) | |
| product_name, product_image | text | Snapshot at order time |
| quantity | int NOT NULL | |
| price | decimal(10,2) NOT NULL | |

#### Other Tables
| Table | Purpose |
|---|---|
| `addresses` | User saved addresses |
| `cart_items` | Server-side cart (supplements localStorage) |
| `wishlist_items` | Server-side wishlist |
| `reviews` | Product reviews with ratings |
| `banners` | Homepage promotional banners |
| `coupons` | Discount coupon codes |
| `landing_pages` | Dynamic landing page configurations |
| `contact_submissions` | Contact form entries |
| `sms_logs` | SMS delivery tracking |
| `sms_templates` | SMS message templates |
| `admin_settings` | Key-value site configuration store |
| `home_page_content` | Homepage section configurations |
| `incomplete_orders` | Abandoned checkout tracking |

### Database Functions
```sql
-- Auto-generate sequential order numbers: ORD-10001, ORD-10002, ...
CREATE FUNCTION generate_order_number() RETURNS text;

-- Auto-create user profile on signup
CREATE FUNCTION handle_new_user() RETURNS trigger;

-- Check if user has a specific role
CREATE FUNCTION has_role(user_id uuid, role text) RETURNS boolean;

-- Recalculate product rating on review insert/update/delete
CREATE FUNCTION update_product_rating() RETURNS trigger;

-- Auto-update updated_at timestamp
CREATE FUNCTION update_updated_at() RETURNS trigger;
```

### Row Level Security (RLS)
- All tables have RLS enabled
- Policies enforce: users see own data, admins see all
- `place-order` edge function uses service role key to bypass RLS for guest orders

---

## 6. TypeScript Type Definitions

### `src/types/index.ts` — 10 Core Interfaces
```typescript
interface ProductVariation {
  id: string; product_id: string; name: string;
  price: number; original_price?: number;
  stock: number; sort_order: number; is_active: boolean;
}

interface Product {
  id: string; name: string; slug: string;
  description: string; short_description?: string; long_description?: string;
  price: number; originalPrice?: number;
  images: string[]; category: string; categorySlug?: string;
  subcategory?: string; rating: number; reviewCount: number;
  stock: number; featured?: boolean; isNew?: boolean;
  discount?: number; tags?: string[]; variations?: ProductVariation[];
}

interface Category {
  id: string; name: string; slug: string;
  image: string; productCount: number; subcategories?: Subcategory[];
}

interface CartItem { product: Product; quantity: number; variation?: ProductVariation; }

interface User {
  id: string; name: string; email: string;
  phone?: string; avatar?: string;
  role: 'user' | 'admin'; addresses?: Address[];
}

interface Address {
  id: string; name: string; phone: string;
  street: string; city: string; district: string;
  postalCode: string; isDefault?: boolean;
}

interface Order {
  id: string; userId: string; items: CartItem[];
  total: number; subtotal: number; shipping: number; discount?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'stripe';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: Address; createdAt: string; updatedAt: string;
  trackingNumber?: string;
}

interface Review { id: string; userId: string; userName: string; ... }
interface FilterState { category?: string; sortBy: 'newest'|'price-low'|'price-high'|'rating'|'popular'; ... }
```

---

## 7. State Management (Redux Toolkit)

### Store Configuration (`store/store.ts`)
```typescript
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
    cart: cartReducer,       // CartSlice
    wishlist: wishlistReducer, // WishlistSlice
    auth: authReducer,       // AuthSlice
    products: productReducer, // ProductSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Cart Slice — Key Logic
- **localStorage persistence**: Loads from `modessi_cart` on init, saves on every change
- **Variation-aware**: Cart items include optional `ProductVariation`
- **Quantity management**: Add (increment if exists), remove, updateQuantity
- **Cart drawer**: `isCartOpen` state for slide-out drawer
- **Selectors**: `selectCartItems`, `selectCartTotal` (price calculation respects variation prices)

### Wishlist Slice
- **localStorage persistence**: Key `modessi_wishlist`
- **Toggle behavior**: `toggleWishlist` adds/removes in one action
- **Selector**: `selectIsInWishlist(state, productId)`

### Auth Slice
- Stores `user`, `isAuthenticated`, `isLoading`, `error`
- Updated by `useAuth` hook (Supabase listener)

### Product Slice
- Stores `products[]`, `featuredProducts[]`, `selectedProduct`, `filters: FilterState`
- Used alongside React Query for server-state caching

---

## 8. Authentication System

### `useAuth` Hook (Context-based)
```typescript
// Provides: user, session, isLoading, isAdmin, signUp, signIn, signOut
// Implementation:
// 1. Listens to supabase.auth.onAuthStateChange
// 2. On SIGNED_IN: sets user + session, checks admin role
// 3. Admin check: queries user_roles table for role='admin'
// 4. signUp: supabase.auth.signUp (auto-creates profile via DB trigger)
// 5. signIn: supabase.auth.signInWithPassword
// 6. signOut: supabase.auth.signOut
```

### Supabase Client (`integrations/supabase/client.ts`)
```typescript
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
```

---

## 9. Services Layer

### `productService.ts`
| Function | Returns | Description |
|---|---|---|
| `getProducts()` | Product[] | All active products with category join |
| `getFeaturedProducts()` | Product[] | `is_featured=true`, limit 8 |
| `getNewProducts()` | Product[] | `is_new=true`, limit 8 |
| `getRecentProducts()` | Product[] | Latest 8 by created_at |
| `getProductBySlug(slug)` | Product | Single product + category data |
| `getProductVariations(id)` | ProductVariation[] | Active variations, sorted |
| `getCategories()` | Category[] | Active categories, sorted |
| `mapProductFromDB(row)` | Product | DB→frontend type transformer |

### `orderService.ts`
| Function | Returns | Description |
|---|---|---|
| `createOrder(data)` | Order | Invokes `place-order` edge function |
| `getUserOrders(userId)` | Order[] | User's orders with items + products |

### `adminService.ts` (47 functions)
Covers: dashboard stats, product CRUD, category CRUD, order management (status updates, delete), user management (roles), inventory (low stock, update), banner CRUD, and draft orders.

---

## 10. Supabase Edge Functions

| Function | Auth | Purpose |
|---|---|---|
| `place-order` | Public (no JWT) | Creates orders for guests + auth users. Normalizes BD phone numbers. Triggers background SMS + email. |
| `steadfast-courier` | Auth | Sends orders to Steadfast/Packzy courier API. Supports single + bulk orders. Updates tracking. |
| `steadfast-status` | Auth | Checks courier delivery status |
| `send-sms` | Auth | SMS notifications via provider |
| `send-order-email` | Auth | Order confirmation emails |
| `facebook-capi` | Auth | Server-side FB Conversions API events |
| `google-analytics` | Auth | Server-side GA measurement protocol |
| `tiktok-events-api` | Auth | Server-side TikTok events |
| `create-admin-user` | Auth | Provisions admin users |
| `reset-user-password` | Auth | Password reset flow |
| `customer-history` | Auth | Customer order history lookup |
| `courier-history` | Auth | Courier tracking history |
| `combined-courier-history` | Auth | Combined courier data |

### `place-order` Key Logic
1. Receives items, shipping info, optional userId
2. Normalizes Bangladesh phone numbers (`+880` handling)
3. Creates order + order_items using service role key
4. Returns order immediately for fast UX
5. Background tasks: sends SMS + email notifications (non-blocking)

### `steadfast-courier` Key Logic
1. Reads API credentials from `admin_settings` table (fallback: env vars)
2. Calls Packzy API (`portal.packzy.com/api/v1/create_order`)
3. Updates order with `tracking_number` + `steadfast_consignment_id`
4. Supports bulk order submission

---

## 11. Routing & Pages

### Route Structure (`App.tsx`)
```tsx
<BrowserRouter>
  <Routes>
    {/* Public Pages */}
    <Route path="/" element={<FashionHomePage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/product/:slug" element={<ProductDetailPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
    <Route path="/wishlist" element={<WishlistPage />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/my-account" element={<MyAccountPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />

    {/* Landing Pages */}
    <Route path="/landing/:slug" element={<LandingPage />} />
    <Route path="/cotton-tarsel" element={<CottonTarselLandingPage />} />
    <Route path="/digital-tarsel" element={<DigitalTarselLandingPage />} />
    <Route path="/reyon-cotton" element={<ReyonCottonLandingPage />} />
    <Route path="/tulshi" element={<TulshiLandingPage />} />
    <Route path="/p/:slug" element={<ProductLandingPage />} />

    {/* Admin (Protected — requires admin role) */}
    <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
    <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
    <Route path="/admin/categories" element={<AdminLayout><AdminCategories /></AdminLayout>} />
    <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
    <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
    {/* ... 18 more admin routes ... */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### Provider Hierarchy
```tsx
<QueryClientProvider>    {/* React Query */}
  <Provider store={store}> {/* Redux */}
    <AuthProvider>           {/* Supabase Auth */}
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />         {/* shadcn/ui toasts */}
          <Sonner />          {/* sonner toasts */}
          <FacebookPixel />   {/* Tracking */}
          <GoogleAnalytics />
          <TikTokPixel />
          <Routes>...</Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </Provider>
</QueryClientProvider>
```

---

## 12. Component Architecture

### Layout Components
| Component | File | Purpose |
|---|---|---|
| Header | `components/layout/Header.tsx` | Sticky nav, search, cart badge, mobile menu, dynamic logo from admin_settings |
| Footer | `components/layout/Footer.tsx` | 4-column grid: brand, quick links, support, contact. Bengali text. |
| HeroBanner | `components/layout/HeroBanner.tsx` | Rotating hero slides (from banners table or home_page_content) |

### Cart Components
| Component | Purpose |
|---|---|
| CartDrawer | Slide-out drawer with framer-motion. Shows items, quantities, variation names, total. Links to checkout. |
| CartPage | Full-page cart view |

### Admin System
- **AdminLayout**: Sidebar navigation (22 items) + header + content area
- **AdminSidebar**: Uses shadcn Sidebar component with badge for pending orders count
- **Protected**: Checks `isAdmin` from `useAuth`, redirects non-admins
- **23 Admin Pages**: Dashboard, Products, Categories, Orders, Users, Banners, Inventory, SMS, Marketing, Reports, Site Settings, Shop Settings, Landing Pages, Landing Video, Social Media, Courier Settings, Courier History, Contact Submissions, Incomplete Orders, Order Protection, Home Page Edit, Steadfast

### Landing Page Builder (12 components)
Dynamic landing page system stored in database. Pages are built from JSON configuration with components for hero sections, product grids, testimonials, CTAs, etc.

### shadcn/ui Components (49 total)
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip

### Utility Components
| Component | Purpose |
|---|---|
| FaviconLoader | Loads favicon dynamically from admin_settings |
| NavLink | Active state navigation link |
| SocialChatWidget | Floating WhatsApp/Messenger/Phone buttons |

---

## 13. Tracking & Analytics

### Client-Side Tracking
| Tracker | Component | Events |
|---|---|---|
| Facebook Pixel | `tracking/FacebookPixelTracker.tsx` + `useFacebookPixel.ts` | PageView, ViewContent, AddToCart, InitiateCheckout, Purchase |
| Google Analytics | `tracking/GoogleAnalyticsTracker.tsx` | Page views, e-commerce events |
| TikTok Pixel | `tracking/TikTokPixelTracker.tsx` | Page views, conversions |

### Server-Side Tracking (Edge Functions)
| Function | Purpose |
|---|---|
| `facebook-capi` | FB Conversions API for purchase events (accurate attribution) |
| `google-analytics` | GA Measurement Protocol |
| `tiktok-events-api` | TikTok Events API |

### Facebook Pixel Hook Details (`useFacebookPixel.ts`)
- Loads pixel config from `admin_settings` table
- Dynamically loads FB SDK script
- Advanced matching with user data (email, phone, external_id)
- Captures `fbclid` from URL for attribution
- Events: `trackPageView`, `trackViewContent`, `trackAddToCart`, `trackInitiateCheckout`, `trackPurchase`, `trackSearch`, `trackCompleteRegistration`

---

## 14. Deployment Configuration

### Netlify (`netlify.toml`)
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel (`vercel.json`)
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Build Commands
```bash
npm run build    # vite build → outputs to dist/
npm run dev      # vite dev server on :8080
npm run lint     # eslint
```

---

## 15. Step-by-Step Replication Guide

### Phase 1: Project Initialization
```bash
# 1. Create Vite + React + TypeScript project
npm create vite@latest my-ecommerce -- --template react-swc-ts
cd my-ecommerce

# 2. Install core dependencies
npm install react-router-dom @reduxjs/toolkit react-redux @tanstack/react-query
npm install @supabase/supabase-js
npm install framer-motion recharts embla-carousel-react
npm install sonner lucide-react
npm install class-variance-authority clsx tailwind-merge

# 3. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate
npx tailwindcss init -p

# 4. Initialize shadcn/ui
npx shadcn@latest init
# Choose: New York style, Neutral base color

# 5. Add all shadcn/ui components
npx shadcn@latest add accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar card carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu form hover-card input input-otp label menubar navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner switch table tabs textarea toast toaster toggle toggle-group tooltip
```

### Phase 2: Configuration
1. Copy `vite.config.ts` — set path alias `@` → `./src`
2. Copy `tailwind.config.ts` — add Bengali fonts, color palette, animations
3. Copy `tsconfig.json` / `tsconfig.app.json` — set path aliases
4. Copy `index.html` — add Google Fonts link tags, meta tags
5. Create `.env` with your Supabase credentials
6. Copy `components.json` for shadcn/ui

### Phase 3: Supabase Setup
1. Create Supabase project
2. Run the migration SQL to create all 18+ tables
3. Set up RLS policies as defined in migration
4. Deploy all 13 edge functions (`supabase functions deploy`)
5. Configure admin_settings entries for site name, logo, tracking pixel IDs, courier API keys

### Phase 4: Core Application Structure
1. **Create `src/types/index.ts`** — all 10 interfaces
2. **Create `src/lib/utils.ts`** — `cn()` utility
3. **Create `src/integrations/supabase/client.ts`** — Supabase client init
4. **Create `src/store/`** — store.ts, hooks.ts, 4 slice files
5. **Create `src/hooks/`** — useAuth.tsx, useFacebookPixel.ts, use-mobile.tsx, use-toast.ts
6. **Create `src/services/`** — productService.ts, orderService.ts, adminService.ts
7. **Create `src/index.css`** — full theming system with CSS variables

### Phase 5: Components
1. **Layout**: Header (sticky, dynamic logo, cart badge, mobile menu), Footer (4-col grid, Bengali text), HeroBanner
2. **Cart**: CartDrawer (framer-motion slide-out)
3. **Products**: Product cards, product grid
4. **Checkout**: Checkout form with shipping zones (inside/outside Dhaka)
5. **Admin**: AdminLayout with sidebar, all 23 admin pages
6. **Tracking**: 3 pixel tracker components
7. **Landing Builder**: 12 components for dynamic landing pages
8. **Utility**: FaviconLoader, NavLink, SocialChatWidget

### Phase 6: Pages
1. **FashionHomePage** — Hero slider, featured products, categories, new arrivals
2. **ProductsPage** — Grid with filters, category sidebar, sorting
3. **ProductDetailPage** — Image gallery, variations, add to cart, reviews, wishlist
4. **CartPage** — Full cart with quantity controls
5. **CheckoutPage** — Shipping form, order summary, COD payment, variation handling
6. **OrderConfirmationPage** — Success page with order details
7. **AuthPage** — Login/Register forms
8. **MyAccountPage** — Order history, profile management
9. **All landing pages** — Product-specific marketing pages
10. **Admin pages** — Full dashboard, CRUD for all entities

### Phase 7: App Entry Point
1. **`main.tsx`** — Render `App` into `#root`
2. **`App.tsx`** — Set up provider hierarchy (QueryClient → Redux → Auth → Router → Routes)
3. Add tracking components inside Router

### Phase 8: Deployment
1. Build: `npm run build`
2. Deploy `dist/` to Netlify or Vercel
3. Set env vars in hosting platform
4. Deploy Supabase edge functions
5. Configure custom domain + SSL

---

## Key Design Decisions & Patterns

| Decision | Rationale |
|---|---|
| **Redux for cart/wishlist, React Query for server data** | Cart needs sync updates + localStorage; server data benefits from caching + refetching |
| **Guest checkout via Edge Function** | `place-order` uses service role key, allowing orders without authentication |
| **CSS variables for theming** | Easy to re-skin entire site by changing `:root` variables |
| **Bengali-first UI** | All user-facing text in Bengali, fonts optimized for Bengali script |
| **Variation-aware cart** | Products can have size/color variations with independent pricing |
| **Server-side tracking** | Edge functions for FB CAPI, GA, TikTok ensure accurate attribution |
| **Dynamic site settings** | `admin_settings` table stores logo, name, phone, pixel IDs — changeable without code deploy |
| **Landing page builder** | Database-driven landing pages for marketing campaigns |
| **Steadfast/Packzy courier** | Built-in Bangladesh courier integration with tracking |

---

> **End of Master Blueprint**  
> This document contains everything needed to recreate this e-commerce platform from scratch.
