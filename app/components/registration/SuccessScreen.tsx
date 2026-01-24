import React from 'react';
import PixelButton from '../ui/PixelButton';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import Image from 'next/image';
interface SuccessScreenProps {
  onReset: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-10">
      <div className='-mb-6'>
        <Image src="/levelup.png" alt="levelup Logo" width={120} height={120} />
      </div>

      <h2 className="text-2xl text-[#00FF00] mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] leading-tight font-bold">
        REGISTRATION COMPLETE!
      </h2>
      <div className="bg-[rgba(26,26,46,0.8)] border-2 rounded-lg py-3 border-[#00FFFF] mb-12 w-full max-w-md flex items-center justify-center">
        <p className="text-white text-sm leading-relaxed font-semibold">
          Welcome to the guild, adventurer! Your stats have been recorded in the archives.
        </p>
      </div>

      <div className="relative bg-[rgba(26,26,46,0.8)] p-6 border-4 border-dashed border-[#00FFFF] mb-9 w-full max-w-md">
        <p className="text-[#00FFFF] text-xs uppercase mb-2 font-bold">Next Quest:</p>
        <p className="text-white text-sm">Join our orientation programme!<br />Announcement coming soon, keep an eye out!</p>
        <Image src="/xp.png" alt="xp Logo" width={50} height={50} className='absolute -top-9 -right-6' />
      </div>
      <div className='relative flex flex-col items-center justify-center gap-2 w-70 max-w-md'>
        <a href="https://discord.gg/MFe357KE" target="_blank" className="w-full"><PixelButton variant="primary" className='w-full animate-pulse mb-2'>
          <FaDiscord className="w-6 h-6 mr-2" />
          Join Our Discord Server
        </PixelButton></a>
        <a href="https://www.facebook.com/iub.pc" target="_blank" className="w-full">
          <PixelButton variant="primary" className='w-full flex items-center justify-center gap-2'>
            <FaFacebook className="w-6 h-6 mr-2" />
            Visit Our Facebook Page
          </PixelButton>
        </a>
        <a href="https://www.instagram.com/iub.pc" target="_blank" className="w-full">
          <PixelButton variant="primary" className='w-full flex items-center justify-center gap-2'>
            <FaInstagram className="w-6 h-6 mr-2" />
            Follow us on Instagram
          </PixelButton>
        </a>
        <a href="https://www.linkedin.com/company/iub-programming-club/" target="_blank" className="w-full">
          <PixelButton variant="primary" className='w-full flex items-center justify-center gap-2'>
            <FaLinkedin className="w-6 h-6 mr-2" />
            Visit Our LinkedIn Page
          </PixelButton>
        </a>
      </div>
    </div>
  );
};

export default SuccessScreen;
