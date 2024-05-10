import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { IoMdCloudUpload } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import '../Upload/Upload.css'
const Upload = () => {
  const inputRef = useRef();
  const navigate = useNavigate(); // Hook for navigation
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      // Process the uploaded file
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      // Perform any additional processing with jsonData
      console.log("Parsed data:", jsonData);

      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error processing the file:", error);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click(); // Simulate click on the hidden file input
  };

  const removeFile = () => {
    setSelectedFile(null); // Clear the selected file
  };

  return (
    <div className="Boxmodal-1">
      <div className="Boxmodal-2">
        <input
          type="file"
          ref={inputRef}
          onChange={handleOnChange}
          style={{ display: "none" }}
        />
        <button className="file-btn" onClick={onChooseFile}>
          <IoMdCloudUpload style={{ height: "50px", width: "50px" }} /> Upload File
        </button>

        {selectedFile && (
          <div className="selected-file">
            <p>{selectedFile.name}</p>
            <button onClick={removeFile}>Delete</button>
          </div>
        )}
      </div>
      <div className="format">
        <p>Accepted File Formats: .xlsx, .csv, .xlx</p>
      </div>
    </div>
  );
};

export default Upload;
