package org.example.java.controller;

import lombok.AllArgsConstructor;
import org.example.java.dto.request.VideoCreateDto;
import org.example.java.service.VideoService;
import org.example.java.service.impl.VideoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/videos") // Matches frontend
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

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<VideoEntity> createVideo(
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file) throws IOException {
        VideoCreateDto createDto = new VideoCreateDto();
        createDto.setTitle(title);
        createDto.setFile(file.getBytes());
        VideoEntity video = videoService.createVideo(createDto);
        return ResponseEntity.status(201).body(video);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable int id) {
        videoService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }
}