package com.transport.bustablo.controller;

import com.transport.bustablo.model.Tariff;
import com.transport.bustablo.service.TariffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tariffs")
public class TariffController {

    @Autowired
    private TariffService tariffService;
    
    @GetMapping
    public ResponseEntity<List<Tariff>> getAllTariffs() {
        return ResponseEntity.ok(tariffService.getAllTariffs());
    }
}
