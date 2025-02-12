import React from 'react';
import BusStationList from '../components/BusStations/BusStationList';
import WeatherDisplay from '../components/Weather/WeatherDisplay';
import VideoPlayer from '../components/Video/VideoPlayer';
import CurrentRouteInfo from '../components/CurrentRoute/CurrentRouteInfo';
import TariffDisplay from '../components/Tariffs/TariffDisplay';

const HomePage: React.FC = () => {
  return (
    <div>
      <WeatherDisplay />
      <CurrentRouteInfo />
      <TariffDisplay />
      <BusStationList />
      <div className="mt-4">
        <h2 className="text-2xl">Live Video Stream</h2>
        <VideoPlayer url="http://example.com/live.mp4" />
      </div>
    </div>
  );
};

export default HomePage;
