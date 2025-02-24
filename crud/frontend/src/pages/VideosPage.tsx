// VideosPage.tsx
import React, { useState, useEffect } from "react";
import VideoList from "../components/Videos/VideoList";
import VideoUpload from "../components/Videos/VideoUpload";
import VideoPlayer from "../components/Videos/VideoPlayer";
import { getVideos, uploadVideo, deleteVideo } from "../services/videos";

interface Video {
  id: number;
  title: string;
  file_path: string;
}

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const fetchedVideos = await getVideos();
      setVideos(fetchedVideos); // Now an array
    } catch (error: any) {
      console.error("Failed to fetch videos:", error);
      setError(error.message);
    }
  };

  const handleUploadVideo = async (file: File, title: string) => {
    try {
      await uploadVideo(file, title);
      fetchVideos();
    } catch (error: any) {
      console.error("Failed to upload video:", error);
      setError(error.message);
    }
  };

  const handleDeleteVideo = async (videoId: number) => {
    try {
      await deleteVideo(videoId);
      fetchVideos();
      setSelectedVideo(null);
    } catch (error: any) {
      console.error("Failed to delete video:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {error && <p className="text-red-500">{error}</p>}
      <VideoUpload onUpload={handleUploadVideo} />
      <div className="flex mt-8">
        <div className="w-1/3 pr-4">
          <VideoList videos={videos} onSelectVideo={setSelectedVideo} onDeleteVideo={handleDeleteVideo} />
        </div>
        <div className="w-2/3">{selectedVideo && <VideoPlayer video={selectedVideo} />}</div>
      </div>
    </div>
  );
};

export default VideosPage;