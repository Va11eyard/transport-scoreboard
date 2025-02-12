package org.example.java.service;

import org.example.java.model.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface VideoService {
    Page<Video> getAllVideos(Pageable pageable);
    Video createVideo(String title, MultipartFile file);
    void deleteVideo(int videoId);
}
