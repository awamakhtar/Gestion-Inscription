import { Check } from 'lucide-react';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Cercle avec numéro ou check */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                ${index < currentStep ? 'bg-green-500 text-white' : 
                  index === currentStep ? 'bg-primary-600 text-white' : 
                  'bg-gray-200 text-gray-500'}
              `}>
                {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              
              {/* Label */}
              <span className={`
                mt-2 text-xs sm:text-sm text-center
                ${index === currentStep ? 'text-primary-600 font-semibold' : 'text-gray-500'}
              `}>
                {step}
              </span>
            </div>

            {/* Ligne de connexion */}
            {index < steps.length - 1 && (
              <div className={`
                h-1 flex-1 mx-2
                ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;