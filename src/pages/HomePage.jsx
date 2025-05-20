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
//     <div className="bg-gradient-to-b from-[#f0f0f0] to-[#ffffff] min-h-screen flex flex-col items-center">
//       <div className="max-w-7xl px-10 py-12">
//         <div className="space-y-12">
//           {/* Title input field */}
//           <div className="flex flex-col items-center mb-6">
//             <label htmlFor="fileTitle" className="mb-2 text-lg">
//               Add Custom Filename:
//             </label>
//             <input
//               type="text"
//               id="fileTitle"
//               value={fileTitle}
//               onChange={handleTitleChange}
//               placeholder="Enter custom filename"
//               className="px-4 py-2 border rounded-md w-full max-w-md"
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               This name will be used for your uploaded file(s)
//             </p>
//           </div>

//           <div className="flex flex-col items-center">
//             <h1 className="text-4xl tracking-tighter">
//               Upload a file via button
//             </h1>
//             <UploadButton
//               options={optionsforButton}
//               onComplete={processFileUpload}
//             >
//               {({ onClick }) => (
//                 <button
//                   onClick={onClick}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
//                 >
//                   Upload a file...
//                 </button>
//               )}
//             </UploadButton>
//           </div>

//           <div className="flex flex-col items-center">
//             <h1 className="text-4xl tracking-tighter">
//               Upload a file via DropZone
//             </h1>
//             <UploadDropzone
//               options={optionsforDropzone}
//               onUpdate={({ uploadedFiles }) =>
//                 console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))
//               }
//               onComplete={processFileUpload}
//               width="1000px"
//               height="375px"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


"use client"

import { useState } from "react"
import { UploadButton, UploadDropzone } from "@bytescale/upload-widget-react"
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
    <div className="bg-gradient-to-b from-[#f0f0f0] to-[#ffffff] min-h-screen flex items-center justify-center p-4">
      <div className="max-w-7xl w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Filename input */}
          <div className="w-full md:w-1/3 p-8 bg-gray-50 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">File Details</h2>
            <div className="space-y-4">
              <label htmlFor="fileTitle" className="block text-lg font-medium text-gray-700">
                Custom Filename:
              </label>
              <input
                type="text"
                id="fileTitle"
                value={fileTitle}
                onChange={handleTitleChange}
                placeholder="Enter custom filename"
                className="px-4 py-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <p className="text-sm text-gray-500 mt-1">This name will be used for your uploaded file(s)</p>
            </div>
          </div>

          {/* Right side - Upload options */}
          <div className="w-full md:w-2/3 p-8">
            <div className="space-y-8">
              {/* Upload button section */}
              <div className="border-b pb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload by Button</h2>
                <div className="flex justify-center">
                  <UploadButton options={optionsforButton} onComplete={processFileUpload}>
                    {({ onClick }) => (
                      <button
                        onClick={onClick}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors font-medium"
                      >
                        Select a file to upload
                      </button>
                    )}
                  </UploadButton>
                </div>
              </div>

              {/* Upload dropzone section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload by Dropzone</h2>
                <UploadDropzone
                  options={optionsforDropzone}
                  onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))}
                  onComplete={processFileUpload}
                  width="100%"
                  height="250px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
