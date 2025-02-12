import api from './api';
import { BusStation } from '../types';

export const getBusStations = async (): Promise<BusStation[]> => {
  const response = await api.get('/busstations');
  return response.data;
};
