import React from 'react';
import Image from 'next/image';
import PixelButton from '../ui/PixelButton';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center relative z-10 py-12">
      <div className="flex flex-col items-center justify-center -top-35 absolute">
        <div className="relative w-15 h-15">
          <Image
            src="/iubpc.png"
            alt="IUBPC Logo"
            fill
            className="object-contain pixel-card"
            priority
          />
        </div>
        <h1 className="text-4xl text-white drop-shadow-[4px_4px_0_#4A3F8C]">
          IUB PROGRAMMING CLUB
        </h1>
      </div>

      <div className="mt-4 flex flex-col items-center text-center">
        <p className="text-[#00FFFF] text-2xl tracking-widest uppercase mb-2">
          Registration Form
        </p>
        <PixelButton
          className="animate-pulse start-game-btn"
          onClick={onStart}
        >
          START
        </PixelButton>
      </div>
    </div>
  );
};

export default StartScreen;
