import axios from 'axios';
import { AuthResponseDto } from '@/responses/dto/auth';
import { CurrentUserDto } from '@/responses/dto/current-user';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}



const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const authRequests = {
  login: async (credentials: LoginCredentials): Promise<AuthResponseDto> => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponseDto> => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axios.post(`${API_URL}/logout`);
  },

  me: async (): Promise<CurrentUserDto> => {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  },
}; 