import React from 'react';
import Image from 'next/image';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import PixelButton from '../ui/PixelButton';

const RegistrationClosedScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Decorative background elements if needed, keeping it simple/dark as requested */}
      
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center mb-8 relative z-10">
        <div className="relative w-24 h-24 mb-4 animate-pulse">
          <Image
            src="/iubpc.png"
            alt="IUBPC Logo"
            fill
            className="object-contain pixel-card"
            priority
          />
        </div>
        <h1 className="text-3xl md:text-4xl text-white font-bold drop-shadow-[4px_4px_0_#4A3F8C] tracking-wide font-pixel">
          IUB PROGRAMMING CLUB
        </h1>
      </div>

      {/* Message Box */}
      <div className="relative bg-[rgba(26,26,46,0.9)] p-6 border-4 border-dashed border-[#00FFFF] mb-10 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <p className="text-[#00FFFF] text-xl md:text-2xl uppercase tracking-widest font-bold font-pixel mb-2">
          Registration Closed
        </p>
        <p className="text-white text-sm md:text-base leading-relaxed font-pixel">
          Registration period is over please wait until further notice
        </p>
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col w-full max-w-xs gap-4 z-10">
        <a 
          href="https://www.facebook.com/iub.pc" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full transform transition-transform active:scale-95"
        >
          <PixelButton variant="primary" fullWidth className="flex items-center justify-center gap-3">
            <FaFacebook className="w-6 h-6" />
            <span>Facebook</span>
          </PixelButton>
        </a>
        
        <a 
          href="https://www.instagram.com/iub.pc" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full transform transition-transform active:scale-95"
        >
          <PixelButton variant="primary" fullWidth className="flex items-center justify-center gap-3">
            <FaInstagram className="w-6 h-6" />
            <span>Instagram</span>
          </PixelButton>
        </a>
      </div>

      {/* Footer Text / Copyright maybe? Keeping it minimal as per spec */}
    </div>
  );
};

export default RegistrationClosedScreen;
