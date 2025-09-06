# 🎓 EduConnect - Modern College Management Platform

<div align="center">

![EduConnect Logo](https://img.shields.io/badge/EduConnect-College%20Platform-blue?style=for-the-badge&logo=graduation-cap)

**A comprehensive, full-stack college management platform built with modern web technologies**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.19.0-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.15.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.9.0-purple?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)

[Live Demo](https://edu-connect-orcin-nine.vercel.app/) • [GitHub Repository](https://github.com/nazmul162001/EduConnect)

</div>

---

## 🎯 Overview

**EduConnect** is a modern, full-stack college management platform designed to streamline the college application process and enhance the educational experience. Built with cutting-edge technologies, it provides a seamless interface for students to discover colleges, manage applications, and share experiences.

### 🎯 **Project Goals**

- **Simplify College Discovery**: Help students find the perfect college match
- **Streamline Applications**: Digitalize and automate the admission process
- **Foster Community**: Enable students to share experiences and reviews
- **Modern UX**: Provide an intuitive, responsive, and engaging user experience

---

## ✨ Features

### 🔐 **Authentication & User Management**

- **Dual Authentication System**: JWT tokens for manual login + NextAuth for OAuth
- **Social Login**: Google and GitHub integration
- **Secure Session Management**: Persistent sessions with automatic refresh
- **Profile Management**: Comprehensive user profiles with address and academic info

### 🏫 **College Management**

- **College Discovery**: Browse and search through comprehensive college database
- **Detailed College Pages**: Rich information including ratings, location, and contact details
- **Image Management**: High-quality college images with fallback mechanisms

### 📝 **Admission System**

- **Digital Applications**: Complete online admission form with validation
- **Application Tracking**: Real-time progress tracking with visual indicators
- **Status Updates**: Application status management
- **Application History**: Complete history of all submitted applications

### 📊 **Dashboard & Analytics**

- **Personal Dashboard**: Comprehensive "My College" dashboard
- **Progress Tracking**: Visual progress indicators for applications
- **Quick Actions**: Easy access to common tasks

### ⭐ **Review & Rating System**

- **Student Reviews**: Comprehensive review system with ratings
- **Experience Sharing**: Students can share their application experiences
- **University Integration**: Reviews linked to specific universities

### 🎨 **Modern UI/UX**

- **Responsive Design**: Mobile-first approach with perfect mobile experience
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Glassmorphism Design**: Modern glassmorphism UI elements
- **Loading States**: Comprehensive loading states and skeleton screens

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **State Management**: Redux Toolkit + RTK Query
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: SweetAlert2

### **Backend**

- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: MongoDB 6.19.0
- **ORM**: Prisma 6.15.0
- **Authentication**: NextAuth.js + JWT
- **Validation**: Zod schemas
- **Security**: bcryptjs for password hashing

### **Development Tools**

- **Package Manager**: Yarn
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Database GUI**: Prisma Studio
- **Version Control**: Git

---

## 🏗️ Architecture

### **Clean Architecture Principles**

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── (pages)/           # Page Components
│   └── globals.css        # Global Styles
├── components/            # Reusable UI Components
│   ├── auth/             # Authentication Components
│   ├── home/             # Home Page Components
│   ├── layout/           # Layout Components
│   └── ui/               # Base UI Components
├── lib/                   # Utility Libraries
├── hooks/                 # Custom React Hooks
├── redux/                 # State Management
├── types/                 # TypeScript Definitions
└── utils/                 # Helper Functions
```

### **State Management Architecture**

- **Redux Toolkit**: Centralized state management
- **RTK Query**: Efficient data fetching and caching
- **Optimistic Updates**: Immediate UI updates with rollback capability
- **Cache Invalidation**: Smart cache management for data consistency

---

## 📁 Project Structure

### **Clean Architecture Overview**

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── (pages)/           # Page Components
│   └── globals.css        # Global Styles
├── components/            # Reusable UI Components
│   ├── auth/             # Authentication Components
│   ├── home/             # Home Page Components
│   ├── layout/           # Layout Components
│   └── ui/               # Base UI Components
├── lib/                   # Utility Libraries
├── hooks/                 # Custom React Hooks
├── redux/                 # State Management
├── types/                 # TypeScript Definitions
└── utils/                 # Helper Functions
```

### **Detailed Folder Structure**

```
edu-connect/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 api/               # API Routes
│   │   │   ├── 📁 auth/          # Authentication APIs
│   │   │   ├── 📁 admissions/    # Admission APIs
│   │   │   ├── 📁 colleges/      # College APIs
│   │   │   └── 📁 reviews/       # Review APIs
│   │   ├── 📁 admission/         # Admission Page
│   │   ├── 📁 colleges/          # College Pages
│   │   ├── 📁 my-college/        # Dashboard Page
│   │   ├── 📁 profile/           # Profile Page
│   │   └── 📄 layout.tsx         # Root Layout
│   ├── 📁 components/            # Reusable Components
│   │   ├── 📁 auth/              # Auth Components
│   │   ├── 📁 home/              # Home Page Components
│   │   ├── 📁 layout/            # Layout Components
│   │   ├── 📁 my-college/        # Dashboard Components
│   │   └── 📁 ui/                # Base UI Components
│   ├── 📁 lib/                   # Utility Libraries
│   ├── 📁 hooks/                 # Custom Hooks
│   ├── 📁 redux/                 # State Management
│   ├── 📁 types/                 # TypeScript Types
│   └── 📁 utils/                 # Helper Functions
├── 📁 prisma/                    # Database Schema
├── 📁 public/                    # Static Assets
└── 📄 package.json               # Dependencies
```

---

## 🔐 Authentication

### **Dual Authentication System**

**1. JWT Authentication (Manual Login)**

```typescript
// Secure JWT token generation
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});
```

**2. NextAuth.js (OAuth)**

```typescript
// Google & GitHub OAuth providers
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
];
```

### **Security Features**

- ✅ Password hashing with bcryptjs
- ✅ JWT token expiration
- ✅ CSRF protection
- ✅ Secure session management
- ✅ Input validation with Zod
- ✅ SQL injection prevention

---

## 🎨 UI/UX Features

### **Design System**

- **Color Palette**: Modern gradient-based color scheme
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing system
- **Components**: Reusable, accessible components

### **Interactive Elements**

- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Skeleton screens and spinners
- **Hover Effects**: Subtle hover animations
- **Form Validation**: Real-time validation feedback

### **Responsive Breakpoints**

```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

---

## 🔧 API Endpoints

### **Authentication APIs**

```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
GET  /api/auth/me          # Get current user
PATCH /api/auth/update-profile # Update user profile
```

### **College APIs**

```
GET /api/colleges          # Get all colleges
GET /api/colleges/[id]     # Get college by ID
```

### **Admission APIs**

```
POST /api/admissions       # Create admission
GET  /api/admissions       # Get user admissions
PUT  /api/admissions/[id]  # Update admission
```

### **Review APIs**

```
GET  /api/reviews          # Get reviews
POST /api/reviews          # Create review
```

---

## 📱 Responsive Design

### **Mobile-First Approach**

- ✅ **Mobile**: Optimized for smartphones (320px+)
- ✅ **Tablet**: Enhanced experience for tablets (768px+)
- ✅ **Desktop**: Full-featured desktop experience (1024px+)
- ✅ **Large Screens**: Optimized for large displays (1280px+)

### **Performance Optimizations**

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting by Next.js
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Aggressive caching strategies

---

## 📈 Performance

### **Optimization Strategies**

- **Server-Side Rendering**: Fast initial page loads
- **Static Generation**: Pre-built pages for better performance
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Lazy loading of components
- **Caching**: Efficient caching strategies

---

## 🚀 Deployment

### **Hosting & Database**

- **Frontend**: Hosted on Vercel
- **Database**: MongoDB Atlas (Cloud)
- **Domain**: [https://edu-connect-orcin-nine.vercel.app/](https://edu-connect-orcin-nine.vercel.app/)

### **Production Build**

```bash
yarn build
yarn start
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Nazmul Hassan](https://github.com/nazmul162001)

</div>
