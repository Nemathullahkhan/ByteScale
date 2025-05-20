import React, { useState, useEffect } from "react";
import * as Bytescale from "@bytescale/sdk";
import { useFileContext } from "../context/FileContext";

const FilePage = () => {
  const { selectedFileUrl } = useFileContext();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we have a selectedFileUrl from context, save it to localStorage
    if (selectedFileUrl) {
      localStorage.setItem('lastViewedFileUrl', selectedFileUrl);
    }

    const fetchFileDetails = async () => {
      // Try to get fileUrl from context first, then fallback to localStorage
      const fileUrl = selectedFileUrl || localStorage.getItem('lastViewedFileUrl');
      
      if (!fileUrl) {
        setError("No file URL provided");
        setLoading(false);
        return;
      }

      try {
        // Extract filePath from fileUrl
        // Bytescale URLs typically follow a pattern like:
        // https://upcdn.io/W23MTC5/raw/uploads/2025/05/20/filename.ext
        const urlParts = fileUrl.split('/');
        const accountId = urlParts[3]; // This should be W23MTC5
        
        // Reconstruct the filePath by taking everything after the accountId and "raw"
        const pathIndex = urlParts.indexOf('raw') + 1;
        const filePath = '/' + urlParts.slice(pathIndex).join('/');

        const fileApi = new Bytescale.FileApi({
          apiKey: "secret_W23MTC5EC7ByUwctTgyEA4Lk7Ads",
        });

        const result = await fileApi.getFileDetails({
          accountId: accountId,
          filePath: filePath,
        });

        setFile(result);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching file details:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [selectedFileUrl]);

  if (loading) return <div>Loading file details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!file) return <div>File not found</div>;

  // Helper function to get original file name
  const getOriginalFileName = (file) => {
    return file.metadata?.userSpecifiedFilename || 
           file.originalFileName?.split("%20").join(" ") || 
           file.filePath.split("/").pop().split("%20").join(" ");
  };

  return (
    <div className="max-w-7xl px-10 py-12">
      <div className="space-y-12">
        <div className="flex">
          <h1 className="text-5xl tracking-tighter font-bold">
            {getOriginalFileName(file)}
          </h1>
        </div>
        
        <div className="p-4 border rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">File jfhaljhdaInformation</h3>
              <p><strong>Type:</strong> {file.mime || "N/A"}</p>
              <p><strong>Size:</strong> {formatFileSize(file.size)}</p>
              <p>
                <strong>Last Modified:</strong>{" "}
                {new Date(file.lastModified).toLocaleString()}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Actions</h3>
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download File
              </a>
            </div>
          </div>
        </div>

        {/* File-specific viewers based on file type */}
        {file.mime?.startsWith('image/') && (
          <div className="mt-8">
            <img 
              src={file.fileUrl} 
              alt={getOriginalFileName(file)} 
              className="max-w-full rounded-lg shadow"
            />
          </div>
        )}
        
        {/* Add audio player for audio files */}
        {file.mime?.startsWith('audio/') && (
          <div className="mt-8">
            <audio 
              controls
              src={file.fileUrl}
              className="w-full"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        
        {/* Add video player for video files */}
        {file.mime?.startsWith('video/') && (
          <div className="mt-8">
            <video 
              controls
              src={file.fileUrl}
              className="max-w-full rounded-lg shadow"
            >
              Your browser does not support the video element.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

// Reuse your formatFileSize function
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default FilePage;