export interface Stop {
  id: number;
  name: string;
  status: "passed" | "current" | "upcoming";
}

export interface WeatherData {
  temperature: number;
  condition: keyof typeof weatherIcons;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

const weatherIcons = {
  sunny: "Sun",
  cloudy: "Cloud",
  rainy: "CloudRain",
  snowy: "CloudSnow",
  drizzle: "CloudDrizzle",
  thunderstorm: "CloudLightning",
  foggy: "CloudFog",
} as const;

export interface BusData {
  number: string;
  id: string;
}
