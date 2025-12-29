# AR Product Preview - React Native Intern Assignment

A complete AR product preview application built with React Native, featuring dynamic 3D model loading, user authentication, and AR interaction capabilities.

## 🚀 Features

- **Augmented Reality Product Preview**: Place 3D models in real-world environments using ARCore (Android) and ARKit (iOS)
- **Dynamic Model Loading**: Fetch 3D models from backend API (not hardcoded)
- **Touch Controls**: 
  - Pinch to scale models
  - Rotate with two fingers
  - Drag to move/reposition models
- **User Authentication**: JWT-based login/signup system
- **Favorites**: Save and manage favorite products
- **Product Catalog**: Browse products by category

## 📁 Project Structure

```
.
├── backend/              # Node.js + Express + MongoDB API
│   ├── models/          # Mongoose models
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication middleware
│   └── scripts/         # Seed data script
│
└── ARProductPreview/    # React Native mobile app
    └── src/
        ├── screens/     # App screens
        ├── navigation/  # Navigation setup
        ├── context/     # State management
        └── services/    # API service layer
```

## 🛠️ Tech Stack

### Frontend
- React Native 0.77.1
- TypeScript
- ViroReact (@viro-community/react-viro) for AR
- React Navigation
- AsyncStorage
- Axios

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 📋 Prerequisites

- Node.js >= 18
- MongoDB (installed and running)
- React Native development environment
- Android Studio (for Android) or Xcode (for iOS)
- ARCore-enabled Android device or ARKit-enabled iOS device

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ar-product-preview
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Start MongoDB and run the server:
```bash
npm run dev
```

5. (Optional) Seed sample data:
```bash
npm run seed
```

### Frontend Setup

1. Navigate to app directory:
```bash
cd ARProductPreview
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install CocoaPods:
```bash
cd ios
bundle exec pod install
cd ..
```

4. Update API URL in `src/config/api.ts`:
   - Android emulator: `http://10.0.2.2:3000/api`
   - iOS simulator: `http://localhost:3000/api`
   - Physical device: Use your computer's IP address

5. Start Metro bundler:
```bash
npm start
```

6. Run the app:
```bash
# Android
npm run android

# iOS
npm run ios
```

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Project overview
- [VIRO_SETUP.md](./VIRO_SETUP.md) - ViroReact native setup
- [DEVELOPMENT_STATUS.md](./DEVELOPMENT_STATUS.md) - Current development status

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Models
- `GET /api/models` - Get all models (optional `?category=name`)
- `GET /api/models/:id` - Get single model
- `POST /api/models` - Create model (Protected)
- `PUT /api/models/:id` - Update model (Protected)
- `DELETE /api/models/:id` - Delete model (Protected)

### Favorites
- `GET /api/favorites` - Get user's favorites (Protected)
- `POST /api/favorites/:modelId` - Add to favorites (Protected)
- `DELETE /api/favorites/:modelId` - Remove from favorites (Protected)
- `GET /api/favorites/check/:modelId` - Check if favorite (Protected)

## ⚠️ Important Notes

1. **AR Features**: Only work on physical devices (ARCore/ARKit required)
2. **ViroReact**: Requires additional native setup (see VIRO_SETUP.md)
3. **Environment Variables**: Never commit `.env` files to version control
4. **API Configuration**: Update API URLs for your environment

## 🧪 Testing

Test credentials (after seeding):
- Email: `test@example.com`
- Password: `test123`

## 📝 License

This project is for educational/demonstration purposes.

## 👤 Author

React Native Intern Assignment

---

For detailed setup and troubleshooting, please refer to the documentation files in the repository.

