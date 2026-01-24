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
  content: 'Content',
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
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleSkillToggle = (skill: Skill) => {
    // If we were dragging, don't toggle
    if (isDragging) return;

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

  // Helper to get angle from center of container to point
  const getAngle = (clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Rotate based on scroll amount
    setRotation(prev => prev + (e.deltaY * 0.1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartAngle(getAngle(e.clientX, e.clientY) - rotation);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const angle = getAngle(e.clientX, e.clientY);
    setRotation(angle - startAngle);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setStartAngle(getAngle(touch.clientX, touch.clientY) - rotation);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const angle = getAngle(touch.clientX, touch.clientY);
    setRotation(angle - startAngle);
  };

  // Cleanup drag state if mouse leaves window
  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Circular layout calculations
  // Arrange skills so 'None' is at the bottom (index 3 out of 7, if starting from top, or rotate)
  // Let's keep the ALL_SKILLS order but rotate the starting angle so None (last item) is at 90deg (bottom)

  // Find index of 'None'
  const noneIndex = ALL_SKILLS.indexOf('None');
  const totalSkills = ALL_SKILLS.length;
  // const radius = 140; // Unused variable

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
      <div
        ref={containerRef}
        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mb-8 cursor-grab active:cursor-grabbing touch-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >

        {/* Donut Background Layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0 pointer-events-none">
          {/* The dark track */}
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, transparent 21%, rgba(0,0,0,0.8) 22%, rgba(0,0,0,0.8) 69%, transparent 70%)' }}>
          </div>

          {/* Inner Dashed Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22%] h-[22%] rounded-full border-2 border-dashed border-[#00FFFF]/30 shadow-[0_0_15px_rgba(0,255,255,0.2)]"></div>

          {/* Outer Dashed Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border-2 border-dashed border-[#00FFFF]/30 shadow-[0_0_15px_rgba(0,255,255,0.2)]"></div>
        </div>

        {ALL_SKILLS.map((skill, index) => {
          const isSelected = formData.skills.includes(skill);
          // Add rotation to the angle calculation
          const angle = (index * anglePerItem) + startOffset + rotation;
          const radian = (angle * Math.PI) / 180;

          // Counter-rotate the icons so they stay upright
          // We can apply a reverse rotation to the icon container if needed, 
          // or just let them orbit. Usually icons stay upright.

          return (
            <div
              key={skill}
              // Prevent click triggering immediately after drag
              onClick={(e) => {
                // If we moved significantly, don't click
                handleSkillToggle(skill);
              }}
              style={{
                left: `${50 + (40 * Math.cos(radian))}%`,
                top: `${50 + (40 * Math.sin(radian))}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`
                  absolute cursor-pointer flex flex-col items-center gap-0
                  w-[100px] md:w-[120px] z-10
                  select-none
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
                  className="object-contain pixel-card pointer-events-none"
                />
              </div>
              <span className={`
            text-xs md:text-sm text-center bg-black/70 px-3 py-1 rounded-full -mt-3 border border-white/10 pointer-events-none
            ${isSelected ? 'text-[#00FFFF] drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] border-[#00FFFF]/50' : 'text-[#00FF00]'}
          `}>
                {SKILL_LABELS[skill]}
              </span>
            </div>
          );
        })}

        {/* Center decoration or info text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-50 pointer-events-none select-none">
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
