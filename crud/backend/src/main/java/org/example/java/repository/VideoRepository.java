// VideoRepository.java
package org.example.java.repository;

import org.example.java.service.impl.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<VideoEntity, Integer> {
    VideoEntity findFirstByOrderByIdAsc();
    VideoEntity findFirstByIdGreaterThanOrderByIdAsc(int id);
}
