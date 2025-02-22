package org.example.java.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class MvcConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("*")
                        .allowCredentials( true)
                        .allowedOriginPatterns("*")
                        .allowedHeaders("*")
                        .allowedMethods("*");
            }
        };
    }
}

