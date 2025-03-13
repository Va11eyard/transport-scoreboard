import React, { useState, useEffect } from "react";
import VideoList from "../components/Videos/VideoList";
import VideoUpload from "../components/Videos/VideoUpload";
import VideoPlayer from "../components/Videos/VideoPlayer";
import { getVideos, uploadVideo, deleteVideo } from "../services/videos";
import Layout from "../components/Layout/Layout";

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
      setVideos(fetchedVideos);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleUploadVideo = async (file: File, title: string) => {
    try {
      await uploadVideo(file, title);
      await fetchVideos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteVideo = async (videoId: number) => {
    try {
      await deleteVideo(videoId);
      if (selectedVideo && selectedVideo.id === videoId) {
        setSelectedVideo(null);
      }
      await fetchVideos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Videos</h1>
        {error && <p className="text-red-500">{error}</p>}
        <VideoUpload onUpload={handleUploadVideo} />
        <div className="flex flex-col md:flex-row mt-8 gap-4">
          <div className="md:w-1/3">
            <VideoList
                videos={videos}
                onSelectVideo={handleSelectVideo}
                onDeleteVideo={handleDeleteVideo}
            />
          </div>
          <div className="md:w-2/3 border border-gray-300 rounded p-4 flex items-center justify-center">
            {selectedVideo ? (
                <VideoPlayer
                    key={selectedVideo.id} // Force re-mount on video change
                    video={selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                />
            ) : (
                <p className="text-gray-500">Select a video to play</p>
            )}
          </div>
        </div>
      </Layout>
  );
};

export default VideosPage;
