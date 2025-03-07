package org.example.java.controller;

import lombok.AllArgsConstructor;
import org.example.java.dto.request.VideoCreateDto;
import org.example.java.service.VideoService;
import org.example.java.service.impl.VideoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/videos")
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

    // Serve raw bytes for <video> playback
    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> getVideoFile(@PathVariable int id) {
        VideoEntity video = videoService.getVideoById(id);
        if (video == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path path = Paths.get(video.getFilePath());
            if (!Files.exists(path)) {
                return ResponseEntity.notFound().build();
            }

            // Read file from disk
            byte[] fileContent = Files.readAllBytes(path);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("video/mp4"))
                    .body(fileContent);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Upload a new video
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<VideoEntity> createVideo(
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        VideoCreateDto createDto = new VideoCreateDto();
        createDto.setTitle(title);
        createDto.setFile(file.getBytes());

        VideoEntity video = videoService.createVideo(createDto);
        return ResponseEntity.status(201).body(video);
    }

    // Delete a video
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable int id) {
        videoService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }
    // VideoController.java (add the following method)
    @GetMapping("/next")
    public ResponseEntity<VideoEntity> getNextVideo(@RequestParam(name = "lastVideoId", required = false) Integer lastVideoId) {
        VideoEntity nextVideo = videoService.getNextVideo(lastVideoId);
        if (nextVideo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(nextVideo);
    }

}
