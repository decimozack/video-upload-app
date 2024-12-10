import React, { useState } from 'react';
import styles from './StepTwo.module.css';

interface StepTwoProps {
  agreement: boolean;
  onAgreementChange: (metadata: { agreement: boolean }) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  agreement,
  onAgreementChange,
  nextStep,
  prevStep,
}) => {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (agreement) {
      setError('');
      nextStep();
    } else {
      setError('You must agree to the Terms and Conditions to proceed.');
    }
  };

  const handleAgreementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onAgreementChange({ agreement: event.target.checked });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Step 2: Terms and Conditions</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <h5>Terms and Conditions</h5>
              <p className="text-muted">
                <b>By uploading a video, you agree to the following terms:</b>
                <div className="row">
                  <ul className={styles.customList}>
                    <li>Your video must comply with community guidelines.</li>
                    <li>
                      You must have the right to distribute the video content.
                    </li>
                    <li>
                      Uploaded videos may be processed and stored on our
                      servers.
                    </li>
                  </ul>
                </div>
              </p>
            </div>

            <div className="d-flex justify-content-center align-items-center mb-3">
              <input
                type="checkbox"
                id="agreement"
                className="form-check-input me-2"
                checked={agreement}
                onChange={handleAgreementChange}
              />
              <label htmlFor="agreement" className="form-check-label">
                I agree to the Terms and Conditions
              </label>
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}

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

export default StepTwo;
