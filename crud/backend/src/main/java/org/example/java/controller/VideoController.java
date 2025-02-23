package org.example.java.controller;

import lombok.AllArgsConstructor;
import org.example.java.dto.request.VideoCreateDto;
import org.example.java.service.VideoService;
import org.example.java.service.impl.VideoEntity; // Correct import
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/videos")
@AllArgsConstructor
public class VideoController {
    private final VideoService videoService;

    @GetMapping
    public ResponseEntity<Page<VideoEntity>> getAllVideos(Pageable pageable) {
        return ResponseEntity.ok(videoService.allVideos(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoEntity> getVideoById(@PathVariable int id) {
        return ResponseEntity.ok(videoService.getVideoById(id));
    }

    @PostMapping
    public ResponseEntity<Void> createVideo(@RequestBody VideoCreateDto createDto) {
        videoService.createVideo(createDto);
        return ResponseEntity.status(201).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable int id) {
        videoService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }
}