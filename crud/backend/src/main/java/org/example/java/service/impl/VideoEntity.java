// VideoEntity.java
package org.example.java.service.impl;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "videos")
@Data
public class VideoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    @Column(name = "file_path")
    private String filePath; // Path on disk to the video file

    @Column(name = "uuid", unique = true, nullable = false, updatable = false)
    private String uuid;  // Unique identifier for the video
}
