import { useState } from "react";
import StepResume from "./StepResume";
import StepJob from "./StepJob";
import StepReview from "./StepReview";
import ProgressBar from "./ProgressBar";

export default function FormWizard() {
    const totalSteps = 3; // Total number of steps in the wizard
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    resumeFile: null,
    jobTitle: "",
    jobDescription: ""
  });

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {step === 1 && (
        <StepResume data={formData} updateFormData={updateFormData} nextStep={nextStep} />
      )}
      {step === 2 && (
        <StepJob
          data={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <StepReview data={formData} prevStep={prevStep} />
      )}
    </div>
  );
}
