import React from "react";

const ProcessAudio = ({ fileUrl }) => {
  const audioUrl = fileUrl.replace(/\/image\//g, "/audio/");
  return (
    <audio
        controls
        src={audioUrl}
        onError={(e) => {
          e.target.nextSibling.textContent = 'Failed to load audio';
        }}
      >
        Your browser does not support the audio element.
      </audio>
  );
};

export default ProcessAudio;
