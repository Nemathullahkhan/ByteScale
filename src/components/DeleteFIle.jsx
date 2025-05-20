// import React from 'react'

// const DeleteFIle = (filePath) => {
//   return (
//     <div>DeleteFIle</div>
//   )
// }

// export default DeleteFIle
import React from 'react';
import * as Bytescale from "@bytescale/sdk";

const DeleteFile = ({ filePath, accountId, onDelete, onCancel }) => {
  const handleDelete = async () => {
    try {
      const fileApi = new Bytescale.FileApi({
        apiKey: "secret_W23MTC5EC7ByUwctTgyEA4Lk7Ads",
      });

      await fileApi.deleteFile({
        accountId: accountId,
        filePath: filePath,
      });

      onDelete();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this file? This action cannot be undone.</p>
        
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFile;