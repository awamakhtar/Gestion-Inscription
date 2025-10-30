import { useState } from 'react';
import StepIndicator from '../components/registration/StepIndicator';
import StudentInfoForm from '../components/registration/StudentInfoForm';
import ParentInfoForm from '../components/registration/ParentInfoForm';
import DocumentsUpload from '../components/registration/DocumentsUpload';
import RegistrationSummary from '../components/registration/RegistrationSummary';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    student: {},
    parent: {},
    documents: {}
  });

  const steps = [
    'Informations élève',
    'Informations parent',
    'Documents',
    'Récapitulatif'
  ];

  const handleStudentNext = (data) => {
    setFormData({ ...formData, student: data });
    setCurrentStep(1);
  };

  const handleParentNext = (data) => {
    setFormData({ ...formData, parent: data });
    setCurrentStep(2);
  };

  const handleDocumentsNext = (data) => {
    setFormData({ ...formData, documents: data.documents });
    setCurrentStep(3);
  };

  const handleEdit = (section) => {
    const stepMap = {
      student: 0,
      parent: 1,
      documents: 2
    };
    setCurrentStep(stepMap[section]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Formulaire d'inscription
          </h1>
          <p className="text-gray-600">
            Remplissez toutes les informations demandées pour compléter votre inscription
          </p>
        </div>

        <div className="card">
          <StepIndicator steps={steps} currentStep={currentStep} />

          {currentStep === 0 && (
            <StudentInfoForm 
              onNext={handleStudentNext}
              initialData={formData.student}
            />
          )}

          {currentStep === 1 && (
            <ParentInfoForm
              onNext={handleParentNext}
              onBack={() => setCurrentStep(0)}
              initialData={formData.parent}
            />
          )}

          {currentStep === 2 && (
            <DocumentsUpload
              onNext={handleDocumentsNext}
              onBack={() => setCurrentStep(1)}
              initialData={formData}
            />
          )}

          {currentStep === 3 && (
            <RegistrationSummary
              data={formData}
              onBack={() => setCurrentStep(2)}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;