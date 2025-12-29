# AR Product Preview Backend

Backend API server for the AR Product Preview application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string and JWT secret.

4. Make sure MongoDB is running on your system.

5. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Models
- `GET /api/models` - Get all models (optional query: `?category=categoryName`)
- `GET /api/models/:id` - Get single model
- `POST /api/models` - Create a new model (Protected)
- `PUT /api/models/:id` - Update a model (Protected)
- `DELETE /api/models/:id` - Delete a model (Protected)

### Favorites
- `GET /api/favorites` - Get user's favorites (Protected)
- `POST /api/favorites/:modelId` - Add model to favorites (Protected)
- `DELETE /api/favorites/:modelId` - Remove model from favorites (Protected)
- `GET /api/favorites/check/:modelId` - Check if model is favorite (Protected)

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

