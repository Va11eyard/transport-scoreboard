"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from 'lucide-react';
import type { WeatherData } from "../../types";

interface WeatherProps {
  data: WeatherData;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snowy: CloudSnow,
  drizzle: CloudDrizzle,
  thunderstorm: CloudLightning,
  foggy: CloudFog,
} as const;

export function Weather({ data }: WeatherProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const WeatherIcon = weatherIcons[data.condition];

  return (
    <div className="w-3/5 inline-flex items-center justify-between bg-indigo-800 text-white p-3 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <WeatherIcon className="w-8 h-8" />
          <span className="text-2xl font-medium">{data.temperature}°C</span>
        </div>
        <div className="text-sm">
          <div>Вероятность осадков: {data.precipitation}%</div>
          <div>Влажность: {data.humidity}%</div>
          <div>Ветер: {data.windSpeed} км/ч</div>
        </div>
      </div>
      <div className="ml-4 text-right">
        <div className="text-lg">
          {currentTime.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
        <div className="text-2xl font-medium">
          {currentTime.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}