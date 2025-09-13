# KalaSetu - Empowering Indian Artisans

KalaSetu is a digital marketplace platform that connects traditional Indian artisans with global customers, preserving cultural heritage while providing economic opportunities.

## Features

- 🏺 **Artisan Discovery**: Browse and connect with verified Indian artisans
- 🎨 **Product Showcase**: AI-enhanced product descriptions and images
- 💰 **AI Pricing Module**: Intelligent price suggestions with category-based ranges
- 🔐 **Authentication**: Secure user registration and login
- 📱 **Responsive Design**: Mobile-first approach with modern UI
- 🌐 **Multi-language Support**: Voice search in multiple Indian languages
- ⭐ **Review System**: Customer feedback and ratings
- 🛒 **E-commerce**: Complete marketplace functionality

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma** with PostgreSQL
- **JWT** for authentication
- **OpenAI** for AI features
- **Multer** for file uploads

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kalasetu.git
   cd kalasetu
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Update the following variables in `.env`:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/kalasetu"

   # JWT Secret
   JWT_SECRET="your-super-secret-jwt-key"

   # OpenAI (optional)
   OPENAI_API_KEY="your-openai-api-key"
   ```

4. **Set up the database**

   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start the development servers**

   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both frontend (http://localhost:5173) and backend (http://localhost:3000) servers.

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Artisan Endpoints

- `GET /api/artisans` - Get all artisans
- `GET /api/artisans/:id` - Get artisan by ID
- `PUT /api/artisans/:id` - Update artisan profile

### Product Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### AI Features

- `POST /api/products/ai/price` - Generate AI price suggestion with explanation
- `POST /api/products/ai/description` - Generate AI product description
- `POST /api/products/ai/enhance-image` - Enhance product image quality
- `POST /api/products/ai/analyze-image` - Analyze product image quality
- `POST /api/products/ai/create` - Create product with AI assistance

## AI Pricing Module

The AI Pricing Module uses OpenAI's GPT-4 to provide intelligent price suggestions for artisan products based on:

- **Product Details**: Title, category, description, and artisan location
- **Image Analysis**: Quality, size, and format of uploaded product images
- **Market Intelligence**: Current market trends and fair pricing for Indian handicrafts
- **Category Ranges**: Pre-defined min/max price ranges for each product category

### Features

- **Smart Price Suggestions**: AI analyzes product details and suggests optimal pricing
- **Category-Based Ranges**: Ensures prices stay within realistic bounds for each category
- **Interactive Slider**: Artisans can adjust the suggested price within the AI-recommended range
- **Detailed Explanations**: AI provides reasoning for price suggestions
- **Fallback System**: Works even without OpenAI API key using intelligent algorithms

### Setup Instructions

1. **Get OpenAI API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Create an account and generate an API key
   - Add to your `.env` file:
   ```env
   OPENAI_API_KEY=sk-proj-your-api-key-here
   ```

2. **Price Ranges Configuration**
   - Edit `backend/src/config/priceRanges.json` to customize category price ranges
   - Ranges are in INR and help ensure fair pricing

3. **Usage**
   - Navigate to Product Creation page
   - Upload product images and fill details
   - Select "Let AI suggest a price" option
   - Click "Generate AI Price Range"
   - Use the slider to select final price within suggested range
   - Submit the product

### Category Price Ranges

| Category | Min Price (₹) | Max Price (₹) |
|----------|---------------|---------------|
| Pottery | 500 | 15,000 |
| Textiles | 800 | 25,000 |
| Woodcarving | 1,000 | 30,000 |
| Jewelry | 2,000 | 100,000 |
| Metalwork | 600 | 20,000 |
| Painting | 1,500 | 50,000 |
| Leatherwork | 700 | 18,000 |
| Weaving | 900 | 22,000 |
| Stone Carving | 1,500 | 40,000 |
| Other | 300 | 10,000 |

## Project Structure

```
kalasetu/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Database and environment config
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Authentication middleware
│   │   ├── repositories/   # Database operations
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── prisma/             # Database schema and migrations
│   └── package.json
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and API client
│   │   └── data/           # Mock data and types
│   ├── public/             # Static assets
│   └── package.json
├── .env.example            # Environment variables template
├── package.json            # Root package.json with scripts
└── README.md
```

## Available Scripts

### Root Level Scripts
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run install:all` - Install dependencies for all packages

### Backend Scripts
- `npm run dev` - Start backend development server
- `npm run build` - Build backend for production
- `npm start` - Start production server

### Frontend Scripts
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

## Deployment

### Backend Deployment

1. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

2. Set production environment variables

3. Start the server:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email amrita.sahu@example.com or join our Discord community.

## Acknowledgments

- Indian artisans for preserving our cultural heritage
- Open source community for amazing tools and libraries
- Ministry of Textiles, Government of India for inspiration
