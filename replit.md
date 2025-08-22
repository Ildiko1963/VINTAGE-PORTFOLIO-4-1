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
- June 24, 2025. Restored "Ildikostyle Portfolio" title on main page hero section only
- June 24, 2025. Added "Ildikostyle Portfolio" back to IntroScreen (loading page)
- June 24, 2025. Updated background image paths to use local filmszalag_hatter.png from /static/ directory with inline styles
- June 24, 2025. Created clean filmstrip background without text for IntroScreen
- June 25, 2025. Applied clean filmstrip background to all pages with rotating shadow effect preserved
- June 25, 2025. Removed rotating shadow effects to match clean intro screen appearance
- June 25, 2025. Made all section backgrounds transparent for unified clean appearance
- June 25, 2025. Updated all text colors to golden (#D9BF77) to match "Ildikostyle Portfolio" visibility
- June 25, 2025. Made background image dynamic/scrolling with page content
- June 25, 2025. Fixed background size to auto and repeat pattern to match intro screen appearance
- June 25, 2025. Removed film perforations and overlay, keeping clean background only
- June 25, 2025. Added brown section dividers between pages for better visual separation
- June 25, 2025. Made separator lines much thicker (20px) for complete page separation
- June 27, 2025. Added black shadow strips to top and bottom of all main sections to match IntroScreen styling
- June 27, 2025. Added two new portfolio items with custom categories "Tervek" and "publikációk" using big_nappalifalnezet2.jpg and big_otthon.jpg
- June 27, 2025. Updated portfolio hover descriptions: Modern Family Home shows "Commercial building with attic and apartment design", Traditional Elegance shows "Ancient design", Living Room Design shows "Plans", Home Sweet Home shows "Publications"
- June 27, 2025. Added image gallery support to Bold Design portfolio item with 8 images: big_vakmero4.jpg (main), big_nappali2.jpg, big_nappali3.jpg, big_nappali4.jpg, big_nappali6.jpg, big_napteto.jpg, big_rfurdo.jpg, big_rkonyha.jpg
- June 27, 2025. Updated "Living Room Design" to "Plans" with 16 architectural images and floor plans
- June 27, 2025. Created portfolio detail page with full-screen image gallery and navigation
- June 27, 2025. Fixed image display issues by changing from object-cover to object-contain to prevent cropping
- June 27, 2025. Updated portfolio card layout with proper centering and background containers
- June 27, 2025. Changed "Home Sweet Home" to "Publications" with big_otthon2.jpg as main image and 3 additional images
- June 27, 2025. Added fullscreen zoom functionality to portfolio images with click-to-zoom and navigation
- June 27, 2025. Added 4 additional images to Provence Style portfolio: big_myaraloterasz.jpg.jpg, big_nyaralo2.jpg, big_nyaralokert.jpg, big_nyaralonappali.jpg
- June 27, 2025. Added 2 images to Historic Renovation portfolio: big_laktanya.jpg, big_furdo2.jpg
- June 27, 2025. Added 1 image to Ancient design portfolio: big_zebra.jpg
- June 27, 2025. Updated About section with Ildikó's portrait (23358_ildiko.jpg) replacing placeholder image
- June 27, 2025. Added two small gallery images to Contact section: 23358_pic02.jpg, 23358_pic03.jpg under "Recent Work"
- June 27, 2025. Updated main page filmstrip with interior design images: big_laktanya.jpg, big_nappali_falnezet2.jpg, big_nappali2.jpg, big_nappali3.jpg, big_nappali4.jpg, big_nappali6.jpg
- June 27, 2025. Updated Services section with interior design categories: Design, Construction, Consulting
- June 27, 2025. Enlarged Contact section gallery images from 24x24 to 36x36 pixels (1.5x larger)
- June 27, 2025. Updated Contact information with Hungarian address (2900 Komárom, Igmándi út 27.) and phone (+36209220239) and email (jonathan5@t-online.hu)
- June 27, 2025. Removed Working Hours section from Contact page
- June 27, 2025. Updated contact form subject dropdown with interior design options: Design, Construction, Consulting
- June 27, 2025. Removed "Recent Work" heading from Contact section gallery images
- June 27, 2025. Removed professional specialties section from About page (Photography, Cinematography, Visual Design)
- June 27, 2025. Updated About section with Ildikó's personal introduction and interior design philosophy in Hungarian
- June 27, 2025. Added "Magyarország" to Studio Location in Contact section

## User Preferences

Preferred communication style: Simple, everyday language.