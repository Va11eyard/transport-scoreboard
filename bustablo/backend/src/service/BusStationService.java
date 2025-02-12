package com.transport.bustablo.backend.service;

import com.transport.bustablo.model.BusStation;
import com.transport.bustablo.repository.BusStationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BusStationService {

    @Autowired
    private BusStationRepository busStationRepository;
    
    public List<BusStation> getAllBusStations() {
        return busStationRepository.findAll();
    }
}
