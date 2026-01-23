import React, { useState } from 'react';
import Image from 'next/image';
import { FormStepProps, Skill, ALL_SKILLS } from '@/app/types/registration';
import NavigationButtons from '../ui/NavigationButtons';
import { skillsSchema } from '@/app/lib/validation';

const SKILL_LABELS: Record<Skill, string> = {
  cp: 'CP',
  decor: 'Decor',
  game_dev: 'Game Dev',
  media: 'Media',
  pr: 'PR',
  web_dev: 'Web Dev',
  None: 'None'
};

const SkillsSelection: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSkillToggle = (skill: Skill) => {
    let newSkills: string[] = [];

    if (skill === 'None') {
      newSkills = ['None'];
    } else {
      newSkills = formData.skills.filter(s => s !== 'None');

      if (newSkills.includes(skill)) {
        newSkills = newSkills.filter(s => s !== skill);
      } else {
        newSkills.push(skill);
      }
    }

    updateFormData({ skills: newSkills });
    setError(null);
  };

  const handleNext = () => {
    const result = skillsSchema.safeParse({ skills: formData.skills });
    if (result.success) {
      nextStep();
    } else {
      setError(result.error.issues[0].message);
    }
  };

  // Circular layout calculations
  // Arrange skills so 'None' is at the bottom (index 3 out of 7, if starting from top, or rotate)
  // Let's keep the ALL_SKILLS order but rotate the starting angle so None (last item) is at 90deg (bottom)

  // Find index of 'None'
  const noneIndex = ALL_SKILLS.indexOf('None');
  const totalSkills = ALL_SKILLS.length;
  const radius = 140;

  // We want the angle for noneIndex to be 90 degrees (Math.PI/2)
  // angle = (index * (360 / total)) + startOffset
  // 90 = (noneIndex * (360 / total)) + startOffset
  // startOffset = 90 - (noneIndex * (360 / total))

  const anglePerItem = 360 / totalSkills;
  const startOffset = 90 - (noneIndex * anglePerItem);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto z-10">
      <h2 className="text-xl md:text-2xl text-[#00FFFF] mb-4 text-center uppercase tracking-wider drop-shadow-[2px_2px_0_#000] bg-black/80 px-8 py-3 rounded-full border border-[#00FFFF]/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
        SELECT YOUR SKILL
      </h2>

      <p className="text-[#00FFFF] text-xs md:text-sm text-center mb-8 font-bold">
        YOU MAY SELECT MULTIPLE
      </p>

      {/* Skills Circular Container */}
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mb-8">
        {ALL_SKILLS.map((skill, index) => {
          const isSelected = formData.skills.includes(skill);
          const angle = (index * anglePerItem) + startOffset;
          const radian = (angle * Math.PI) / 180;

          return (
            <div
              key={skill}
              onClick={() => handleSkillToggle(skill)}
              style={{
                left: `${50 + (40 * Math.cos(radian))}%`,
                top: `${50 + (40 * Math.sin(radian))}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`
                  absolute cursor-pointer flex flex-col items-center gap-1
                  w-[100px] md:w-[120px] z-10
                  ${isSelected ? 'scale-110 z-20' : 'opacity-80 hover:opacity-100 hover:scale-105'}
                `}
            >
              <div className={`
            relative w-[90px] h-[90px] md:w-[110px] md:h-[110px] 
            transition-all duration-200
            ${isSelected ? 'drop-shadow-[0_0_15px_#00FFFF] rounded-full' : ''}
          `}>
                <Image
                  src={`/${skill}.png`}
                  alt={SKILL_LABELS[skill]}
                  fill
                  className="object-contain pixel-card"
                />
              </div>
              <span className={`
            text-xs md:text-sm text-center bg-black/70 px-3 py-1 rounded-full mt-1 border border-white/10
            ${isSelected ? 'text-[#00FFFF] drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] border-[#00FFFF]/50' : 'text-[#00FF00]'}
          `}>
                {SKILL_LABELS[skill]}
              </span>
            </div>
          );
        })}

        {/* Center decoration or info text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-50 pointer-events-none">
          <p className="text-sm text-gray-500 uppercase tracking-widest">Choose</p>
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
        disableNext={formData.skills.length === 0}
      />
    </div>
  );
};

export default SkillsSelection;
