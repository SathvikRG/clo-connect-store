# CLO Connect Store

A modern, responsive React TypeScript application for the CLO Virtual Fashion assessment. This application implements a content store with advanced filtering, real-time search, and infinite scroll functionality.

## 🎯 Project Overview

This project demonstrates a fully-featured content store application built with modern React and TypeScript. It includes state management, API integration, responsive design, and comprehensive test coverage.

## ✨ Features

### Core Features
- **🔍 Advanced Search** - Real-time keyword search across item titles and creator names
- **🎚️ Multi-Filter System** - Filter by pricing options (Paid, Free, View Only) with multi-select capability
- **💰 Price Range Slider** - Dynamic price filtering (0-999) activated with Paid option selection
- **📊 Sort Options** - Sort by Item Name, Higher Price, or Lower Price
- **♾️ Infinite Scroll** - Automatic pagination with 20 items per page and loading states
- **🔄 Reset Functionality** - One-click reset button to restore default filter state
- **💾 URL Persistence** - All filters persist in URL parameters for shareable links and page reload
- **📱 Responsive Design** - Optimized grid layout (4/3/2/1 columns based on screen size)
- **⚡ Loading States** - Skeleton UI for initial load and loading indicators for pagination
- **🎨 Dark Theme** - Custom Material-UI theme matching CLO-SET design requirements

### Technical Features
- **✅ TypeScript** - Full type safety throughout the application
- **✅ Test Coverage** - 87 unit tests with 92.89% code coverage
- **✅ Error Handling** - Graceful error handling with user-friendly messages
- **✅ Image Fallback** - Automatic placeholder for failed image loads
- **✅ Accessible UI** - Material-UI components with proper ARIA labels

## 🛠️ Tech Stack

### Core
- **React 19.1** - Latest React with hooks and Suspense
- **TypeScript 5.9** - Type safety and enhanced DX
- **Vite 7.1** - Lightning-fast build tool and dev server

### UI & Styling
- **Material-UI (MUI) 7.3** - Component library with theming
- **Emotion** - CSS-in-JS styling solution
- **Custom Dark Theme** - Dark mode with accent colors

### State Management
- **Redux Toolkit 2.9** - Centralized state management
- **React Redux 9.2** - React bindings for Redux
- **Async Thunks** - Side effect management for API calls

### Data Fetching & HTTP
- **Axios 1.12** - Promise-based HTTP client with interceptors
- **Request/Response Interceptors** - Error handling and request transformation

### Infinite Scroll
- **React Intersection Observer** - Efficient scroll detection without performance impact

### Testing
- **Vitest 4.0** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **Coverage** - v8 coverage provider

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Prettier** - Automatic code formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js 22.0.0+** (required)
- **npm** or **yarn** package manager

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

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload on file changes

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally

# Testing
npm test            # Run all tests with coverage report
npm run lint        # Run ESLint to check code quality
```

## 📁 Project Structure

```
clo-connect-store/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── components/         # React components
│   │   ├── ContentGrid.tsx      # Grid layout with infinite scroll
│   │   ├── Header.tsx           # App header component
│   │   └── SearchAndFilters.tsx # Search and filter controls
│   ├── hooks/              # Custom React hooks
│   │   ├── useInfiniteScroll.ts  # Infinite scroll logic
│   │   └── usePersistence.ts      # URL persistence logic
│   ├── services/           # API layer
│   │   └── api.ts              # Axios instance and API methods
│   ├── store/              # Redux store
│   │   ├── index.ts            # Store configuration
│   │   └── slices/
│   │       ├── filterSlice.ts   # Filter state management
│   │       └── storeSlice.ts    # Store state management
│   ├── test/               # Test files
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── store/slices/
│   ├── theme/              # Material-UI theme
│   │   └── index.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── views/              # Page components
│   │   └── StorePage.tsx
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── coverage/               # Test coverage reports
├── package.json
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
└── README.md
```

## 🎨 Design System

### Color Palette
- **Background Default**: Dark (#1a1a1a)
- **Background Paper**: Darker gray (#2a2a2a)
- **Header Background**: Pure black (#000000)
- **Primary**: Neutral gray (#666666) - used for borders and inputs
- **Secondary**: Accent blue (#00bfff)
- **Text Primary**: White (#ffffff)
- **Text Secondary**: Light gray (#cccccc)
- **Accent Color**: Sky blue (#87CEEB) - used in pricing displays

### Typography
- **Font Family**: System UI, Avenir, Helvetica, Arial, sans-serif
- **Sizes**: Responsive typography scale from Material-UI theme

### Components
- **Cards**: Elevated cards with hover effects
- **Grid**: Responsive grid with 4/3/2/1 columns
- **Buttons**: Icon buttons with consistent styling
- **Inputs**: Text fields with proper labeling
- **Sliders**: Range sliders with value indicators

## 🔧 Key Implementations

### Infinite Scroll
- Uses `react-intersection-observer` for efficient scroll detection
- Automatically loads next page when user reaches bottom
- Loading spinner shows during data fetch
- End-of-results indicator when no more items available

### State Management
- **Redux Toolkit** for global state
- Two main slices:
  - `storeSlice`: Items, filtered items, UI state, pagination
  - `filterSlice`: Search, filters, sort options, price range
- Async thunks for API calls with loading/error states

### URL Persistence
- Filters saved as URL search parameters
- Shareable URLs preserve filter state
- Automatic restoration on page reload
- No browser storage needed (privacy-friendly)

### Filtering System
- **Pricing Filters**: Multiple selection with Paid/Free/View Only
- **Keyword Search**: Real-time search in titles and creator names
- **Price Range**: Dynamic slider (0-999) for paid items
- **Sort Options**: Item name, higher/lower price
- **Combined Logic**: All filters work together seamlessly

### API Integration
- **Endpoint**: `https://closet-recruiting-api.azurewebsites.net/api/data`
- **Structure**: JSON array with id, creator, title, pricingOption, imagePath, price
- **Pagination**: Frontend pagination (simulated with limit/page)
- **Error Handling**: Graceful error messages with retry options
- **Interceptors**: Request/response interceptors for error handling

### Responsive Design
- **Desktop (xl)**: 4 columns
- **Tablet (lg)**: 3 columns
- **Mobile (md)**: 2 columns
- **Small Mobile (sm)**: 1 column
- Breakpoints from Material-UI grid system

## 🧪 Testing

### Test Coverage
- **Total Tests**: 87 passing unit tests
- **Coverage**: 92.89% statements, 92.69% lines
- **Test Files**: 7 test suites covering:
  - Components (ContentGrid, SearchAndFilters)
  - Hooks (useInfiniteScroll, usePersistence)
  - Store slices (filterSlice, storeSlice)
  - Services (api)

### Running Tests
```bash
npm test                    # Run tests once with coverage
```

### Test Strategy
- **Component Tests**: Testing user interactions and rendering
- **Hook Tests**: Testing custom hook behavior with React Hooks Testing Library
- **Slice Tests**: Testing Redux reducers and async thunks
- **Service Tests**: Testing API integration and error handling
- **Integration**: Testing component interactions with Redux store

## 📦 Dependencies Explainedage

### Why These Choices?

**Material-UI over Tailwind**
- Provides pre-built, accessible components
- Consistent design system with theming
- Better for complex UI with dialogs, sliders, cards
- Built-in responsive grid system
- Excellent TypeScript support

**Redux Toolkit over Context API**
- Better for complex state with multiple slices
- Excellent DevTools for debugging
- Async thunks for API calls (similar to Pinia actions)
- Normalized state management
- Time-travel debugging

**Axios over Fetch**
- Request/response interceptors
- Automatic JSON parsing
- Better error handling
- Request cancellation support
- Built-in timeout configuration

**Vite over Create React App**
- 10x faster development server
- Instant HMR (Hot Module Replacement)
- Better TypeScript support
- Modern ES modules
- Smaller production bundles

**Vitest over Jest**
- Faster execution
- Native ESM support
- Better Vite integration
- Coverage v8 provider
- Vue/React optimized

**React Intersection Observer**
- Efficient scroll detection
- No performance impact
- Native browser API
- Minimal bundle size

## 🚀 Deployment

### GitHub Pages Deployment (Automated)

This project is set up for automatic deployment to GitHub Pages:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the changes

3. **Your site will be available at:**
   ```
   https://yourusername.github.io/clo-connect-store/
   ```

The deployment happens automatically on every push to the `main` branch via GitHub Actions.

### Manual Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` directory.

### Build Output
- Minified JavaScript bundles
- Compressed CSS
- Tree-shaken dependencies
- Source maps for debugging
- Optimized asset paths

### Other Deployment Options
- **Vercel**: Zero-config deployment with `vercel` CLI
- **Netlify**: Drag-and-drop or Git integration
- **Azure Static Web Apps**: Microsoft cloud hosting
- **AWS S3 + CloudFront**: Scalable cloud hosting

### Production Checklist
- ✅ Build completes without errors
- ✅ All tests pass
- ✅ No console errors
- ✅ Performance audit passed
- ✅ Lighthouse score > 90

## 🐛 Troubleshooting

### Common Issues

**Node Version Mismatch**
```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
```

**Dependencies Installation Failed**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port Already in Use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Type Errors**
```bash
npm run lint
```

## 📋 Assessment Requirements Check

### ✅ Required Features
- ✅ Contents Filter (Paid, Free, View Only)
- ✅ Contents List with responsive grid
- ✅ Keyword search functionality
- ✅ Infinite scroll implementation
- ✅ Reset button functionality
- ✅ URL-based persistence (no browser storage)

### ✅ Optional Features
- ✅ TypeScript implementation
- ✅ Sorting (by name, price)
- ✅ Price range slider
- ✅ Skeleton loading UI
- ✅ Comprehensive test coverage

### ✅ Technical Requirements
- ✅ React.js with TypeScript
- ✅ State management (Redux Toolkit)
- ✅ UI library (Material-UI)
- ✅ Testing (Vitest + RTL)
- ✅ Local development setup
- ✅ Git version control
- ✅ API integration
- ✅ Design resemblance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of the CLO Virtual Fashion assessment.

## 👨‍💻 Author

Built for CLO Virtual Fashion Assessment

---

**Note**: This project requires Node.js 22.0.0 or higher. Make sure to use the correct Node version before running installation or scripts.