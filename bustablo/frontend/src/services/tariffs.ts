import api from './api';
import { Tariff } from '../types';

export const getTariffs = async (): Promise<Tariff[]> => {
  const response = await api.get('/tariffs');
  return response.data;
};
