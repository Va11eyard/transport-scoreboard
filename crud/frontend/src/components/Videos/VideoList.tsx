import React from "react";

interface Video {
  id: number;
  title: string;
  file_path: string;
}

interface VideoListProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  onDeleteVideo: (id: number) => void;
}

const VideoList: React.FC<VideoListProps> = ({videos, onSelectVideo, onDeleteVideo}) => {
  return (
      <ul className=" bg-white rounded shadow max-w-md p-4 ">
        {videos.map((video) => (
            <li key={video.id} className="flex w-full items-center justify-between mb-2">
              <button onClick={() => onSelectVideo(video)} className="text-blue-500 underline">
                {video.title}
              </button>
              <button onClick={() => onDeleteVideo(video.id)} className="text-red-500 ml-4">
                Delete
              </button>
            </li>
        ))}
      </ul>
  );
};

export default VideoList;
