import React from 'react';

interface FileUploadProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  videoFile: File | null;
  errorVideoFile: string;
}

const FileUpload: React.FC<FileUploadProps> = React.memo(
  ({ handleFileChange, videoFile, errorVideoFile }) => {
    return (
      <div className="mb-4">
        <label htmlFor="videoFile" className="form-label">
          Upload Video <span className="text-danger">*</span>
        </label>
        <input
          type="file"
          id="videoFile"
          className="form-control"
          accept="video/*"
          onChange={handleFileChange}
        />
        {errorVideoFile && (
          <div className="text-danger mt-1">{errorVideoFile}</div>
        )}
        {videoFile && (
          <div className="mt-3">
            <p>
              <strong>File Name:</strong> {videoFile.name}
            </p>
            <video
              src={URL.createObjectURL(videoFile)}
              controls
              className="w-100 rounded shadow"
              style={{ maxWidth: '400px' }}
            />
          </div>
        )}
      </div>
    );
  }
);

export default FileUpload;
