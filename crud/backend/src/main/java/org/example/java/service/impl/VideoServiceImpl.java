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
import java.util.UUID;

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
    public VideoEntity createVideo(VideoCreateDto createDto) {
        try {
            // Save file to disk and get its path
            String filePath = saveFile(createDto.getFile(), createDto.getTitle());
            VideoEntity video = new VideoEntity();
            video.setTitle(createDto.getTitle());
            video.setFilePath(filePath);
            // Generate a unique UUID for the video
            video.setUuid(UUID.randomUUID().toString());
            videoRepository.save(video);
            return video;
        } catch (Exception e) {
            throw new RuntimeException("Failed to save video: " + e.getMessage());
        }
    }

    @Override
    public void deleteVideo(int id) {
        VideoEntity video = getVideoById(id);
        try {
            Files.deleteIfExists(Paths.get(video.getFilePath()));
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete video file: " + e.getMessage());
        }
        videoRepository.delete(video);
    }

    private String saveFile(byte[] fileBytes, String title) throws Exception {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        // Create a unique filename (spaces replaced with underscores)
        String sanitizedTitle = title.replaceAll("\\s+", "_");
        String fileName = sanitizedTitle + "_" + System.currentTimeMillis() + ".mp4";
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, fileBytes);
        return filePath.toString();
    }

    @Override
    public VideoEntity getNextVideo(Integer lastVideoId) {
        if (lastVideoId == null) {
            // No last video provided, return the first video in order
            return videoRepository.findFirstByOrderByIdAsc();
        }
        // Try to find the next video with an ID greater than lastVideoId
        VideoEntity nextVideo = videoRepository.findFirstByIdGreaterThanOrderByIdAsc(lastVideoId);
        if (nextVideo == null) {
            // Wrap around to the first video if no higher ID exists
            return videoRepository.findFirstByOrderByIdAsc();
        }
        return nextVideo;
    }

}
