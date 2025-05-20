import React from 'react'

const ProcessImage = ({fileUrl}) => {
  if (!fileUrl) return <div>No image URL provided</div>;
  
  const imageUrl = fileUrl.replace(/\/raw\//g, '/image/');
  return (
    <div>
      <img 
        src={imageUrl} 
        alt="Processed image" 
        className="max-w-full h-auto rounded-lg shadow" 
        onError={(e) => {
          e.target.alt = 'Failed to load image';
        }}
      />
    </div>
  )
}

export default ProcessImage