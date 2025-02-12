import api from './api';
import { Weather } from '../types';

export const getWeather = async (): Promise<Weather> => {
  const response = await api.get('/weather');
  return response.data;
};
