# KalaSetu Backend Development Tasks

## Setup

### 1. Initialize Node.js Project

- [x] Create a new directory for the backend project — ✅ Done: created backend/
- [x] Initialize a new Node.js project with `npm init -y` — ✅ Done: package.json generated
- [x] Create a `.gitignore` file with appropriate entries (node_modules, .env, etc.) — ✅ Done
- [x] Set up TypeScript configuration with `tsconfig.json` — ✅ Done
- [x] Install development dependencies: — ✅ Done
  ```bash
  npm install --save-dev typescript @types/node @types/express ts-node nodemon eslint prettier
  ```

Notes: Verified required files exist and dev dependencies installed successfully.

### 2. Set Up Neon DB

- [ ] Create a Neon DB account if not already done
- [ ] Create a new project in Neon DB dashboard
- [ ] Create a new database for the KalaSetu application
- [ ] Save the connection string for later use
- [ ] Test the connection to ensure it works

Note: ⚠ Blocked until Neon DB credentials are available. Please create the project and provide DATABASE_URL (with sslmode=require) to proceed with Prisma setup.

### 3. Install Core Dependencies

- [x] Install Express and related packages: ✅ Done
  ```bash
  npm install express cors helmet express-rate-limit morgan winston
  ```
- [x] Install database-related packages: ✅ Done
  ```bash
  npm install @prisma/client @neondatabase/serverless pg
  ```
- [x] Install authentication packages: ✅ Done
  ```bash
  npm install jsonwebtoken bcrypt passport passport-jwt
  ```
- [x] Install validation and utility packages: ✅ Done
  ```bash
  npm install zod date-fns uuid dotenv
  ```
- [x] Install OpenAI package for AI-enhanced descriptions: ✅ Done
  ```bash
  npm install openai
  ```

Notes: All runtime dependencies installed with 0 vulnerabilities.

### 4. Set Up Project Structure

- [x] Create the following directory structure: ✅ In progress/partial
  ```
  src/
  ├── config/         # Configuration files (created: config/env.ts)
  ├── controllers/    # Request handlers
  ├── middlewares/    # Custom middlewares
  ├── models/         # Data models and validation schemas
  ├── routes/         # API routes
  ├── services/       # Business logic
  ├── repositories/   # Data access layer
  ├── utils/          # Utility functions
  ├── app.ts          # Express application setup (created)
  └── server.ts       # Server entry point (created)
  ```
- [ ] Create a `.env` file with environment variables as specified in requirements.md
- [x] Create a `.env.example` file with placeholder values — ✅ Done

Notes: Bootstrapped Express app with security middleware and error handlers. Added env loader and .env.example. Verified server boots with `npm run dev` and health endpoint at /health responds 200.

## Development

### 1. Database Setup

- [x] Initialize Prisma with `npx prisma init`
- [ ] Configure Prisma to use Neon DB in `prisma/schema.prisma`
- [x] Define database models in Prisma schema based on the schema in requirements.md
- [x] Generate Prisma client with `npx prisma generate`
- [ ] Create initial migration with `npx prisma migrate dev --name init`
- [ ] Create seed data for development with `prisma/seed.ts`

Notes:
- Prisma installed and initialized. Models defined for User, Artisan, ArtisanSpecialty, Product, ProductGallery, Favorite, Order, OrderItem.
- Prisma Client singleton added at src/config/prisma.ts and wired to server shutdown.
- Migrations blocked until DATABASE_URL is provided (Neon: must include ?sslmode=require).

### 2. Authentication Implementation

- [ ] Create user model and validation schemas
- [ ] Implement user registration endpoint
- [ ] Implement user login endpoint with JWT generation
- [ ] Create middleware for JWT verification
- [ ] Implement role-based authorization middleware
- [ ] Add logout functionality
- [ ] Implement password reset flow (optional)

### 3. Implement Core API Endpoints

#### Products API

- [ ] Create product model and validation schemas
- [ ] Implement GET /api/products endpoint with filtering, sorting, and pagination
- [ ] Implement GET /api/products/:id endpoint
- [ ] Implement POST /api/products endpoint for creating products
- [ ] Implement PUT /api/products/:id endpoint for updating products
- [ ] Implement DELETE /api/products/:id endpoint
- [ ] Add product categories endpoint

#### Artisans API

- [ ] Create artisan model and validation schemas
- [ ] Implement GET /api/artisans endpoint with filtering and pagination
- [ ] Implement GET /api/artisans/:id endpoint
- [ ] Implement PUT /api/artisans/:id endpoint for profile updates
- [ ] Implement GET /api/artisans/:id/products endpoint
- [ ] Add craft types endpoint

#### Users API

- [ ] Implement GET /api/users/me endpoint
- [ ] Implement PUT /api/users/me endpoint
- [ ] Create favorites functionality
- [ ] Implement favorites endpoints

#### Orders API

- [ ] Create order model and validation schemas
- [ ] Implement GET /api/orders endpoint
- [ ] Implement GET /api/orders/:id endpoint
- [ ] Implement POST /api/orders endpoint
- [ ] Implement GET /api/artisans/me/orders endpoint

### 4. Implement File Upload

- [ ] Set up cloud storage (AWS S3 or similar)
- [ ] Create file upload service
- [ ] Implement file upload middleware
- [ ] Add endpoints for uploading product images and artisan profile images

### 5. Implement AI-Enhanced Descriptions

- [ ] Set up OpenAI API integration
- [ ] Create service for generating AI-enhanced product descriptions
- [ ] Implement background job for processing descriptions
- [ ] Add endpoint for manually triggering description generation

### 6. Error Handling and Validation

- [ ] Implement global error handling middleware
- [ ] Create custom error classes
- [ ] Add request validation middleware using Zod
- [ ] Implement input sanitization

### 7. Logging and Monitoring

- [ ] Set up Winston logger
- [ ] Configure Morgan for HTTP request logging
- [ ] Implement request ID tracking
- [ ] Add performance monitoring (optional)

## Testing

### 1. Set Up Testing Environment

- [ ] Install Jest and related packages:
  ```bash
  npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
  ```
- [ ] Configure Jest in `jest.config.js`
- [ ] Create test database in Neon DB
- [ ] Set up test environment variables

### 2. Write Unit Tests

- [ ] Write tests for utility functions
- [ ] Write tests for validation schemas
- [ ] Write tests for service functions
- [ ] Write tests for custom middlewares

### 3. Write Integration Tests

- [ ] Write tests for authentication endpoints
- [ ] Write tests for product endpoints
- [ ] Write tests for artisan endpoints
- [ ] Write tests for user endpoints
- [ ] Write tests for order endpoints

### 4. Set Up Test Automation

- [ ] Configure pre-commit hooks to run tests
- [ ] Set up GitHub Actions for CI/CD
- [ ] Create test coverage reports

## Deployment

### 1. Configure Environment Variables

- [ ] Create production environment variables
- [ ] Set up secrets management
- [ ] Configure CORS for production

### 2. Set Up CI/CD Pipeline

- [ ] Create GitHub Actions workflow file
- [ ] Configure build process
- [ ] Set up automated testing in CI
- [ ] Configure deployment to Render

### 3. Deploy Backend

- [ ] Create Render service
- [ ] Configure environment variables in Render
- [ ] Deploy application to Render
- [ ] Set up database connection

### 4. Post-Deployment Tasks

- [ ] Verify API endpoints in production
- [ ] Set up monitoring and alerts
- [ ] Configure logging in production
- [ ] Set up database backups

## Documentation

### 1. Update Requirements Documentation

- [ ] Update requirements.md with any changes made during development
- [ ] Document any deviations from the original plan
- [ ] Add lessons learned and challenges faced

### 2. API Documentation

- [ ] Install Swagger/OpenAPI packages:
  ```bash
  npm install swagger-ui-express @types/swagger-ui-express swagger-jsdoc @types/swagger-jsdoc
  ```
- [ ] Create OpenAPI specification
- [ ] Document all API endpoints
- [ ] Add example requests and responses
- [ ] Set up Swagger UI endpoint

### 3. Code Documentation

- [ ] Add JSDoc comments to functions and classes
- [ ] Document complex logic with inline comments
- [ ] Create README.md with setup and usage instructions
- [ ] Add contributing guidelines

## Integration with Frontend

### 1. Update Frontend Configuration

- [ ] Update API URL in frontend environment variables
- [ ] Replace mock data with real API calls
- [ ] Implement authentication in frontend

### 2. Test Frontend-Backend Integration

- [ ] Test all frontend features with backend integration
- [ ] Fix any integration issues
- [ ] Optimize API calls for performance

### 3. Deploy Integrated Application

- [ ] Deploy updated frontend
- [ ] Verify end-to-end functionality
- [ ] Monitor for any issues