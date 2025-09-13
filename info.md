# KalaSetu Codebase Information

## Overview

### Purpose of the codebase
KalaSetu is a web application designed to connect traditional Indian artisans with potential customers through an AI-powered digital marketplace. The platform aims to preserve traditional crafts while providing artisans with modern tools to reach global audiences.

### Target audience or users
- Traditional Indian artisans and craftspeople
- Customers interested in authentic handcrafted products
- Art enthusiasts and collectors
- Organizations supporting traditional crafts preservation

### High-level goals or objectives
- Bridge the gap between traditional artisans and modern digital commerce
- Preserve and promote traditional Indian crafts and cultural heritage
- Provide artisans with AI-enhanced tools to showcase their products
- Create a verified marketplace for authentic handcrafted items
- Connect customers directly with skilled craftspeople

## Architecture

### High-level architecture diagram
```
+----------------------------------+
|            KalaSetu              |
+----------------------------------+
|                                  |
|  +-------------+  +------------+ |
|  |   React     |  |  React     | |
|  |   Router    |<->|  Components| |
|  +-------------+  +------------+ |
|         ^                ^       |
|         |                |       |
|         v                v       |
|  +-------------+  +------------+ |
|  |   Data      |  |  UI        | |
|  |   Models    |  |  Library   | |
|  +-------------+  +------------+ |
|                                  |
+----------------------------------+
```

### Key components/modules and their relationships
1. **Layout Components**: Provide the overall structure (Navbar, Footer)
2. **Page Components**: Implement specific views (Home, Marketplace, Artisans, etc.)
3. **UI Components**: Reusable UI elements from Shadcn UI library
4. **Data Models**: Define structure for products and artisans
5. **Routing**: Manages navigation between different pages

### Design patterns or architectural styles used
- **Component-Based Architecture**: The application is built using React components
- **Atomic Design**: UI components are organized from atoms to organisms
- **Client-Side Routing**: Uses React Router for navigation
- **Responsive Design**: Adapts to different screen sizes using Tailwind CSS

## Directory Structure

```
├── public/                  # Static assets served directly
├── src/                     # Source code
│   ├── assets/              # Images and other static resources
│   ├── components/          # Reusable React components
│   │   ├── Layout/          # Layout components (Navbar, Footer)
│   │   └── ui/              # UI components from Shadcn UI
│   ├── data/                # Mock data and data models
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   ├── App.tsx              # Main application component
│   ├── App.css              # Global styles
│   ├── index.css            # Entry CSS file
│   └── main.tsx             # Application entry point
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
└── vite.config.ts           # Vite bundler configuration
```

## Key Files

- **src/main.tsx**: Entry point of the application
- **src/App.tsx**: Main component that sets up routing and providers
- **src/components/Layout/Layout.tsx**: Main layout structure with Navbar and Footer
- **src/data/mockData.ts**: Contains mock data models and sample data
- **package.json**: Lists all dependencies and scripts
- **tailwind.config.ts**: Configures Tailwind CSS with custom theme settings
- **vite.config.ts**: Configuration for the Vite build tool

## Dependencies

### Frontend Framework
- **React**: v18.3.1 - Core UI library
- **React DOM**: v18.3.1 - React rendering for web
- **React Router DOM**: v6.30.1 - Client-side routing

### UI Components and Styling
- **Tailwind CSS**: v3.4.17 - Utility-first CSS framework
- **Shadcn UI**: Collection of accessible UI components (via various @radix-ui packages)
- **Lucide React**: v0.462.0 - Icon library
- **class-variance-authority**: v0.7.1 - For creating variant components
- **clsx**: v2.1.1 - Utility for constructing className strings
- **tailwind-merge**: v2.6.0 - Merges Tailwind CSS classes without conflicts

### State Management and Data Fetching
- **@tanstack/react-query**: v5.83.0 - Data fetching and caching
- **react-hook-form**: v7.61.1 - Form handling
- **zod**: v3.25.76 - Schema validation

### Development Tools
- **TypeScript**: v5.8.3 - Static typing
- **Vite**: v5.4.19 - Build tool and development server
- **ESLint**: v9.32.0 - Code linting

## APIs/Endpoints

The application currently uses mock data instead of real API endpoints. In a production version, the following endpoints would likely be implemented:

- **GET /api/products**: Retrieve all products
- **GET /api/products/:id**: Retrieve a specific product
- **GET /api/artisans**: Retrieve all artisans
- **GET /api/artisans/:id**: Retrieve a specific artisan
- **POST /api/auth/login**: User authentication
- **POST /api/auth/register**: User registration

## Data Models

### Artisan
```typescript
interface Artisan {
  id: string;
  name: string;
  craftType: string;
  location: string;
  image: string;
  bio: string;
  experience: string;
  specialties: string[];
  sampleProducts: Product[];
}
```

### Product
```typescript
interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  gallery?: string[];
  description: string;
  aiDescription: string;
  artisanId: string;
  artisanName: string;
  authenticity: 'verified' | 'pending' | 'unverified';
  popularity: number;
}
```

## Workflow/Processes

### User Browsing Flow
1. User lands on the Home page
2. User can navigate to Marketplace or Artisans pages
3. On Marketplace page, user can:
   - Browse products
   - Filter by category
   - Sort by price or popularity
   - Search for specific products
4. On Artisans page, user can:
   - Browse artisans
   - Filter by craft type or region
   - Search for specific artisans
5. User can view detailed product information on the ProductDetail page
   - View product images
   - Read standard and AI-enhanced descriptions
   - Learn about the artisan who created the product

### Product Authentication Flow
Products can have one of three authentication statuses:
1. **Verified**: Product authenticity has been confirmed
2. **Pending**: Product is awaiting verification
3. **Unverified**: Product has not gone through verification process

## Configuration

### Configuration Files
- **vite.config.ts**: Configures the Vite build tool
- **tailwind.config.ts**: Configures Tailwind CSS with custom theme settings
- **tsconfig.json**: TypeScript configuration
- **eslint.config.js**: ESLint configuration for code linting

### Environment Variables
No environment variables are currently used in the application. In a production version, the following might be needed:
- `VITE_API_URL`: Base URL for API endpoints
- `VITE_AUTH_TOKEN`: Authentication token for API access

## Testing

No testing framework is currently implemented in the codebase. For a production application, the following would be recommended:

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **Cypress**: End-to-end testing

## Deployment

### Build Process
The application uses Vite for building. The following scripts are available:
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:dev`: Build for development
- `npm run preview`: Preview production build locally

### Prerequisites
- Node.js (version 16 or higher recommended)
- npm or yarn package manager

### Deployment Steps
1. Clone the repository
2. Install dependencies with `npm install`
3. Build the application with `npm run build`
4. Deploy the contents of the `dist` directory to a web server

## Known Issues/Limitations

- The application currently uses mock data instead of real API endpoints
- Authentication and user management are not implemented
- The checkout process is not fully implemented
- AI-enhanced descriptions are currently static mock data

## Contributing

### Coding Standards
- Follow TypeScript best practices
- Use functional components with hooks
- Follow the existing component structure
- Use Tailwind CSS for styling
- Ensure responsive design for all components

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes and test locally
4. Submit a pull request with a clear description of changes
5. Wait for code review and address any feedback