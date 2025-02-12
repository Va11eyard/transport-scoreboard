package com.transport.bustablo.backend.model;

import javax.persistence.*;

@Entity
public class Tariff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String zone;
    private double price;
    
    public Tariff() {}
    public Tariff(String zone, double price) {
        this.zone = zone;
        this.price = price;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getZone() { return zone; }
    public void setZone(String zone) { this.zone = zone; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
