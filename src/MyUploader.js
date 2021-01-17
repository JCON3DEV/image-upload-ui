import React from 'react'
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

function MyUploader({ fetchUploads }) {
  // specify upload params and url for your files
  const getUploadParams = ({ file }) => {
    const body = new FormData();
    body.append("image", file);
    return { url: "http://localhost:8000/api/uploads", body };
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    // console.log(files.map((f) => f.files));
    allFiles.forEach((file) => file.remove())
    fetchUploads();
  };

  return (
    <div>
      <Dropzone
        getUploadParams={getUploadParams}
        onSubmit={handleSubmit}
        accept="image/*"
        maxFiles={1}
        multiple={false}
        styles={{
          dropzone: { minHeight: 200, maxHeight: 250 },
        }}
      />
    </div>
  );
};
export default MyUploader;