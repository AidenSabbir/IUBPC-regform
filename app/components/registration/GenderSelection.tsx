import React from 'react';
import Image from 'next/image';
import { FormStepProps } from '@/app/types/registration';
import NavigationButtons from '../ui/NavigationButtons';
import { genderSchema } from '@/app/lib/validation';

const GenderSelection: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const handleGenderSelect = (gender: 'male' | 'female') => {
    updateFormData({ gender });
    setError(null);
  };

  const handleNext = () => {
    const result = genderSchema.safeParse({ gender: formData.gender });
    if (result.success) {
      nextStep();
    } else {
      setError(result.error.issues[0].message); // Use the message from refinement
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto z-10">
      <h2 className="text-xl text-[#00FFFF] mb-8 text-center uppercase tracking-wider drop-shadow-[2px_2px_0_#000] bg-black/80 px-8 py-3 rounded-full border border-[#00FFFF]/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
        SELECT YOUR CHARACTER
      </h2>

      <div className="flex flex-row gap-8 justify-center items-end mb-12">
        {/* Female Character */}
        <div
          onClick={() => handleGenderSelect('female')}
          className={`
            cursor-pointer flex flex-col items-center gap-4
            ${formData.gender === 'female' ? 'scale-110 drop-shadow-[0_0_15px_#FF3FB4]' : 'opacity-80 hover:opacity-100 hover:scale-105'}
          `}
        >
          <div className={`
            relative w-[100px] h-[100px] 
            ${formData.gender === 'female' ? 'border-4 border-[#FF3FB4]' : 'border-transparent'}
          `}>
            <Image
              src="/female_v2.png"
              alt="Female Character"
              fill
              className="object-contain pixel-card"
              priority
            />
          </div>
          <span className={`text-lg px-4 py-1 bg-black/70 rounded-full border border-white/10 ${formData.gender === 'female' ? 'text-[#FF3FB4] border-[#FF3FB4]/50' : 'text-[#00FF00]'}`}>
            FEMALE
          </span>
        </div>

        {/* Male Character */}
        <div
          onClick={() => handleGenderSelect('male')}
          className={`
            cursor-pointer flex flex-col items-center gap-4
            ${formData.gender === 'male' ? 'scale-110 drop-shadow-[0_0_15px_#00FFFF]' : 'opacity-80 hover:opacity-100 hover:scale-105'}
          `}
        >
          <div className={`
            relative w-[100px] h-[100px] 
            ${formData.gender === 'male' ? 'border-4 border-[#00FFFF]' : 'border-transparent'}
          `}>
            <Image
              src="/male_v2.png"
              alt="Male Character"
              fill
              className="object-contain pixel-card"
              priority
            />
          </div>
          <span className={`text-lg px-4 py-1 bg-black/70 rounded-full border border-white/10 ${formData.gender === 'male' ? 'text-[#00FFFF] border-[#00FFFF]/50' : 'text-[#00FF00]'}`}>
            MALE
          </span>
        </div>
      </div>

      {error && (
        <div className="text-[#FF0000] text-xs mb-4 bg-black/50 p-2 rounded border border-red-500">
          ! {error}
        </div>
      )}

      <NavigationButtons
        onBack={prevStep}
        onNext={handleNext}
        disableNext={!formData.gender}
      />
    </div>
  );
};

export default GenderSelection;

