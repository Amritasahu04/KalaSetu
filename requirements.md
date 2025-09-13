# KalaSetu Backend Requirements

## Backend Overview

### Purpose of the Backend

The KalaSetu backend will serve as a RESTful API service that provides data and functionality to the existing React frontend. It will handle data persistence, authentication, and business logic for the KalaSetu marketplace platform that connects traditional Indian artisans with potential customers.

### Integration with Frontend

The backend will integrate with the existing React frontend by:

- Providing RESTful API endpoints that match the frontend's data requirements for products, artisans, and authentication
- Supporting the existing data models and workflows identified in the frontend codebase
- Replacing the current mock data with real database interactions
- Enabling the AI-enhanced product descriptions that are currently static in the frontend

### High-level Goals

- **Scalability**: Design the backend to handle growing numbers of artisans, products, and users
- **Performance**: Optimize database queries and implement caching where appropriate
- **Security**: Implement robust authentication, authorization, and data validation
- **Reliability**: Ensure high availability and data integrity
- **Maintainability**: Follow clean architecture principles for easier maintenance and future extensions

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Products

```
GET /api/products - List all products with filtering, sorting, and pagination
GET /api/products/:id - Get a specific product by ID
POST /api/products - Create a new product (authenticated artisans only)
PUT /api/products/:id - Update a product (owner artisan only)
DELETE /api/products/:id - Delete a product (owner artisan only)
GET /api/products/categories - Get all product categories
```

### Artisans

```
GET /api/artisans - List all artisans with filtering and pagination
GET /api/artisans/:id - Get a specific artisan by ID
PUT /api/artisans/:id - Update artisan profile (authenticated artisan only)
GET /api/artisans/:id/products - Get all products by a specific artisan
GET /api/crafts - Get all craft types
```

### Users (Customers)

```
GET /api/users/me - Get current user profile
PUT /api/users/me - Update user profile
GET /api/users/me/favorites - Get user's favorite products
POST /api/users/me/favorites/:productId - Add product to favorites
DELETE /api/users/me/favorites/:productId - Remove product from favorites
```

### Orders

```
GET /api/orders - Get all orders for current user
GET /api/orders/:id - Get a specific order
POST /api/orders - Create a new order
GET /api/artisans/me/orders - Get all orders for artisan's products (authenticated artisans only)
```

### Authentication and Request Format

- All authenticated endpoints will require a JWT token in the Authorization header
- Request and response bodies will use JSON format
- Standard HTTP status codes will be used (200, 201, 400, 401, 403, 404, 500)

### Example API Call

```javascript
// Request
fetch('https://api.kalasetu.com/api/products?category=Pottery&sort=price&order=asc&page=1&limit=10', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <jwt_token>'
  }
});

// Response
{
  "data": [
    {
      "id": "p123",
      "title": "Hand-painted Clay Pot",
      "price": 1200,
      "category": "Pottery",
      "image": "https://storage.kalasetu.com/products/p123/main.jpg",
      "gallery": ["https://storage.kalasetu.com/products/p123/1.jpg"],
      "description": "Traditional hand-painted clay pot from Rajasthan",
      "aiDescription": "This exquisite piece showcases the centuries-old pottery tradition of Rajasthan...",
      "artisanId": "a456",
      "artisanName": "Ramesh Kumar",
      "authenticity": "verified",
      "popularity": 4.7
    },
    // More products...
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

## Data Models

### Database Schema for Neon DB

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Artisans Table
```sql
CREATE TABLE artisans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  craft_type VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  bio TEXT,
  experience VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Artisan Specialties Table
```sql
CREATE TABLE artisan_specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artisan_id UUID NOT NULL REFERENCES artisans(id) ON DELETE CASCADE,
  specialty VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  ai_description TEXT,
  artisan_id UUID NOT NULL REFERENCES artisans(id) ON DELETE CASCADE,
  authenticity VARCHAR(50) NOT NULL DEFAULT 'pending',
  popularity DECIMAL(3, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Product Gallery Table
```sql
CREATE TABLE product_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Favorites Table
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Order Items Table
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_per_unit DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Mapping to Frontend Data Requirements

The database schema is designed to support the frontend data models defined in the info.md file:

- The `Artisan` interface maps to the `artisans` table with related `artisan_specialties` table for the specialties array
- The `Product` interface maps to the `products` table with related `product_gallery` table for the gallery array
- Additional tables support features like user authentication, favorites, and orders

### Example Query

```sql
-- Query to get a product with its gallery images and artisan information
SELECT 
  p.id, p.title, p.price, p.category, p.image, p.description, p.ai_description,
  p.authenticity, p.popularity, p.artisan_id, a.user_id,
  u.name as artisan_name,
  json_agg(DISTINCT pg.image_url ORDER BY pg.display_order) as gallery,
  json_agg(DISTINCT asp.specialty) as specialties
FROM products p
JOIN artisans a ON p.artisan_id = a.id
JOIN users u ON a.user_id = u.id
LEFT JOIN product_gallery pg ON p.id = pg.product_id
LEFT JOIN artisan_specialties asp ON a.id = asp.artisan_id
WHERE p.id = $1
GROUP BY p.id, a.id, u.id;
```

## Dependencies

### Node.js Frameworks/Libraries

- **Express**: Web framework for building the API
- **Prisma**: ORM for database access and migrations
- **cors**: Middleware for handling Cross-Origin Resource Sharing
- **helmet**: Middleware for securing HTTP headers
- **express-rate-limit**: Rate limiting middleware to prevent abuse
- **morgan**: HTTP request logger middleware
- **winston**: Logging library for application logs

### Neon DB-specific Tools

- **@neondatabase/serverless**: Neon DB serverless driver for PostgreSQL
- **pg**: PostgreSQL client for Node.js

### Authentication/Authorization

- **jsonwebtoken**: For generating and verifying JWTs
- **bcrypt**: For password hashing
- **passport**: Authentication middleware
- **passport-jwt**: JWT strategy for Passport

### Validation and Utilities

- **zod**: Schema validation library (already used in frontend)
- **date-fns**: Date utility library
- **uuid**: For generating UUIDs
- **dotenv**: For loading environment variables

### AI Integration

- **openai**: OpenAI API client for generating AI-enhanced product descriptions

## Architecture

### Layered Architecture

The backend will follow a layered architecture pattern:

1. **Routes Layer**: Defines API endpoints and routes requests to controllers
2. **Controllers Layer**: Handles HTTP requests and responses
3. **Services Layer**: Contains business logic
4. **Repository Layer**: Handles data access through Prisma ORM
5. **Models Layer**: Defines data structures and validation schemas

```
+----------------------------------+
|            Routes                |
+----------------------------------+
                |
                v
+----------------------------------+
|           Controllers            |
+----------------------------------+
                |
                v
+----------------------------------+
|            Services              |
+----------------------------------+
                |
                v
+----------------------------------+
|           Repositories           |
+----------------------------------+
                |
                v
+----------------------------------+
|         Prisma ORM               |
+----------------------------------+
                |
                v
+----------------------------------+
|         Neon DB                  |
+----------------------------------+
```

### Error Handling and Logging

- Implement a centralized error handling middleware
- Use custom error classes for different types of errors
- Log errors with appropriate severity levels
- Return standardized error responses to the client

```javascript
// Example error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});
```

### Caching Strategy

- Implement Redis caching for frequently accessed data
- Cache product listings, artisan profiles, and other read-heavy data
- Implement cache invalidation strategies for data updates

## Security

### Data Validation and Sanitization

- Use Zod for request validation and schema enforcement
- Sanitize user inputs to prevent injection attacks
- Validate file uploads for size, type, and content

```javascript
// Example validation schema using Zod
const createProductSchema = z.object({
  title: z.string().min(3).max(255),
  price: z.number().positive(),
  category: z.string(),
  description: z.string().min(10),
  image: z.string().url(),
  gallery: z.array(z.string().url()).optional()
});

// Middleware to validate request body
const validateRequest = (schema) => (req, res, next) => {
  try {
    req.validatedData = schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
```

### Authentication/Authorization Flow

1. User registers or logs in
2. Server validates credentials and issues a JWT
3. Client includes JWT in Authorization header for subsequent requests
4. Server verifies JWT and extracts user information
5. Middleware checks user permissions for protected routes

```javascript
// Example JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: { message: 'Authorization header missing' } });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: { message: 'Invalid token' } });
  }
};
```

### Environment Variables

```
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@db.neon.tech/kalasetu

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# OpenAI API for AI-enhanced descriptions
OPENAI_API_KEY=your-openai-api-key

# File Storage
CLOUD_STORAGE_BUCKET=kalasetu-storage
CLOUD_STORAGE_REGION=us-east-1
CLOUD_STORAGE_KEY=your-storage-key
CLOUD_STORAGE_SECRET=your-storage-secret
```

## Testing

### Testing Framework

- **Jest**: Primary testing framework
- **Supertest**: For testing HTTP endpoints

### Types of Tests

1. **Unit Tests**: Test individual functions and components
   - Service functions
   - Utility functions
   - Validation logic

2. **Integration Tests**: Test interactions between components
   - API endpoints with database interactions
   - Authentication flow
   - Error handling

3. **End-to-End Tests**: Test complete workflows
   - User registration and login
   - Product creation and listing
   - Order placement

### Example Test Case

```javascript
// Example integration test for product creation
describe('POST /api/products', () => {
  let token;
  
  beforeAll(async () => {
    // Login as an artisan to get token
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'artisan@example.com', password: 'password123' });
    
    token = response.body.token;
  });
  
  it('should create a new product when valid data is provided', async () => {
    const productData = {
      title: 'Test Product',
      price: 1000,
      category: 'Pottery',
      description: 'A test product description',
      image: 'https://example.com/image.jpg'
    };
    
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(productData);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(productData.title);
  });
  
  it('should return 400 when invalid data is provided', async () => {
    const invalidData = {
      title: '', // Invalid: empty title
      price: -100, // Invalid: negative price
      category: 'Pottery',
      description: 'A test product description',
      image: 'https://example.com/image.jpg'
    };
    
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidData);
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
```

## Deployment

### Deployment Platform

- **Render**: For hosting the Node.js backend application
- **Neon DB**: For PostgreSQL database hosting
- **AWS S3** or **Cloudinary**: For file storage

### CI/CD Pipeline

- **GitHub Actions**: For automated testing and deployment
- Workflow steps:
  1. Run tests on pull requests
  2. Build and deploy to staging on merge to develop branch
  3. Build and deploy to production on merge to main branch

```yaml
# Example GitHub Actions workflow
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Render
        uses: renderinc/render-deploy-action@v1
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### Environment Setup

- Create a Neon DB project and database
- Set up environment variables in deployment platform
- Configure database connection string with Neon DB credentials
- Set up storage bucket for product images

```
# Example Neon DB connection string
DATABASE_URL=postgresql://user:password@db.neon.tech/kalasetu?sslmode=require
```