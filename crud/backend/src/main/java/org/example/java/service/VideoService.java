// VideoService.java
package org.example.java.service;

import org.example.java.dto.request.VideoCreateDto;
import org.example.java.service.impl.VideoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VideoService {
    Page<VideoEntity> allVideos(Pageable pageable);
    VideoEntity getVideoById(int id);
    VideoEntity createVideo(VideoCreateDto createDto);
    void deleteVideo(int id);

    // Task 2: Get the next video given an optional last video ID
    VideoEntity getNextVideo(Integer lastVideoId);
}
