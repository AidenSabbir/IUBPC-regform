import React from 'react';
import Image from 'next/image';
import { EquipmentItem } from '@/app/types/registration';

interface EquipmentIconsProps {
  equipment: EquipmentItem[];
  gender: string;
}

const EquipmentIcons: React.FC<EquipmentIconsProps> = ({ equipment = [], gender }) => {
  // We'll map the equipment items to their image paths
  const equipmentMap: Record<EquipmentItem, string> = {
    armor: '/armor_v2.png',
    mask: '/mask_v2.png',
    sowrd: '/sowrd_v2.png',
    sheild: '/sheild_v2.png'
  };

  // Helper to render an equipment slot
  const renderSlot = (item: EquipmentItem, positionClass: string) => {
    const isUnlocked = equipment.includes(item);
    return (
      <div
        className={`
          absolute ${positionClass}
          w-8 h-8
          flex items-center justify-center
          rounded-lg
          transition-all duration-300
          ${isUnlocked ? 'opacity-100' : 'opacity-40 grayscale'}
        `}
      >
        <div className="relative w-full h-full p-1">
          <Image
            src={equipmentMap[item]}
            alt={item}
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-20 h-20 rounded-xl border border-white/20 p-2">

      {/* Center Character */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {gender && (
          <div className="relative w-12 h-16">
            <Image
              src={gender === 'female' ? '/female_v2.png' : '/male_v2.png'}
              alt="Character"
              fill
              className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              priority
            />
          </div>
        )}
      </div>

      {/* 4 Corners Equipment */}
      {/* Top Left - Armor */}
      {renderSlot('armor', '-top-2 -left-2')}

      {/* Top Right - Mask */}
      {renderSlot('mask', '-top-2 -right-2')}

      {/* Bottom Left - Sword */}
      {renderSlot('sowrd', '-bottom-2 -left-2')}

      {/* Bottom Right - Shield */}
      {renderSlot('sheild', '-bottom-2 -right-2')}

    </div>
  );
};

export default EquipmentIcons;
