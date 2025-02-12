package com.transport.bustablo.backend.service;

import com.transport.bustablo.model.Weather;
import org.springframework.stereotype.Service;

@Service
public class WeatherService {
    public Weather getCurrentWeather() {
        // Dummy weather info
        return new Weather("Sunny", 25.0);
    }
}
