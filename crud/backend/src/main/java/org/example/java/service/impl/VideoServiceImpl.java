package org.example.java.service.impl;

import org.example.java.dto.request.VideoCreateDto;
import org.example.java.repository.VideoRepository;
import org.example.java.service.VideoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Transactional
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;
    private static final String UPLOAD_DIR = "uploads/videos/"; // Adjust path as needed

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
    @Transactional
    public VideoEntity createVideo(VideoCreateDto createDto) {
        try {
            // Handle file upload
            String filePath = saveFile(createDto.getFile(), createDto.getTitle());
            VideoEntity video = new VideoEntity();
            video.setTitle(createDto.getTitle());
            video.setFilePath(filePath);
            videoRepository.save(video);
            return video;
        } catch (Exception e) {
            throw new RuntimeException("Failed to save video: " + e.getMessage());
        }
    }

    @Override
    public void deleteVideo(int id) {
        VideoEntity video = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + id));
        try {
            Files.deleteIfExists(Paths.get(video.getFilePath()));
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete video file: " + e.getMessage());
        }
        videoRepository.delete(video);
    }

    private String saveFile(byte[] file, String title) throws Exception {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String fileName = title.replaceAll("\\s+", "_") + "_" + System.currentTimeMillis() + ".mp4"; // Adjust extension
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file);
        return filePath.toString();
    }
}