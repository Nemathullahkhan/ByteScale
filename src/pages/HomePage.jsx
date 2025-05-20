import React, { useState } from "react";
import { UploadButton } from "@bytescale/upload-widget-react";
import { UploadDropzone } from "@bytescale/upload-widget-react";

const HomePage = () => {
  const [fileTitle, setFileTitle] = useState(""); 
  const optionsforButton = {
    apiKey: "public_W23MTC57Cvt5Zx2WwPYnTDxy9g8E", 
    maxFileCount: 1,
    metadata: {
      userSpecifiedFilename: fileTitle || undefined 
    }
  };
  
  // Options for the dropzone with the same metadata setup
  const optionsforDropzone = {
    apiKey: "public_W23MTC57Cvt5Zx2WwPYnTDxy9g8E", 
    maxFileCount: 1,
    showFinishButton: true,
    styles: {
      colors: {
        primary: "#377dff"
      }
    },
    metadata: {
      userSpecifiedFilename: fileTitle || undefined 
    }
  };

  // Function to update the title state
  const handleTitleChange = (e) => {
    setFileTitle(e.target.value);
  };

  // Check to add file extension if needed
  const processFileUpload = (files) => {
    const fileUrls = files.map(x => x.fileUrl).join("\n");
    alert(`Files uploaded: ${fileUrls}`);
    console.log(`Custom filename used: ${fileTitle || "No custom name provided"}`);
  };

  return (
    <div className="bg-gradient-to-b from-[#f0f0f0] to-[#ffffff] min-h-screen flex flex-col items-center">
      <div className="max-w-7xl px-10 py-12">
        <div className="space-y-12">
          {/* Title input field */}
          <div className="flex flex-col items-center mb-6">
            <label htmlFor="fileTitle" className="mb-2 text-lg">Add Custom Filename:</label>
            <input
              type="text"
              id="fileTitle"
              value={fileTitle}
              onChange={handleTitleChange}
              placeholder="Enter custom filename"
              className="px-4 py-2 border rounded-md w-full max-w-md"
            />
            <p className="text-sm text-gray-500 mt-1">
              This name will be used for your uploaded file(s)
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-4xl tracking-tighter">
              Upload a file via button
            </h1>
            <UploadButton
              options={optionsforButton}
              onComplete={processFileUpload}
            >
              {({ onClick }) => (
                <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2">
                  Upload a file...
                </button>
              )}
            </UploadButton>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-4xl tracking-tighter">
              Upload a file via DropZone
            </h1>
            <UploadDropzone 
              options={optionsforDropzone}
              onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
              onComplete={processFileUpload}
              width="1000px"
              height="375px" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;