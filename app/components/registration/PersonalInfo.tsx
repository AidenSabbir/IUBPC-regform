import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStepProps } from '@/app/types/registration';
import NavigationButtons from '../ui/NavigationButtons';
import PixelInput from '../ui/PixelInput';
import { personalInfoSchema } from '@/app/lib/validation';
import { z } from 'zod';

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

const PersonalInfo: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      studentId: formData.studentId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      facebook: formData.facebook
    },
    mode: 'onChange'
  });

  const onSubmit = (data: PersonalInfoForm) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto z-10">
      <h2 className="text-xl md:text-2xl text-[#00FFFF] mb-8 text-center uppercase tracking-wider drop-shadow-[2px_2px_0_#000] bg-black/80 px-8 py-3 rounded-full border border-[#00FFFF]/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
        ENTER YOUR DETAILS
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <PixelInput
          label="Student ID"
          placeholder="2531864"
          {...register('studentId')}
          error={errors.studentId}
          maxLength={7}
        />

        <PixelInput
          label="Full Name"
          placeholder="John Doe"
          {...register('name')}
          error={errors.name}
        />

        <PixelInput
          label="Email Address"
          placeholder="john@example.com"
          type="email"
          {...register('email')}
          error={errors.email}
        />

        <PixelInput
          label="Phone Number"
          placeholder="01XXXXXXXXX"
          {...register('phone')}
          error={errors.phone}
          prefix="BDT"
        />

        <PixelInput
          label="Facebook Link"
          placeholder="https://facebook.com/yourname or username"
          {...register('facebook')}
          error={errors.facebook}
        />

        <NavigationButtons
          onBack={prevStep}
          onNext={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default PersonalInfo;

