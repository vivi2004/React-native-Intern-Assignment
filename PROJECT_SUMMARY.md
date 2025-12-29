# AR Product Preview - Project Summary

## Overview

This project implements a complete AR product preview application with backend API, user authentication, and dynamic 3D model loading.

## Project Structure

```
Assignment Task/
├── backend/                    # Node.js + Express + MongoDB backend
│   ├── models/                 # Mongoose models (User, Model)
│   ├── routes/                 # API routes (auth, models, favorites)
│   ├── middleware/             # Authentication middleware
│   ├── scripts/                # Seed data script
│   └── server.js              # Main server file
│
└── ARProductPreview/          # React Native frontend
    ├── src/
    │   ├── config/            # API configuration
    │   ├── context/           # Auth context provider
    │   ├── navigation/        # React Navigation setup
    │   ├── screens/           # App screens
    │   │   ├── LoginScreen.tsx
    │   │   ├── RegisterScreen.tsx
    │   │   ├── ProductCatalogScreen.tsx
    │   │   ├── FavoritesScreen.tsx
    │   │   ├── ARViewScreen.tsx
    │   │   └── ProfileScreen.tsx
    │   ├── services/          # API service layer
    │   └── types/             # TypeScript types
    └── android/               # Android native code
    └── ios/                   # iOS native code
```

## Features Implemented

### ✅ 1. Augmented Reality Product Preview
- **Technology**: ViroReact (@viro-community/react-viro)
- **Features**:
  - Camera-based AR scene
  - Surface detection (floor/table)
  - 3D model placement in real environment
  - Real-time AR tracking

### ✅ 2. Dynamic Model Loading from Backend
- **Backend API**: RESTful endpoints for model management
- **Model Metadata**:
  - Model URL (.glb, .gltf, .obj)
  - Name, Category, Thumbnail
  - Description, Scale
- **Dynamic Fetching**: Models loaded from API, not hardcoded
- **Categories**: Filter products by category

### ✅ 3. Touch Controls for Model Interaction
- **Scale**: Pinch in/out gesture
- **Rotate**: Two-finger rotation
- **Move/Reposition**: Drag on surface
- **Implementation**: ViroReact gesture handlers

### ✅ 4. User Authentication and Favorites
- **Authentication**:
  - JWT-based login/signup
  - Protected API routes
  - Token persistence with AsyncStorage
- **Favorites**:
  - Add/remove favorites
  - User-specific data storage
  - MongoDB persistence

## Backend API

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Models Endpoints
- `GET /api/models` - Get all models (with optional category filter)
- `GET /api/models/:id` - Get single model
- `POST /api/models` - Create model (Protected)
- `PUT /api/models/:id` - Update model (Protected)
- `DELETE /api/models/:id` - Delete model (Protected)

### Favorites Endpoints
- `GET /api/favorites` - Get user's favorites (Protected)
- `POST /api/favorites/:modelId` - Add to favorites (Protected)
- `DELETE /api/favorites/:modelId` - Remove from favorites (Protected)
- `GET /api/favorites/check/:modelId` - Check if favorite (Protected)

## Frontend Screens

1. **LoginScreen** - User login
2. **RegisterScreen** - User registration
3. **ProductCatalogScreen** - Browse products with category filter
4. **FavoritesScreen** - View saved favorites
5. **ARViewScreen** - AR scene with 3D model and gesture controls
6. **ProfileScreen** - User profile and logout

## Technologies Used

### Frontend
- React Native 0.77.1
- TypeScript
- @viro-community/react-viro (AR)
- React Navigation (routing)
- @react-native-async-storage/async-storage (token storage)
- Axios (HTTP client)
- React Context (state management)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- express-validator (input validation)
- CORS (cross-origin support)

## Setup Requirements

1. **MongoDB**: Must be installed and running
2. **Node.js**: Version 18 or higher
3. **React Native**: Development environment configured
4. **AR Device**: ARCore-enabled Android or ARKit-enabled iOS device

## Important Notes

### ViroReact Setup
ViroReact requires additional native setup:
- **Android**: May need to update `android/build.gradle` and `android/app/build.gradle`
- **iOS**: May need to update Podfile and run `pod install`
- Refer to [ViroReact documentation](https://docs.viromedia.com/) for complete setup

### API Configuration
- Update `src/config/api.ts` with correct backend URL
- For Android emulator: `http://10.0.2.2:3000/api`
- For iOS simulator: `http://localhost:3000/api`
- For physical devices: Use computer's IP address

### Model URLs
- Models must be hosted and accessible via URL
- Supported formats: .glb, .gltf, .obj
- Use the seed script to add sample models with test URLs

## Testing

1. Start backend: `cd backend && npm run dev`
2. Seed data: `cd backend && npm run seed`
3. Start frontend: `cd ARProductPreview && npm start`
4. Run app: `npm run android` or `npm run ios`

## Future Enhancements

- Model search functionality
- User reviews and ratings
- Social sharing
- Multiple model placement
- Model customization options
- Analytics and tracking

