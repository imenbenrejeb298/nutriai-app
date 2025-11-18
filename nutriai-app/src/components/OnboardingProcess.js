import React, { useState } from 'react';
import NameStep from './onboarding/NameStep';
import MeasurementsStep from './onboarding/MeasurementsStep';
import ConditionsStep from './onboarding/ConditionsStep';

function OnboardingProcess({ onOnboardingComplete }) {
  const [step, setStep] = useState(1);

  // State for all collected data
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [conditions, setConditions] = useState({ diabetes: false, hypertension: false });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFinish = () => {
    const profileData = { name, weight, height, age, conditions };
    onOnboardingComplete(profileData);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 rounded-full h-3 mb-12 shadow-inner">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 shadow-medium" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        {/* Steps Content */}
        <div style={{ minHeight: '400px' }}>
          {step === 1 && <NameStep name={name} setName={setName} onNext={nextStep} />}
          {step === 2 && <MeasurementsStep weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} age={age} setAge={setAge} onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <ConditionsStep conditions={conditions} setConditions={setConditions} onFinish={handleFinish} onBack={prevStep} />}
        </div>
      </div>
    </div>
  );
}

export default OnboardingProcess;
