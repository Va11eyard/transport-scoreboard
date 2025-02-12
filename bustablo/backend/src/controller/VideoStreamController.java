package com.transport.bustablo.controller;

import com.transport.bustablo.service.VideoStreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/videostream")
public class VideoStreamController {

    @Autowired
    private VideoStreamService videoStreamService;
    
    @GetMapping
    public String getVideoStreamInfo() {
        return "Video stream available via WebSocket at /ws/video";
    }
}
