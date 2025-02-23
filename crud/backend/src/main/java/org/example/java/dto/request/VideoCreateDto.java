package org.example.java.dto.request;

import lombok.Data;

@Data
public class VideoCreateDto {
    private String title;
    private String filePath; // Adjust based on your upload logic
}