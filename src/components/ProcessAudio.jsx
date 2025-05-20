import React from "react";

const ProcessAudio = ({ fileUrl }) => {
  if (!fileUrl) return <div>No audio URL provided</div>;
  
  const audioUrl = fileUrl.replace(/\/raw\//g, "/audio/");
  return (
    <div className="w-full">
      <audio
        controls
        src={audioUrl}
        className="w-full"
        onError={(e) => {
          console.error("Audio loading error:", e);
          e.target.parentNode.innerHTML = 'Failed to load audio';
        }}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default ProcessAudio;
