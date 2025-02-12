package org.example.java.service.impl;

import lombok.AllArgsConstructor;
import org.example.java.model.Video;
import org.example.java.repository.VideoRepository;
import org.example.java.service.VideoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;

    @Override
    public Page<Video> getAllVideos(Pageable pageable) {
        return videoRepository.findAll(pageable);
    }

    @Override
    public Video createVideo(String title, MultipartFile file) {
        Video video = new Video();
        video.setTitle(title);
        video.setFilePath(file.getOriginalFilename());

        return videoRepository.save(video);
    }

    @Override
    public void deleteVideo(int videoId) {
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("Video not found"));
        videoRepository.delete(video);
    }
}
