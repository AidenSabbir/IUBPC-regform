import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStepProps } from '@/app/types/registration';
import NavigationButtons from '../ui/NavigationButtons';
import PixelInput from '../ui/PixelInput';
import { academicInfoSchema } from '@/app/lib/validation';
import { z } from 'zod';

type AcademicInfoForm = z.infer<typeof academicInfoSchema>;

const AcademicInfo: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AcademicInfoForm>({
    resolver: zodResolver(academicInfoSchema),
    defaultValues: {
      major: formData.major,
      semester: formData.semester
    },
    mode: 'onChange'
  });

  const onSubmit = (data: AcademicInfoForm) => {
    updateFormData({
      ...data,
      equipment: ['armor', 'mask', 'sowrd', 'sheild']
    });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto z-10">
      <h2 className="text-xl md:text-2xl text-[#00FFFF] mb-8 text-center uppercase tracking-wider drop-shadow-[2px_2px_0_#000] bg-black/80 px-8 py-3 rounded-full border border-[#00FFFF]/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
        ACADEMIC DETAILS
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <PixelInput
          label="Major"
          placeholder="Computer Science"
          {...register('major')}
          error={errors.major}
        />

        <div className="mt-4">
          <PixelInput
            label="Semester"
            placeholder="current semester"
            {...register('semester')}
            error={errors.semester}
          />
        </div>

        <NavigationButtons
          onBack={prevStep}
          onNext={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default AcademicInfo;
