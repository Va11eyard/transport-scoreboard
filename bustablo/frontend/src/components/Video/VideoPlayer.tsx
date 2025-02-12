import React from 'react';

interface Props {
  url: string;
}

const VideoPlayer: React.FC<Props> = ({ url }) => {
  return (
    <video width="320" height="240" controls>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
