// import React, { useState } from "react";
// import { UploadButton } from "@bytescale/upload-widget-react";
// import { UploadDropzone } from "@bytescale/upload-widget-react";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const [fileTitle, setFileTitle] = useState("");
//   const navigate = useNavigate();
//   const optionsforButton = {
//     apiKey: "public_W23MTC57Cvt5Zx2WwPYnTDxy9g8E",
//     maxFileCount: 1,
//     metadata: {
//       userSpecifiedFilename: fileTitle || undefined,
//     },
//   };

//   // Options for the dropzone with the same metadata setup
//   const optionsforDropzone = {
//     apiKey: "public_W23MTC57Cvt5Zx2WwPYnTDxy9g8E",
//     maxFileCount: 1,
//     showFinishButton: true,
//     styles: {
//       colors: {
//         primary: "#377dff",
//       },
//     },
//     metadata: {
//       userSpecifiedFilename: fileTitle || undefined,
//     },
//   };

//   // Function to update the title state
//   const handleTitleChange = (e) => {
//     setFileTitle(e.target.value);
//   };

//   // Check to add file extension if needed
//   const processFileUpload = (files) => {
//     const fileUrls = files.map((x) => x.fileUrl).join("\n");
//     alert(`Files uploaded: ${fileUrls}`);
//     navigate("/content");
//     console.log(
//       `Custom filename used: ${fileTitle || "No custom name provided"}`
//     );
//   };

//   return (
//     // <div className="bg-gradient-to-b from-[#f0f0f0] to-[#ffffff] min-h-screen flex flex-col items-center">
//     //   <div className="max-w-7xl px-10 py-12">
//     //     <div className="space-y-12 grid-cols-2 ">
//     //       {/* Title input field */}
//     //       <div className="flex flex-col items-center mb-6">
//     //         <label htmlFor="fileTitle" className="mb-2 text-lg">
//     //           Add Custom Filename:
//     //         </label>
//     //         <input
//     //           type="text"
//     //           id="fileTitle"
//     //           value={fileTitle}
//     //           onChange={handleTitleChange}
//     //           placeholder="Enter custom filename"
//     //           className="px-4 py-2 border rounded-md w-full max-w-md"
//     //         />
//     //         <p className="text-sm text-gray-500 mt-1">
//     //           This name will be used for your uploaded file(s)
//     //         </p>
//     //       </div>
//     //       {/* Upload button and dropzone */}
//     //       <div className="space-y-2">
//     //         <div className="flex flex-col items-center">
//     //           <h1 className="text-4xl tracking-tighter">
//     //             Upload a file via button
//     //           </h1>
//     //           <UploadButton
//     //             options={optionsforButton}
//     //             onComplete={processFileUpload}
//     //           >
//     //             {({ onClick }) => (
//     //               <button
//     //                 onClick={onClick}
//     //                 className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
//     //               >
//     //                 Upload a file...
//     //               </button>
//     //             )}
//     //           </UploadButton>
//     //         </div>

//     //         <div className="flex flex-col items-center">
//     //           <h1 className="text-4xl tracking-tighter">
//     //             Upload a file via DropZone
//     //           </h1>
//     //           <UploadDropzone
//     //             options={optionsforDropzone}
//     //             onUpdate={({ uploadedFiles }) =>
//     //               console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))
//     //             }
//     //             onComplete={processFileUpload}
//     //             width="1000px"
//     //             height="375px"
//     //           />
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>

//     <div className="bg-gradient-to-b from-[#f0f0f0] to-[#ffffff] min-h-screen">
//   <div className="max-w-7xl mx-auto px-10 py-12">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//       {/* Left Section - File Title and Button Upload */}
//       <div className="space-y-8">
//         {/* Title input field */}
//         <div className="flex flex-col items-center mb-6">
//           <label htmlFor="fileTitle" className="mb-2 text-lg font-medium">
//             Add Custom Filename:
//           </label>
//           <input
//             type="text"
//             id="fileTitle"
//             value={fileTitle}
//             onChange={handleTitleChange}
//             placeholder="Enter custom filename"
//             className="px-4 py-2 border rounded-md w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             This name will be used for your uploaded file(s)
//           </p>
//         </div>

        
//       </div>

//       {/* Right Section - Dropzone Upload */}
//       <div className="flex flex-col space-y-4">
//         {/* Button Upload Section */}
//         <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md">
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-center">
//             Upload via Button
//           </h1>
//           <UploadButton
//             options={optionsforButton}
//             onComplete={processFileUpload}
//           >
//             {({ onClick }) => (
//               <button
//                 onClick={onClick}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
//               >
//                 Select Files to Upload
//               </button>
//             )}
//           </UploadButton>
//           <p className="text-sm text-gray-500 text-center">
//             Click the button to browse your files
//           </p>
//         </div>

//         <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md h-full">
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-center mb-4">
//             Or Drag & Drop Files
//           </h1>
//           <UploadDropzone
//             options={optionsforDropzone}
//             onUpdate={({ uploadedFiles }) =>
//               console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))
//             }
//             onComplete={processFileUpload}
//             width="100%"
//             height="300px"
//             className="border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
//           />
//           <p className="text-sm text-gray-500 text-center mt-4">
//             Drag your files here or click to browse
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
//   );
// };

// export default HomePage;

"use client"

import { useState } from "react"
import { UploadButton } from "@bytescale/upload-widget-react"
import { UploadDropzone } from "@bytescale/upload-widget-react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const [fileTitle, setFileTitle] = useState("")
  const navigate = useNavigate()

  const optionsforButton = {
    apiKey: "public_W23MTC57Cvt5Zx2WwPYnTDxy9g8E",
    maxFileCount: 1,
    metadata: {
      userSpecifiedFilename: fileTitle || undefined,
    },
  }

  const optionsforDropzone = {
    apiKey: "public_W23MTC57Cvt5Zx2WwPYnTDxy9g8E",
    maxFileCount: 1,
    showFinishButton: true,
    styles: {
      colors: {
        primary: "#377dff",
      },
    },
    metadata: {
      userSpecifiedFilename: fileTitle || undefined,
    },
  }

  const handleTitleChange = (e) => {
    setFileTitle(e.target.value)
  }

  const processFileUpload = (files) => {
    const fileUrls = files.map((x) => x.fileUrl).join("\n")
    alert(`Files uploaded: ${fileUrls}`)
    navigate("/content")
    console.log(`Custom filename used: ${fileTitle || "No custom name provided"}`)
  }

  return (
    <div className="bg-gradient-to-b from-[#f0f0f0] to-[#ffffff] min-h-screen p-2">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Left Section - File Title Input (1/3 width) */}
          <div className="md:col-span-1">
            <div className="w-full p-3 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-2">File Details</h2>

              {/* Title input field */}
              <div className="flex flex-col">
                <label htmlFor="fileTitle" className="mb-1 text-sm font-medium">
                  Add Custom Filename:
                </label>
                <input
                  type="text"
                  id="fileTitle"
                  value={fileTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter custom filename"
                  className="px-3 py-1.5 border rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">This name will be used for your uploaded file(s)</p>
              </div>
            </div>
          </div>

          {/* Right Section - Both Upload Methods (2/3 width) */}
          <div className="md:col-span-2 space-y-3">
            {/* Button Upload Section */}
            <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-center mb-2">Upload via Button</h2>
              <UploadButton options={optionsforButton} onComplete={processFileUpload}>
                {({ onClick }) => (
                  <button
                    onClick={onClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Select Files to Upload
                  </button>
                )}
              </UploadButton>
              <p className="text-xs text-gray-500 text-center mt-1">Click to browse files</p>
            </div>

            {/* Dropzone Upload Section */}
            <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-center mb-2">Or Drag & Drop Files</h2>
              <UploadDropzone
                options={optionsforDropzone}
                onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))}
                onComplete={processFileUpload}
                width="100%"
                height="180px"
                className="border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
              />
              <p className="text-xs text-gray-500 text-center mt-1">Drag files here or click to browse</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
