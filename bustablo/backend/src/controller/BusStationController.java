package com.transport.bustablo.controller;

import com.transport.bustablo.model.BusStation;
import com.transport.bustablo.service.BusStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/busstations")
public class BusStationController {

    @Autowired
    private BusStationService busStationService;
    
    @GetMapping
    public ResponseEntity<List<BusStation>> getAllBusStations() {
        return ResponseEntity.ok(busStationService.getAllBusStations());
    }
}
