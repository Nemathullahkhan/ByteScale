import React from 'react';
import * as Bytescale from "@bytescale/sdk";
import { Download } from "lucide-react";

const DownloadFile = ({  accountId, filePath, fileName }) => {
  const handleDownload = async () => {
    try {
      const fileApi = new Bytescale.FileApi({
        apiKey: "secret_W23MTC5EC7ByUwctTgyEA4Lk7Ads",
      });

      const response = await fileApi.downloadFile({
        accountId: accountId,
        filePath: filePath,
      });

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || filePath.split('/').pop();
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
    >
      <Download className="w-5 h-5" />
      <span>Download</span>
    </button>
  );
};

export default DownloadFile;