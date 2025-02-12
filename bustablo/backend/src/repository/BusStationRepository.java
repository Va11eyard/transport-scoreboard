package com.transport.bustablo.backend.repository;

import com.transport.bustablo.model.BusStation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusStationRepository extends JpaRepository<BusStation, Long> {
}
