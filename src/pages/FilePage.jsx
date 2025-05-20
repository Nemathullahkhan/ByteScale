import React, { useState, useEffect } from "react";
import * as Bytescale from "@bytescale/sdk";
import { useFileContext } from "../context/FileContext";
import { Pencil, Trash2 } from "lucide-react";
import DeleteFile from "../components/DeleteFIle";
import DownloadFile from "../components/DownloadFile";


const FilePage = () => {
  const { selectedFileUrl } = useFileContext();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (selectedFileUrl) {
      localStorage.setItem('lastViewedFileUrl', selectedFileUrl);
    }

    const fetchFileDetails = async () => {
      const fileUrl = selectedFileUrl || localStorage.getItem('lastViewedFileUrl');
      
      if (!fileUrl) {
        setError("No file URL provided");
        setLoading(false);
        return;
      }

      try {
        const urlParts = fileUrl.split('/');
        const accountId = urlParts[3];
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

  const handleDeleteSuccess = () => {
    window.location.href = '/';
  };



  const getOriginalFileName = (file) => {
    return file.metadata?.userSpecifiedFilename || 
           file.originalFileName?.split("%20").join(" ") || 
           file.filePath.split("/").pop().split("%20").join(" ");
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading file details...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  if (!file) return <div className="flex justify-center items-center h-screen">File not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {showDeleteModal && (
        <DeleteFile
          filePath={file.filePath}
          accountId={file.accountId}
          onDelete={handleDeleteSuccess}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      

      <div className="flex flex-col items-center">
        {/* File Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {getOriginalFileName(file)}
          </h1>
        </div>

        {/* File Viewer */}
        <div className="w-full max-w-4xl flex justify-center mb-8">
          {file.mime?.startsWith('image/') && (
            <img 
              src={file.fileUrl} 
              alt={getOriginalFileName(file)} 
              className="max-w-full max-h-[70vh] rounded-lg shadow-lg object-contain"
            />
          )}
          
          {file.mime?.startsWith('audio/') && (
            <div className="w-full max-w-md">
              <audio 
                controls
                src={file.fileUrl}
                className="w-full"
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          
          {file.mime?.startsWith('video/') && (
            <video 
              controls
              src={file.fileUrl}
              className="max-w-full max-h-[70vh] rounded-lg shadow-lg"
            >
              Your browser does not support the video element.
            </video>
          )}
        </div>

        {/* File Info Card */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center md:text-left">File Information</h3>
              <div className="space-y-2">
                <p><strong>File Name:</strong> {getOriginalFileName(file)}</p>
                <p><strong>File Path:</strong> {file.filePath}</p>
                <p><strong>Type:</strong> {file.mime || "N/A"}</p>
                <p><strong>Size:</strong> {formatFileSize(file.size)}</p>
                <p>
                  <strong>Last Modified:</strong>{" "}
                  {new Date(file.lastModified).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h3 className="text-xl font-semibold">Actions</h3>
              <div className="flex space-x-4">
                <button 
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Edit</span>
                </button>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              </div>
              <DownloadFile
                fileUrl={file.fileUrl}
                accountId={file.accountId}
                filePath={file.filePath}
                fileName={getOriginalFileName(file)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default FilePage;