# Flat Finder

A modern, responsive web application for finding and managing rental properties. Built with React, TypeScript, and TanStack technologies.

## 🏠 Features

- **Property Discovery**: Browse available rental properties with detailed information
- **Property Management**: Add new properties with comprehensive details including images
- **Favorites System**: Save and manage your favorite properties
- **Location Filtering**: Filter properties by specific areas in Bangalore (BTM Layout, Bellandur, HSR Layout, Koramangala, Marathahalli)
- **Search Functionality**: Fuzzy search through property names
- **Responsive Design**: Optimized for mobile and desktop experiences
- **PWA Support**: Progressive Web App with offline capabilities
- **Authentication**: Google OAuth integration for user management
- **Real-time Updates**: Live property updates and notifications

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI framework
- **TypeScript** - Type safety
- **TanStack Router** - File-based routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **Vite** - Build tool and dev server

### Backend Integration

- **tRPC** - Type-safe API client
- **Better Auth** - Authentication system
- **UploadThing** - File upload service

### Additional Features

- **PWA** - Progressive Web App capabilities
- **Offline Support** - Service worker for offline functionality
- **Theme Support** - Dark/light mode
- **Form Validation** - Zod schema validation
- **Toast Notifications** - User feedback system

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sadiksaifi/monorepo.git
   cd apps/flat-finder
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:5174`

## 📱 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Run Prettier
pnpm typecheck    # Run TypeScript type checking

# UI Components
pnpm ui           # Open shadcn/ui CLI
```

## 🎨 Key Features Explained

### Property Management

- **Add Properties**: Comprehensive form with validation for property details, owner information, pricing, and media uploads
- **Property Details**: Rich property pages with image carousels, contact information, and location details
- **Favorites**: Toggle favorite properties with persistent storage

### Search & Filtering

- **Fuzzy Search**: Real-time search through property names using FZF algorithm
- **Location Filtering**: Filter by specific Bangalore areas
- **Tab Navigation**: Switch between "All" and "Favorites" views

### User Experience

- **Responsive Header**: Dynamic header with search, navigation, and actions
- **Offline Support**: Graceful handling of network connectivity issues
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Comprehensive error messages and recovery options

### PWA Features

- **Service Worker**: Caches assets and API responses for offline use
- **App Manifest**: Installable as a native app
- **Update Prompts**: Notifies users of available updates

## 🔧 Configuration

### Environment Variables

- `VITE_BACKEND_URL`: Backend API URL (default: `http://localhost:3000`)

### PWA Configuration

The PWA is configured in `vite.config.ts` with:

- Custom caching strategies for different resource types
- UploadThing integration for media caching
- Offline-first approach for better user experience

## 🚀 Deployment

### Production Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

The built application will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation in the codebase
- Review the TanStack documentation for routing and query patterns

---

Built with ❤️ using modern web technologies
