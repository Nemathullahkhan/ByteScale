import React from 'react'

const ProcessImage = ({fileUrl}) => {
    const imageUrl = fileUrl.replace(/\/image\//g, '/raw/');
  return (
    <div>
      <img 
        src={imageUrl} 
        alt="Processed image" 
        style={{ maxWidth: '100%', height: 'auto' }} 
        onError={(e) => {
          e.target.alt = 'Failed to load image';
        }}
      />
    </div>
  )
}

export default ProcessImage