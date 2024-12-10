import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { isValidPostalCode } from '../utils/Validation';

interface StepOneProps {
  metadata: {
    title: string;
    startDateTime: string;
    postalCode?: string;
  };
  onMetadataChange: (
    updatedMetadata: Partial<StepOneProps['metadata']>
  ) => void;
  onFileChange: (file: File) => void;
  videoFile: File | null;
  nextStep: () => void;
}

const StepOne: React.FC<StepOneProps> = ({
  metadata,
  onMetadataChange,
  onFileChange,
  videoFile,
  nextStep,
}) => {
  const [errors, setErrors] = useState({
    title: '',
    startDateTime: '',
    videoFile: '',
    postalCode: '',
  });

  const validatePostalCode = (postalCode: string | undefined): string => {
    if (typeof postalCode === 'undefined') {
      return '';
    }

    return isValidPostalCode(postalCode)
      ? ''
      : 'Postal code must be 6 digit number';
  };

  const handleFileChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onFileChange(file);
        setErrors((prev) => ({ ...prev, videoFile: '' }));
      }
    },
    []
  );

  const handleMetadataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onMetadataChange({ [event.target.id]: event.target.value });
  };

  const validateInputs = (): boolean => {
    const newErrors = {
      title: metadata.title ? '' : 'Title is required',
      startDateTime: metadata.startDateTime
        ? ''
        : 'Start Date and Time are required',
      videoFile: videoFile ? '' : 'A video file is required',
      postalCode: validatePostalCode(metadata.postalCode),
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleNext = () => {
    if (validateInputs()) {
      nextStep();
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Step 1: Video Details</h4>
        </div>
        <div className="card-body">
          <form>
            <FileUpload
              handleFileChange={handleFileChange}
              videoFile={videoFile}
              errorVideoFile={errors.videoFile}
            />
            {/* Video Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Video Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={metadata.title}
                onChange={handleMetadataChange}
              />
              {errors.title && (
                <div className="text-danger mt-1">{errors.title}</div>
              )}
            </div>

            {/* Start Date and Time */}
            <div className="mb-3">
              <label htmlFor="startDateTime" className="form-label">
                Start Date and Time <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                id="startDateTime"
                className="form-control"
                value={metadata.startDateTime}
                onChange={handleMetadataChange}
              />
              {errors.startDateTime && (
                <div className="text-danger mt-1">{errors.startDateTime}</div>
              )}
            </div>

            {/* Postal Code */}
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location (Postal Code)
              </label>
              <input
                type="number"
                id="postalCode"
                className="form-control"
                value={metadata.postalCode || ''}
                onChange={handleMetadataChange}
              />
              {errors.postalCode && (
                <div className="text-danger mt-1">{errors.postalCode}</div>
              )}
            </div>

            {/* Navigation */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
