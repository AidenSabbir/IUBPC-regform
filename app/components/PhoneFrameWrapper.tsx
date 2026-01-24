'use client';

import React, { useState, useEffect } from 'react';

interface PhoneFrameWrapperProps {
  children: React.ReactNode;
}

const PhoneFrameWrapper = ({ children }: PhoneFrameWrapperProps) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkScreen = () => {
      // Show frame on screens wider than 640px
      setIsDesktop(window.innerWidth > 640);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Avoid hydration mismatch by not rendering anything different on server
  if (!isMounted) {
    return <div className="min-h-screen w-full">{children}</div>;
  }

  if (!isDesktop) {
    return (
      <main className="min-h-screen w-full overflow-x-hidden flex flex-col items-center">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="phone-frame animate-in fade-in zoom-in duration-500">
        {/* Pixel Art Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white z-50 flex items-center justify-center rounded-b-lg">
          <div className="w-12 h-1 bg-black/20 rounded-full" />
        </div>
        
        <div className="phone-screen no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneFrameWrapper;
