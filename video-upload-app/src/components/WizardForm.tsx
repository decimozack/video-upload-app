import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

interface VideoMetadata {
  title: string;
  startDateTime: string;
  location?: string;
  agreement: boolean;
}

const WizardForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata>({
    title: '',
    startDateTime: '',
    location: '',
    agreement: false,
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleMetadataChange = (updatedMetadata: Partial<VideoMetadata>) => {
    setMetadata((prev) => ({
      ...prev,
      ...updatedMetadata,
    }));
  };

  const handleFileChange = (file: File) => {
    setVideoFile(file);
  };

  return (
    <div className="container">
      <h1 className="h1 display-1">Wizard Component</h1>
      <div className="row justify-content-center">
        <div className="col-md-8 mt-4 d-flex justify-content-center">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                {currentStep === 1 ? <b>Step 1</b> : <span>Step 1</span>}
              </li>
              <li className="breadcrumb-item">
                {currentStep === 2 ? <b>Step 2</b> : <span>Step 2</span>}
              </li>
              <li className="breadcrumb-item">
                {currentStep === 3 ? <b>Step 3</b> : <span>Step 3</span>}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 mt-4 mx-auto">
          {currentStep === 1 && (
            <StepOne
              metadata={metadata}
              onMetadataChange={handleMetadataChange}
              onFileChange={handleFileChange}
              videoFile={videoFile}
              nextStep={nextStep}
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              agreement={metadata.agreement}
              onAgreementChange={handleMetadataChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WizardForm;
