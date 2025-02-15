import { Logo } from "./logo";
import { Weather } from "./weather";
import { Bus } from "./bus";
import type { WeatherData, BusData } from "../../types";

interface HeaderProps {
  weatherData: WeatherData;
  busData: BusData;
}

export function Header({ weatherData, busData }: HeaderProps) {
  return (
    <header className="flex h-[6rem] bg-green-800">
      <Bus data={busData} />
      <Logo />
      <Weather data={weatherData} />
    </header>
  );
}
