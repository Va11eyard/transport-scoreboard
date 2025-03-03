package org.example.java.service.impl;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "videos")
@Data
public class VideoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    @Column(name = "file_path")
    private String filePath; // Store the path to the uploaded file on disk
}
