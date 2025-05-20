import React, { useState, useEffect } from "react";
import * as Bytescale from "@bytescale/sdk";
import ProcessImage from "../components/ProcessImage";
import ProcessAudio from "../components/ProcessAudio";
import { useNavigate } from "react-router-dom";

const ContentPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const folderApi = new Bytescale.FolderApi({
          apiKey: "secret_W23MTC5EC7ByUwctTgyEA4Lk7Ads",
        });

        const result = await folderApi.listFolder({
          accountId: "W23MTC5",
          folderPath: "/uploads/2025/05/20",
          recursive: false,
        });

        console.log(result); // This will show the full response structure

        // If we need to fetch more details for each file
        const detailedFiles = await Promise.all(
          result.items.map(async (item) => {
            try {
              // Only fetch details for files, not folders
              if (item.type === "File") {
                const fileApi = new Bytescale.FileApi({
                  apiKey: "secret_W23MTC5EC7ByUwctTgyEA4Lk7Ads",
                });

                const fileDetails = await fileApi.getFileDetails({
                  accountId: "W23MTC5",
                  filePath: item.filePath,
                });

                return fileDetails;
              }
              return item;
            } catch (err) {
              console.error(
                `Error fetching details for ${item.filePath}:`,
                err
              );
              return item;
            }
          })
        );

        setFiles(detailedFiles);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return <div>Loading files...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to get the original file name
  const getOriginalFileName = (file) => {
    if (file?.metadata?.userSpecifiedFilename) {
      return file.metadata.userSpecifiedFilename;
    }
    // Fallback to originalFileName if available
    if (file?.originalFileName) {
      return file.originalFileName.split("%20").join(" ");
    }
    // Final fallback: extract from filePath
    return file.filePath.split("/").pop().split("%20").join(" ");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Files in Folder</h1>
      <ul className="space-y-4">
        {files.map((file, index) => (
          <button onClick={navigate("/filepage")} className="w-full">
          <li key={index} className="border p-4 rounded-lg shadow">
            <div className="mb-2">
              <strong>File Name:</strong> {getOriginalFileName(file)}
            </div>
            {file.metadata && (
              <div className="mb-2">
                <strong>Metadata:</strong>
                <pre className="bg-gray-100 p-2 rounded mt-1 text-sm overflow-auto">
                  {JSON.stringify(file.metadata.userSpecifiedFilename, null, 2)}
                </pre>
              </div>
            )}
            {file.tags && file.tags.length > 0 && (
              <div className="mb-2">
                <strong>Tags:</strong> {file.tags.join(", ")}
              </div>
            )}
            <div className="mb-2">
              <strong>MIME Type:</strong> {file.mime || "N/A"}
            </div>
            <div className="mb-2">
              <strong>File Path:</strong> {file.filePath}
            </div>
            <div className="mb-2">
              <strong>Size:</strong> {formatFileSize(file.size)}
            </div>
            <div className="mb-2">
              <strong>Last Modified:</strong>{" "}
              {new Date(file.lastModified).toLocaleString()}
            </div>
            {file.type === "File" && (
              <div className="mt-2">
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  View/Download
                </a>
              </div>
            )}
          </li>
          </button>
        ))}
      </ul>
      <ProcessImage fileUrl={files[0]?.fileUrl} />
      <ProcessAudio fileUrl={files[0]?.fileUrl} />
    </div>
  );
};

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default ContentPage;
