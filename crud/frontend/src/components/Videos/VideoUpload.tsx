import React, { useState } from "react";

interface VideoUploadProps {
    onUpload: (file: File, title: string) => Promise<void>;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (file && title) {
            await onUpload(file, title);
            setFile(null);
            setTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6 p-8 bg-white rounded-xl shadow-xl">
            <div>
                <label className="block text-lg font-medium text-gray-700">
                    Video Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div>
                <label className="block text-lg font-medium text-gray-700">
                    Choose Video File
                </label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    required
                    className="mt-2 block w-full text-gray-700"
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md shadow hover:opacity-90 transition duration-300"
            >
                Upload Video
            </button>
        </form>
    );
};

export default VideoUpload;
