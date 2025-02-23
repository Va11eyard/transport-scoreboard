package org.example.java.service.impl;

import org.example.java.dto.request.VideoCreateDto;
import org.example.java.repository.VideoRepository;
import org.example.java.service.VideoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;

    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Override
    public Page<VideoEntity> allVideos(Pageable pageable) {
        return videoRepository.findAll(pageable);
    }

    @Override
    public VideoEntity getVideoById(int id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + id));
    }

    @Override
    public void createVideo(VideoCreateDto createDto) {
        VideoEntity video = new VideoEntity();
        video.setTitle(createDto.getTitle());
        video.setFilePath(createDto.getFilePath());
        videoRepository.save(video);
    }

    @Override
    public void deleteVideo(int id) {
        VideoEntity video = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + id));
        videoRepository.delete(video);
    }
}