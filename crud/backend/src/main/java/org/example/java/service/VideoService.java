package org.example.java.service;

import org.example.java.dto.request.VideoCreateDto;
import org.example.java.service.impl.VideoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VideoService {
    Page<VideoEntity> allVideos(Pageable pageable);
    VideoEntity getVideoById(int id);
    VideoEntity createVideo(VideoCreateDto createDto); // Return VideoEntity
    void deleteVideo(int id);
}