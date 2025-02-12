package org.example.java.controller;

import lombok.AllArgsConstructor;
import org.example.java.model.Video;
import org.example.java.service.VideoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/videos")
@RestController
@AllArgsConstructor
public class VideoController {
    private final VideoService videoService;

    @GetMapping("/")
    private ResponseEntity<Page<Video>> readVideos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(videoService.getAllVideos(pageable));
    }

    @PostMapping("/")
    public ResponseEntity<Video> createVideo(
            @RequestParam("title") String title,
            @RequestBody MultipartFile file
    ) {
        return ResponseEntity.ok(videoService.createVideo(title, file));
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity<String> deleteVideo(@PathVariable int videoId) {
        videoService.deleteVideo(videoId);
        return ResponseEntity.ok("Video deleted successfully");
    }
}
