export interface BusStation {
    id: number;
    name: string;
    location: string;
  }
  
  export interface Weather {
    id: number;
    condition: string;
    temperature: number;
  }
  
  export interface Tariff {
    id: number;
    zone: string;
    price: number;
  }
  