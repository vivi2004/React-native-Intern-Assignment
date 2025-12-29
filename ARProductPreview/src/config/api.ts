import { Platform } from 'react-native';

// For Android emulator, use 10.0.2.2 to access localhost
// For iOS simulator, use localhost
// For physical devices, use your computer's IP address
const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // Android emulator
      return 'http://10.0.2.2:3000/api';
    } else {
      // iOS simulator or physical device
      return 'http://localhost:3000/api';
      // For physical device, replace with your computer's IP:
      // return 'http://192.168.1.XXX:3000/api';
    }
  }
  return 'https://your-production-api.com/api';
};

const API_BASE_URL = getApiUrl();

export default API_BASE_URL;

