import React, { useState } from 'react';
import { AxiosProgressEvent } from 'axios';
import FileUploadAPI from '../api/FileUploadAPI';

interface StepThreeProps {
  videoFile: File | null;
  metadata: {
    title: string;
    startDateTime: string;
    postalCode?: string;
  };
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
  prevStep: () => void;
  resetForm: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  videoFile,
  metadata,
  uploadProgress,
  setUploadProgress,
  prevStep,
  resetForm,
}) => {
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'success' | 'failure'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpload = async () => {
    if (!videoFile) {
      setErrorMessage('No video file selected for upload.');
      return;
    }

    setUploadStatus('idle');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', metadata.title);
    formData.append('startDateTime', metadata.startDateTime);
    if (metadata.postalCode) {
      formData.append('postalCode', metadata.postalCode);
    }

    try {
      const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        if (!progressEvent.total) {
          setUploadProgress(0);
        }

        const progress = Math.round(
          //@ts-ignore
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      };

      const response = await FileUploadAPI.post(formData, onUploadProgress);

      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('failure');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred during upload. Please try again.');
      }
      setUploadProgress(0);
    }
  };

  const handleResetForm = () => {
    setUploadStatus('idle');
    setErrorMessage('');
    resetForm();
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Step 3: Upload Video</h4>
        </div>
        <div className="card-body">
          {uploadStatus === 'idle' && (
            <>
              <p>
                You are about to upload the following video:
                <strong> {metadata.title}</strong>.
              </p>
              <p>Click the "Upload" button to proceed.</p>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpload}
                  disabled={uploadProgress > 0}
                >
                  Upload
                </button>
              </div>
            </>
          )}

          {uploadStatus === 'success' && (
            <div className="text-center">
              <h5 className="text-success">Upload Successful!</h5>
              <p>Your video has been uploaded successfully.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleResetForm}
              >
                Upload File Again
              </button>
            </div>
          )}

          {uploadStatus === 'failure' && (
            <div className="text-center">
              <h5 className="text-danger">Upload Failed</h5>
              <p>{errorMessage}</p>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpload}
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {uploadStatus === 'idle' && uploadProgress > 0 && (
            <div className="mt-4">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%` }}
                  aria-valuenow={uploadProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {uploadProgress}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepThree;
