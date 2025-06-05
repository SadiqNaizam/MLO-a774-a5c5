import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Send, UserPlus, FileText } from 'lucide-react'; // Example icons

interface Step {
  id: number;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode; // Placeholder for actual form content per step
}

interface JointAccountStepperProps {
  steps: Step[];
  initialStep?: number;
  onComplete?: () => void; // Callback when the final step is completed
}

const JointAccountStepper: React.FC<JointAccountStepperProps> = ({
  steps,
  initialStep = 0,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  console.log("Rendering JointAccountStepper, currentStep:", currentStep);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1 && onComplete) {
      console.log("Stepper complete, calling onComplete");
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!steps || steps.length === 0) {
    return <p>No steps defined for the stepper.</p>;
  }

  const activeStep = steps[currentStep];

  return (
    <div className="w-full p-4 space-y-6 bg-white rounded-lg shadow">
      {/* Stepper Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={`flex flex-col items-center cursor-pointer ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}
              onClick={() => setCurrentStep(index)} // Allow clicking to navigate (optional)
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index < currentStep ? 'bg-blue-600 border-blue-600 text-white' :
                  index === currentStep ? 'border-blue-600 text-blue-600' :
                  'border-gray-300 text-gray-400'
                }`}
              >
                {index < currentStep ? <CheckCircle size={18} /> : <step.icon size={18} />}
              </div>
              <p className={`mt-1 text-xs font-medium ${index === currentStep ? 'text-blue-700' : ''}`}>{step.title}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="step-content min-h-[200px]"> {/* Ensure content area has some height */}
        <h3 className="text-lg font-semibold mb-2">{activeStep.title}</h3>
        {activeStep.content || <p className="text-gray-600">Content for {activeStep.title} goes here.</p>}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <Button onClick={handlePrev} disabled={currentStep === 0} variant="outline">
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

// Example usage (developer would provide actual steps and content)
/*
const exampleSteps: Step[] = [
  { id: 1, title: "Your Details", icon: User, content: <div>Form for primary applicant...</div> },
  { id: 2, title: "Invite Partner", icon: UserPlus, content: <div>Form to invite partner...</div> },
  { id: 3, title: "Review & Confirm", icon: FileText, content: <div>Summary and T&Cs...</div> },
];

<JointAccountStepper steps={exampleSteps} onComplete={() => alert("Joint Account Application Submitted!")} />
*/

export default JointAccountStepper;