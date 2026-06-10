# 🛒 FreshBasket E-Commerce

### A Modern Next.js E-Commerce Platform for Organic & Fresh Grocery Shopping

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

> 🌱 A fully responsive grocery and organic food e-commerce frontend built with Next.js App Router, TypeScript, and Tailwind CSS.

<p align="center">
  <a href="https://fresh-basket-ecommerce.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-brightgreen?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
  </a>
  <a href="https://santhosh-vs-portfolio.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Portfolio-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio">
  </a>
  <a href="https://github.com/Itssanthoshhere/FreshBasket-Ecommerce" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

# 📋 Table of Contents

- 👉 [About The Project](#about-the-project)
- 👉 [Features](#features)
- 👉 [Tech Stack](#-tech-stack)
- 👉 [Project Structure](#-project-structure)
- 👉 [Pages](#-pages-included)
- 👉 [Getting Started](#getting-started)
- 👉 [Future Improvements](#future-improvements)

---

# 📖 About The Project

FreshBasket is a modern grocery and organic food e-commerce platform designed to provide a seamless shopping experience for customers looking for fresh produce, healthy food products, and daily essentials.

The project focuses on:

- Clean UI/UX
- Responsive Design
- Component Reusability
- Dynamic Product Pages
- Category Browsing
- Product Discovery
- Shopping Experience Optimization

### Problem Solved

Traditional grocery websites often suffer from:

- Poor user experience
- Cluttered layouts
- Slow performance
- Difficult navigation

FreshBasket aims to solve these problems through:

- Modern responsive layouts
- Organized product categorization
- Optimized image handling
- Clean shopping workflow

---

# ✨ Features

## 🏠 Home Page

- Hero banners
- Promotional offers
- Organic product highlights
- Trending products section
- Best-selling products section
- Featured categories

## 🛍️ Product Catalog

- Dynamic product pages
- Product cards
- Product images
- Product details
- Pricing information

## 📂 Category Browsing

- Organic categories
- Product collections
- Category-based filtering

## 📖 Blog Section

- Blog listing page
- Blog detail pages
- Educational content
- Organic lifestyle articles

## 👥 About Page

- Company story
- Mission & vision
- Team showcase
- Service highlights

## 📞 Contact Page

- Contact information
- Social media links
- Google Maps integration
- Contact form

## ❓ FAQ Section

- Shopping information
- Returns & exchanges
- Payment information
- Expandable accordion UI

## 🚫 Custom 404 Page

- Friendly error page
- Continue shopping CTA

## 📱 Responsive Design

- Mobile-first design
- Tablet optimized
- Desktop optimized
- Cross-browser support

---

# 🛠️ Tech Stack

| Category           | Technology      |
| ------------------ | --------------- |
| Framework          | Next.js 15      |
| Language           | TypeScript      |
| UI Library         | React 19        |
| Styling            | Tailwind CSS 4  |
| Icons              | Bootstrap Icons |
| Carousel           | Swiper.js       |
| Notifications      | React Hot Toast |
| Image Optimization | Next.js Image   |
| Build Tool         | Turbopack       |

---

# 🏗️ Project Structure

```bash
FreshBasket-ecommerce/
│
├── app/
│   ├── Components/
│   │   ├── Navbar/
│   │   └── Footer/
│   │
│   ├── JsonData/
│   │   ├── BlogsData.json
│   │   ├── OrganicProducts.json
│   │   ├── RecentlyProducts.json
│   │   ├── TopProducts.json
│   │   ├── TopSelling.json
│   │   └── TrendingProducts.json
│   │
│   ├── UI-Components/
│   │   └── Pages/
│   │       ├── Home
│   │       ├── Shop
│   │       ├── About
│   │       ├── Contact
│   │       ├── FAQ
│   │       ├── Blog
│   │       └── PageNotFound
│   │
│   ├── products/
│   │   └── [id]/
│   │
│   ├── page.tsx
│   ├── layout.tsx
│   └── not-found.tsx
│
├── public/
│   ├── OrganicProducts/
│   ├── TopSelling/
│   ├── Blog Images
│   ├── Category Images
│   ├── Team Images
│   ├── Banners
│   └── Product Assets
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

# 📄 Pages Included

### 🏠 Home

Landing page showcasing:

- Featured products
- Categories
- Promotions
- Best sellers

### 🛒 Shop

Browse products with:

- Product cards
- Pricing
- Product details

### 📦 Product Details

Dynamic routing:

```bash
/products/[id]
```

Displays:

- Product information
- Images
- Description
- Related products

### 👥 About

Includes:

- Story
- Team members
- Mission
- Vision

### 📞 Contact

Includes:

- Contact form
- Phone
- Email
- Address
- Map

### ❓ FAQ

Accordion-based:

- Shopping FAQs
- Returns FAQs
- Payment FAQs

### 🚫 404

Custom Not Found page with shopping redirect.

---

# ⚡ Performance Optimizations

### Next.js Image Optimization

```tsx
<Image src={image} alt="product" priority />
```

Benefits:

- Lazy loading
- Responsive sizing
- Automatic optimization

### WebP Images

Project extensively uses:

```bash
.webp
```

Benefits:

- Smaller file sizes
- Faster loading

### Static JSON Data

Current data source:

```bash
app/JsonData/*.json
```

Advantages:

- Fast rendering
- No API latency

---

# 🔐 Security Considerations

Current Project:

✅ Client-side safe

⚠️ Missing for production:

- Authentication
- Authorization
- Form validation
- Rate limiting
- Backend APIs
- Database security
- CSRF protection

---

# 🚀 Future Improvements

## E-Commerce Features

- Shopping Cart
- Wishlist
- Checkout Flow
- Order Management
- User Profiles

## Backend Integration

- Node.js API
- Express.js
- PostgreSQL
- MongoDB

## Authentication

- NextAuth
- Google Login
- Email Login

## Payments

- Razorpay
- Stripe
- PayPal

## Admin Dashboard

- Product Management
- Order Tracking
- Inventory Control
- Analytics

## SEO

- Dynamic Metadata
- Sitemap
- Open Graph Tags
- Structured Data

---

# 🧠 What I Learned

Through this project I explored:

- Next.js App Router
- TypeScript in React
- Dynamic Routing
- Reusable Components
- Tailwind CSS Architecture
- Responsive Design Principles
- E-Commerce UI Development
- State Management Patterns

---

### Connect With Me

- **GitHub**: [https://github.com/Itssanthoshhere](https://github.com/Itssanthoshhere)
- **LinkedIn**: [https://linkedin.com/in/thesanthoshvs](https://linkedin.com/in/thesanthoshvs)
- **Portfolio**: [https://santhosh-vs-portfolio.vercel.app](https://santhosh-vs-portfolio.vercel.app)

---

# 📜 License

This project is developed for:

- Educational Purposes
- Portfolio Showcase
- Learning Next.js
- Demonstrating Frontend Development Skills

---

<div align="center">

### ⭐ If you like this project, give it a star!

Built with ❤️ by Santhosh VS

</div>
