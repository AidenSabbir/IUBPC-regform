import React from 'react';
import Image from 'next/image';
import { RegistrationData } from '@/app/types/registration';

interface CharacterShowcaseProps {
  formData: RegistrationData;
  nextStep: () => void;
}

const CharacterShowcase: React.FC<CharacterShowcaseProps> = ({
  formData,
  nextStep
}) => {
  const getItemName = (filename: string) => {
    if (!filename) return '';
    const name = filename.substring(1);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[80vh] relative z-10">
      <div className="relative flex flex-col items-center">
        {/* Celebration Header */}
        <div className="relative flex flex-col items-center -mb-30">
          <h2 className="text-2xl text-[#00FFFF] text-center uppercase tracking-widest drop-shadow-[0_0_10px_#00FFFF] font-bold">
            CHARACTER READY!
          </h2>
          {/* Floating Health Bar */}
          <div className="w-64 z-20">
            <Image
              src="/heart.png"
              alt="Health Bar"
              width={340}
              height={66}
              className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]"
            />
          </div>
        </div>
        {/* Final Character */}
        <div className="relative w-[300px] h-[400px]">
          <Image
            src="/final.png"
            alt="Final Character"
            fill
            className="object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.4)]"
            priority
          />
        </div>

        {/* Selected Inventory Display (Horizontal Row at Bottom) */}
        <div className="flex gap-6 w-full justify-center flex-wrap items-center -mt-23">

          {/* Portion */}
          {formData.portion && (
            <div className="flex flex-col items-center gap-1 group">
              <div className="relative w-16 h-16 bg-black/60 rounded-lg border-2 border-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.3)] p-2 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={`/${formData.portion}.png`}
                  alt="Portion"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] text-[#00FFFF] bg-black/70 px-2 py-0.5 rounded border border-[#00FFFF]/30">
                {getItemName(formData.portion)}
              </span>
            </div>
          )}

          {/* Special Item */}
          {formData.specialItem && (
            <div className="flex flex-col items-center gap-1 group">
              <div className="relative w-16 h-16 bg-black/60 rounded-lg border-2 border-[#FF3FB4] shadow-[0_0_15px_rgba(255,63,180,0.3)] p-2 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={`/${formData.specialItem}.png`}
                  alt="Special Item"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] text-[#FF3FB4] bg-black/70 px-2 py-0.5 rounded border border-[#FF3FB4]/30">
                {getItemName(formData.specialItem)}
              </span>
            </div>
          )}
          {
            formData.skills && formData.skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center gap-1 group">
                <div className="relative w-16 h-16 bg-black/60 rounded-lg border-2 border-purple-500 shadow-[0_0_15px_rgba(255,63,180,0.3)] p-2 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={`/${skill}.png`}
                    alt="Skill"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[10px] text-[#FF3FB4] bg-black/70 px-3 py-0.5 rounded border border-[#FF3FB4]/30">
                  {skill}
                </span>
              </div>
            ))
          }
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={nextStep}
        className="mt-10 px-10 py-3 bg-[#00FF00] hover:bg-[#00CC00] text-black font-bold text-lg rounded-full border-4 border-black shadow-[4px_4px_0px_#000000] active:translate-y-1 active:shadow-none transition-all duration-150 flex items-center gap-2 sound-click-btn"
      >
        COMPLETE REGISTRATION
        <span className="text-2xl pointer-events-none">→</span>
      </button>

    </div>
  );
};

export default CharacterShowcase;
