import React, { useEffect, useState } from 'react';
import { getBusStations } from '../services/busStations';
import { BusStation } from '../types';
import BusStationItem from './BusStationItem';

const BusStationList: React.FC = () => {
  const [stations, setStations] = useState<BusStation[]>([]);
  
  useEffect(() => {
    getBusStations().then(setStations);
  }, []);
  
  return (
    <div>
      <h2 className="text-2xl mb-4">Bus Stations</h2>
      {stations.map(station => <BusStationItem key={station.id} station={station} />)}
    </div>
  );
};

export default BusStationList;
