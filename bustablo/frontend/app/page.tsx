"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import RouteTimeline from "./components/route-timeline";
import type { Stop, WeatherData, BusData } from "./types";


export default function Home() {
  const initialStops: Stop[] = [
    { id: 1, name: "Площадь Согласия", status: "current" },
    { id: 2, name: "Старый фонтан", status: "upcoming" },
    { id: 3, name: "Лесная тропа", status: "upcoming" },
    { id: 4, name: "Мост Влюблённых", status: "upcoming" },
    { id: 5, name: "Цветочный бульвар", status: "upcoming" },
    { id: 6, name: "Солнечная набережная", status: "upcoming" },
    { id: 7, name: "Озёрный край", status: "upcoming" },
    { id: 8, name: "Речной вокзал", status: "upcoming" },
    { id: 9, name: "Смотровая площадка", status: "upcoming" },
    { id: 10, name: "Городской парк", status: "upcoming" },
    { id: 11, name: "Площадь Искусств", status: "upcoming" },
    { id: 12, name: "Театральная аллея", status: "upcoming" },
    { id: 13, name: "Улица Сказок", status: "upcoming" },
    { id: 14, name: "Зелёный квартал", status: "upcoming" },
    { id: 15, name: "Фонтан Грез", status: "upcoming" },
    { id: 16, name: "Брусничная площадь", status: "upcoming" },
    { id: 17, name: "Парк аттракционов", status: "upcoming" },
    { id: 18, name: "Переулок Чудес", status: "upcoming" },
    { id: 19, name: "Старинная гавань", status: "upcoming" },
    { id: 20, name: "Конечная станция", status: "upcoming" },
  ];

  const [stops, setStops] = useState(initialStops);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  const weatherData: WeatherData = {
    temperature: -9,
    condition: "cloudy",
    precipitation: 2,
    humidity: 83,
    windSpeed: 6,
  };
  const busData: BusData = {
    number: "26",
    id: "123 ABC kz",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStops((prevStops) => {
        if (currentStopIndex >= prevStops.length - 1) return prevStops;

        return prevStops.map((stop, index) => {
          if (index === currentStopIndex) return { ...stop, status: "passed" };
          if (index === currentStopIndex + 1)
            return { ...stop, status: "current" };
          return stop;
        });
      });

      setCurrentStopIndex((prev) => Math.min(prev + 1, stops.length - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [currentStopIndex, stops.length]);

  return (
    <div className="text-lg h-screen flex flex-col">
      <Header weatherData={weatherData} busData={busData} />

      <div className="text-lg h-screen flex flex-row">
        <div className="border-[#2563EB] text-xl h-full">
          <RouteTimeline stops={stops} currentStopIndex={currentStopIndex} />
        </div>
        <div className="text-lg flex flex-col w-full">
          <div className="text-lg flex-grow VIDEOCONTAINER w-full"></div>
          <Footer currentStop={stops[currentStopIndex]} />
        </div>
      </div>
    </div>
  );
}
