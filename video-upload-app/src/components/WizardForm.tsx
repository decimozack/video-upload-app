import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

interface VideoMetadata {
  title: string;
  startDateTime: string;
  postalCode?: string;
  agreement: boolean;
}

const WizardForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata>({
    title: '',
    startDateTime: '',
    postalCode: '',
    agreement: false,
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const resetForm = () => {
    setCurrentStep(1);
    setVideoFile(null);
    setMetadata({
      title: '',
      startDateTime: '',
      postalCode: '',
      agreement: false,
    });
    setUploadProgress(0);
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
      <div className="h5 display-5 mt-5">Video Upload Application</div>
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
          {currentStep === 3 && (
            <StepThree
              videoFile={videoFile}
              metadata={metadata}
              uploadProgress={uploadProgress}
              setUploadProgress={setUploadProgress}
              prevStep={prevStep}
              resetForm={resetForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WizardForm;
