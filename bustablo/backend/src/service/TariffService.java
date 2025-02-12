package com.transport.bustablo.backend.service;


import com.transport.bustablo.model.Tariff;
import com.transport.bustablo.repository.TariffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TariffService {

    @Autowired
    private TariffRepository tariffRepository;
    
    public List<Tariff> getAllTariffs() {
        return tariffRepository.findAll();
    }
}
