export interface User {
  id: string;
  email: string;
  name: string;
  favorites?: string[];
}

export interface Model {
  _id: string;
  name: string;
  category: string;
  modelUrl: string;
  thumbnail: string;
  description?: string;
  scale?: number;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

