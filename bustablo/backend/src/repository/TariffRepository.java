package com.transport.bustablo.backend.repository;

import com.transport.bustablo.model.Tariff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TariffRepository extends JpaRepository<Tariff, Long> {
}
