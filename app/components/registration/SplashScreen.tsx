import React, { useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Animation duration should match the CSS transition
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div
        className={`relative transition-all duration-1000 ease-in-out transform ${isAnimating ? '-translate-y-[45vh] scale-50 opacity-0' : 'scale-100 opacity-100'
          }`}
      >
        <div className="relative w-32 h-32 animate-pulse">
          <Image
            src="/iubpc.png"
            alt="IUBPC Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      {!isAnimating && (
        <div className="animate-pulse text-white text-2xl font-pixel text-center">
          Tap anywhere to enter
        </div>
      )}

    </div>
  );
};

export default SplashScreen;
