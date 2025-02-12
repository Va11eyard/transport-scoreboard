import React, { useEffect, useState } from 'react';
import { getTariffs } from '../services/tariffs';
import { Tariff } from '../types';

const TariffDisplay: React.FC = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  
  useEffect(() => {
    getTariffs().then(setTariffs);
  }, []);
  
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl">Tariffs</h2>
      <ul>
        {tariffs.map(tariff => (
          <li key={tariff.id}>{tariff.zone}: ${tariff.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default TariffDisplay;
