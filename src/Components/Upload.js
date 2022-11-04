import React, { useState } from "react";
import "./Upload.css";
import { Line } from "rc-progress";
import Upload from "rc-upload";
import { storage } from "./../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export default function App() {
  const [percentage, setPercentage] = useState(0);
  const [imgData, setImgdata] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState();
  const [fileSize, setFileSize] = useState();
  const [file, setFile] = useState();

  // Handle file upload event and update state
  function handleChange(event) {
       
    console.log(event.target.files);
    setFile(URL.createObjectURL(event.target.files[0]));
 
}

  const props = {
    action: "https://httpbin.org/post",
    accept: ".png, .pdf, .jpg, .txt",
    beforeUpload(file) {
      // Start upload
      setIsUploading(true);
      // Set file details
      setFileName(file.name);

      setFileSize(Math.floor(file.size / 1000));
      const storageRef = ref(storage, `/files/${file.name}`);
 
      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);


      // Display image for .png format
      if (file.type === "image/png") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgdata(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    onSuccess() {
      // Finish upload
      setIsUploading(false);
    },
    onProgress(step) {
      // Update progress
      setPercentage(Math.round(step.percent));
    },
    onError(err) {
      console.log("onError", err);
    }
  };

  return (
    <div className="App">
      {fileName && (
        <React.Fragment>
          {imgData && (
            <div>
              <img src={imgData} alt="uploaded" width="250" />
            </div>
          )}
          <div className="upload-list">
            <div className="file-name">
              <b>{fileName}</b>
            </div>
            <div className="progress-container">
              <Line
                percent={percentage}
                strokeWidth={2}
                trailWidth={2}
                trailColor="#FFF"
                strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
              />
              <div className="progress-text">
                {isUploading ? `Uploading ${percentage}% ` : `Finished`}
              </div>
            </div>
            
            <div className="file-size">File size: {`${fileSize} KB`}</div>
          </div>
        </React.Fragment>
      )}
      <Upload {...props}>
      
        <button id="upload-button" onChange={handleChange} >Choose a File</button>
       
       
       
      </Upload>
    </div>
  );
}