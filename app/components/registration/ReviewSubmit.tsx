import React from 'react';
import { FormStepProps } from '@/app/types/registration';
import NavigationButtons from '../ui/NavigationButtons';
import PixelButton from '../ui/PixelButton';

const ReviewSubmit: React.FC<FormStepProps> = ({
  formData,
  nextStep,
  prevStep,
  isSubmitting = false
}) => {
  const DataRow = ({ label, value }: { label: string, value: string | string[] }) => (
    <div className="flex flex-col md:flex-row md:justify-between border-b-2 border-dashed border-[rgba(0,255,255,0.2)] py-3 last:border-0">
      <span className="text-[#FF3FB4] text-xs uppercase mb-1 md:mb-0">{label}:</span>
      <span className="text-[#00FFFF] text-sm text-right">
        {Array.isArray(value) ? value.join(', ') : value}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto z-10">
      <h2 className="text-xl md:text-2xl text-[#00FFFF] mb-8 text-center uppercase tracking-wider drop-shadow-[2px_2px_0_#000]">
        CONFIRM REGISTRATION
      </h2>

      <div className="w-full bg-[rgba(26,26,46,0.9)] border-4 border-[#00FFFF] p-6 md:p-8 pixel-shadow mb-8 relative">
        <div className="flex flex-col gap-2">
          <DataRow label="Character" value={formData.gender.toUpperCase()} />
          <DataRow label="Student ID" value={formData.studentId} />
          <DataRow label="Name" value={formData.name} />
          <DataRow label="Email" value={formData.email} />
          <DataRow label="Phone" value={`+88${formData.phone}`} />
          <DataRow label="Facebook" value={formData.facebook} />
          <DataRow label="Major" value={formData.major} />
          <DataRow label="Year" value={formData.year} />
          <DataRow label="Semester" value={formData.semester} />
          <DataRow label="Skills" value={formData.skills} />
        </div>
      </div>

      <NavigationButtons
        onBack={prevStep}
        onNext={nextStep}
        nextLabel={isSubmitting ? "SAVING..." : "SUBMIT"}
        loading={isSubmitting}
      />
    </div>
  );
};

export default ReviewSubmit;
