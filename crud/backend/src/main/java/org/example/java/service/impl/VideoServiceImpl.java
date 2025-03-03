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

    // Change to an absolute path if needed, e.g. "C:/myapp/uploads/videos/" or "/home/user/uploads/videos/"
    private static final String UPLOAD_DIR = "uploads/videos/";

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
            // 1) Save file to disk
            String filePath = saveFile(createDto.getFile(), createDto.getTitle());

            // 2) Create VideoEntity with the file path
            VideoEntity video = new VideoEntity();
            video.setTitle(createDto.getTitle());
            video.setFilePath(filePath);

            // 3) Save entity in DB
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
            // Delete file from disk if it exists
            Files.deleteIfExists(Paths.get(video.getFilePath()));
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete video file: " + e.getMessage());
        }
        // Delete DB record
        videoRepository.delete(video);
    }

    private String saveFile(byte[] fileBytes, String title) throws Exception {
        // Ensure the directory exists
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Create a unique file name
        String sanitizedTitle = title.replaceAll("\\s+", "_");
        String fileName = sanitizedTitle + "_" + System.currentTimeMillis() + ".mp4";
        Path filePath = uploadPath.resolve(fileName);

        // Write bytes to disk
        Files.write(filePath, fileBytes);
        return filePath.toString();
    }
}
