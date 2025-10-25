# CLO Connect Store - React Assessment

A modern React TypeScript application for the CLO Virtual Fashion assessment, implementing a content store with filtering, search, and infinite scroll functionality.

## 🚀 Features

### Required Features ✅
- **Contents Filter** - Pricing options (Paid, Free, View Only) with multiple selection
- **Contents List** - Responsive grid system (4/3/2/1 columns based on screen size)
- **Keyword Search** - Real-time search in titles and creator names
- **Infinite Scroll** - Automatic loading of more content as user scrolls
- **Reset Functionality** - Reset button to restore default state
- **Persistence** - Filters and search persist across page reloads (URL-based, no browser storage)

### Optional Features ✅
- **Sorting Implementation** - Sort by Item Name, Higher Price, Lower Price
- **Pricing Slider** - Range slider (0-999) that activates with Paid option
- **Skeleton UI** - Loading states for infinite scroll
- **TypeScript** - Full TypeScript implementation
- **Test Code** - Unit tests for components and utilities

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server

### State Management
- **Redux Toolkit** - Predictable state container with RTK Query
- **React Query (@tanstack/react-query)** - Server state management and caching

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Dark Theme** - Matching the CLO-SET design requirements

### HTTP Client
- **Axios** - Promise-based HTTP client with interceptors

### Testing
- **Vitest** - Fast unit test framework
- **React Testing Library** - Simple and complete testing utilities

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **React Intersection Observer** - Infinite scroll implementation

## 📦 Package Explanations

### Why These Packages?

**Redux Toolkit** - Chosen over plain Redux for:
- Simplified boilerplate with `createSlice`
- Built-in `createAsyncThunk` for API calls (similar to Pinia actions)
- Excellent TypeScript support
- DevTools integration

**React Query** - Chosen for:
- Automatic caching and background updates
- Loading and error states
- Optimistic updates
- Better UX than manual state management

**Axios** - Chosen over fetch for:
- Request/response interceptors
- Automatic JSON parsing
- Request cancellation (important for infinite scroll)
- Better error handling
- Built-in timeout support

**Tailwind CSS** - Chosen for:
- Rapid UI development
- Consistent design system
- Responsive design utilities
- Dark theme support

**Vite** - Chosen over Create React App for:
- Faster development server
- Better TypeScript support
- Modern build tooling
- Smaller bundle sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 22+ (recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clo-connect-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix      # Fix ESLint issues
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── features/           # Feature-based organization
│   ├── store/         # Store-related components & logic
│   └── shared/        # Shared components
├── hooks/             # Custom hooks
│   ├── useInfiniteScroll.ts
│   └── usePersistence.ts
├── services/          # API services
│   └── api.ts
├── store/             # Redux store
│   ├── index.ts
│   └── slices/
│       ├── storeSlice.ts
│       └── filterSlice.ts
├── types/             # TypeScript type definitions
│   └── index.ts
└── utils/             # Utility functions
```

## 🔧 Key Features Implementation

### Infinite Scroll
- Uses `react-intersection-observer` for scroll detection
- Automatic pagination with 20 items per page
- Loading states and end-of-results detection

### Persistence
- URL-based persistence (no browser storage)
- Shareable URLs with filter states
- Automatic restoration on page reload

### Filtering System
- Combined pricing + keyword + price range filtering
- Real-time updates
- Multiple pricing option selection

### Responsive Design
- 4 columns (desktop)
- 3 columns (tablet)
- 2 columns (mobile)
- 1 column (small mobile)

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📱 API Integration

The application integrates with the CLO-SET API:
- **Endpoint**: `https://closet-recruiting-api.azurewebsites.net/api/data`
- **Data Structure**: Items with id, creator, title, pricingOption, imagePath, price
- **Pagination**: Simulated on frontend (API returns all items)

## 🎨 Design System

### Colors
- **Dark Background**: `#1a1a1a`
- **Dark Panel**: `#2a2a2a`
- **Accent Green**: `#00ff88`
- **Accent Blue**: `#00bfff`

### Typography
- **Font Family**: System UI, Avenir, Helvetica, Arial, sans-serif
- **Text Colors**: White, light gray for readability

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📝 Assessment Requirements

### ✅ Completed Requirements

**Required Features:**
- ✅ Contents Filter with pricing options
- ✅ Contents List with responsive grid
- ✅ Keyword search functionality
- ✅ Infinite scroll implementation
- ✅ Reset button functionality
- ✅ Persistence without browser storage

**Optional Features:**
- ✅ TypeScript implementation
- ✅ Sorting functionality
- ✅ Pricing slider
- ✅ Skeleton UI
- ✅ Test code

**Technical Requirements:**
- ✅ React.js with TypeScript
- ✅ State management library (Redux Toolkit)
- ✅ CSS-in-JS (Tailwind CSS)
- ✅ Test code libraries (Vitest + RTL)
- ✅ Local environment setup
- ✅ Git version control
- ✅ API integration
- ✅ Design resemblance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the CLO Virtual Fashion assessment.