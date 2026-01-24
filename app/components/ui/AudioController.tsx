import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface AudioControllerProps {
  gameStarted: boolean;
}

const AudioController: React.FC<AudioControllerProps> = ({ gameStarted }) => {
  const [isMuted, setIsMuted] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio Objects
  useEffect(() => {
    bgMusicRef.current = new Audio('/background.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4; // 40% volume for background

    clickSoundRef.current = new Audio('/click.mp3');
    clickSoundRef.current.volume = 0.6; // 60% volume for clicks

    // Cleanup
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      clickSoundRef.current = null;
    };
  }, []);

  // Handle Background Music
  useEffect(() => {
    const bgMusic = bgMusicRef.current;
    if (!bgMusic) return;

    if (gameStarted && !isMuted) {
      // User interaction has happened by the time gameStarted is true
      bgMusic.play().catch(e => console.log('Audio autoplay blocked:', e));
    } else {
      bgMusic.pause();
    }
  }, [gameStarted, isMuted]);

  // Handle Global Click Sound
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isMuted || !clickSoundRef.current) return;
      
      const target = e.target as HTMLElement;
      
      // ONLY play sound if the clicked element (or parent) has the 'sound-click-btn' class
      const isSoundButton = target.closest('.sound-click-btn');
      
      if (!isSoundButton) return;

      // Clone node to allow overlapping sounds (rapid clicks)
      const sound = clickSoundRef.current.cloneNode() as HTMLAudioElement;
      sound.volume = 0.6;
      sound.play().catch(e => console.log('Click sound error:', e));
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop propagation to prevent double triggering if any
    setIsMuted(prev => !prev);
  };

  return (
    <div 
      className="absolute top-20 left-4 z-50 cursor-pointer transition-transform active:scale-95 group audio-controller-btn"
      onClick={toggleMute}
      title={isMuted ? "Unmute Sound" : "Mute Sound"}
    >
      <div className={`
        relative w-10 h-10 
        bg-black/40 border border-[#00FFFF]/30 rounded-full p-1.5
        hover:bg-black/60 hover:border-[#00FFFF] transition-all duration-300
        ${isMuted ? 'grayscale opacity-70' : 'drop-shadow-[0_0_5px_#00FFFF]'}
      `}>
        <Image
          src="/sound.png"
          alt="Sound Control"
          fill
          className="object-contain"
        />
        
        {/* Red X for Muted State */}
        {isMuted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-0.5 bg-[#FF0000] rotate-45 transform origin-center shadow-[0_0_2px_black]" />
            <div className="absolute w-full h-0.5 bg-[#FF0000] -rotate-45 transform origin-center shadow-[0_0_2px_black]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioController;
