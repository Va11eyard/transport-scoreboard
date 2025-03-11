import React from "react";

interface Video {
    id: number;
    title: string;
    file_path?: string;
}

interface VideoPlayerProps {
    video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
            <video controls className="w-full">
                <source src={`http://localhost:8080/api/videos/${video.id}/file`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
