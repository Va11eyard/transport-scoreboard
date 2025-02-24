package org.example.java.dto.request;

import lombok.Data;

@Data
public class VideoCreateDto {
    private String title;
    private byte[] file;
}