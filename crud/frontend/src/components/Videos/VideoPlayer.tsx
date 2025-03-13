import React from "react";

interface Video {
    id: number;
    title: string;
    file_path: string;
}

interface VideoPlayerProps {
    video: Video | null;
    onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
    return (
        <div className="p-4 bg-white rounded shadow relative">
            {video ? (
                <>
                    {/* Video Title */}
                    <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
                    {/* Video Element */}
                    <video controls className="w-full">
                        <source
                            src={`http://localhost:8080/api/videos/${video.id}/file`}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </>
            ) : (
                /* Placeholder when no video is selected */
                <div className="text-center text-gray-500">
                    Select a video to play
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;