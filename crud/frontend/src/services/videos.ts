// videos.ts
import api from "./api";

interface Video {
  id: number;
  title: string;
  file_path: string;
}

interface PageResponse<T> {
  content: T[];
  pageable: any;
  totalElements: number;
  totalPages: number;
}

export const getVideos = async (): Promise<Video[]> => {
  const response = await api.get<PageResponse<Video>>("/videos"); // Use "/videos", not "/api/videos"
  return response.data.content;
};

export const uploadVideo = async (file: File, title: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  const response = await api.post("/videos", formData, { // Use "/videos", not "/api/videos"
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteVideo = async (videoId: number) => {
  const response = await api.delete(`/videos/${videoId}`); // Use "/videos", not "/api/videos"
  return response.data;
};