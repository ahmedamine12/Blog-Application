package com.example.blog_app.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Allow requests from the frontend application
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow the specified HTTP methods
                .allowCredentials(true) // Allow sending credentials like cookies
                .maxAge(3600); // Set max age for preflight requests (in seconds)
    }
}
