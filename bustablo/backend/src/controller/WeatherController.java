package com.transport.bustablo.controller;

import com.transport.bustablo.model.Weather;
import com.transport.bustablo.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;
    
    @GetMapping
    public ResponseEntity<Weather> getWeather() {
        return ResponseEntity.ok(weatherService.getCurrentWeather());
    }
}
