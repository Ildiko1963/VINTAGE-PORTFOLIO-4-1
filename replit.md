# replit.md

## Overview

This is a vintage-themed film portfolio application built with a full-stack architecture. The application features a cinematic user experience with a retro film aesthetic, including background music, projector sounds, and vintage visual effects. It serves as a portfolio showcase platform with sections for about, portfolio items, services, and contact functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom vintage theme colors and animations
- **UI Components**: Radix UI components with shadcn/ui design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions and effects

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas shared between client and server
- **Session Storage**: In-memory storage with fallback to database

### Design System
- **Theme**: Professional vintage film aesthetic with warm brown and gold color palette
- **Typography**: Google Fonts (Playfair Display, Lora, Special Elite)
- **Icons**: Font Awesome for consistent iconography
- **Responsive**: Mobile-first responsive design

## Key Components

### Audio System
- Native HTML5 Audio implementation for browser compatibility
- Background music and projector sound effects
- Audio controls with volume adjustment and mute functionality
- User interaction-based audio initialization to comply with browser policies

### Portfolio Management
- Dynamic portfolio item display with image galleries
- Category-based filtering and organization
- Full CRUD operations for portfolio items
- Image URL validation and display optimization

### Contact System
- Contact form with validation using Zod schemas
- Email integration capability
- Form submission tracking and error handling

### Visual Effects
- Film strip perforations and vintage overlays
- Typewriter text animations
- Projector light effects and rotations
- Background image switching based on routes

## Data Flow

### Client-Server Communication
1. React Query handles all API calls with caching and error handling
2. REST API endpoints follow RESTful conventions (`/api/portfolio`, `/api/services`, `/api/contact`)
3. Shared TypeScript schemas ensure type safety across the full stack
4. Zod validation on both client and server prevents invalid data

### Database Schema
- **Users**: Authentication and user management
- **Portfolio Items**: Project showcases with images, descriptions, and categories
- **Services**: Service offerings with features and descriptions
- **Contact Forms**: Message submissions from visitors

### Storage Strategy
- Development: In-memory storage with sample data
- Production: PostgreSQL database via Drizzle ORM
- Image storage: External URLs (ready for CDN integration)

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database queries and migrations
- **framer-motion**: Animation library for smooth interactions
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing solution

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette component

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type safety across the stack
- **tsx**: TypeScript execution for server
- **esbuild**: Fast bundling for production

## Deployment Strategy

### Development
- Vite dev server with hot module replacement
- Express server with middleware for API routes
- Concurrent client and server development
- TypeScript compilation and type checking

### Production Build
1. Vite builds optimized client bundle to `dist/public`
2. esbuild bundles server code to `dist/index.js`
3. Static assets served from Express in production
4. Environment-based configuration for database connections

### Replit Configuration
- Node.js 20 runtime environment
- Auto-scaling deployment target
- Port 5000 for development, port 80 for production
- Automatic package installation and server restart workflows

## Changelog

- June 24, 2025. Initial setup
- June 24, 2025. Updated branding to "Ildikostyle Portfolio" with interior design theme (completed all instances including IntroScreen and HTML title)
- June 24, 2025. Removed "Ildikostyle Portfolio" text from all pages, keeping only "interior design" subtitle

## User Preferences

Preferred communication style: Simple, everyday language.