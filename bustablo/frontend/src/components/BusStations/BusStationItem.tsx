import React from 'react';
import { BusStation } from '../types';

interface Props {
  station: BusStation;
}

const BusStationItem: React.FC<Props> = ({ station }) => {
  return (
    <div className="border p-4 mb-2">
      <h3 className="text-xl">{station.name}</h3>
      <p>{station.location}</p>
    </div>
  );
};

export default BusStationItem;
