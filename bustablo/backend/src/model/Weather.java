package com.transport.bustablo.backend.model;

import javax.persistence.*;

@Entity
public class Weather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String condition;
    private double temperature;
    
    public Weather() {}
    public Weather(String condition, double temperature) {
        this.condition = condition;
        this.temperature = temperature;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }
}
