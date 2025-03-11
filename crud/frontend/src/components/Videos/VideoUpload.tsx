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
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-md mx-auto">
            <div>
                <label className="block text-sm font-medium">Video Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full border rounded p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Choose Video File</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    required
                    className="mt-1 block w-full"
                />
            </div>
            <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded hover:bg-primary-hover transition">
                Upload Video
            </button>
        </form>
    );
};

export default VideoUpload;
