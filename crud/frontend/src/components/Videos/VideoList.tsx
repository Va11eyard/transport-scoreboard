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

const VideoList: React.FC<VideoListProps> = ({ videos, onSelectVideo, onDeleteVideo }) => {
  return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Videos
        </h2>
        <ul className="space-y-6">
          {videos.map((video) => (
              <li
                  key={video.id}
                  className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <button
                    onClick={() => onSelectVideo(video)}
                    className="flex-grow text-left text-2xl font-medium text-gray-800 hover:text-blue-500 transition duration-300"
                >
                  {video.title}
                </button>
                <button
                    onClick={() => onDeleteVideo(video.id)}
                    className="ml-6 flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out shadow-md"
                >
                  <svg
                      className="h-6 w-6 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Delete
                </button>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default VideoList;
