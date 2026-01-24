import React from 'react';
import Image from 'next/image';
import { FormStepProps, PortionItem, SpecialItem } from '@/app/types/registration';
import NavigationButtons from '../ui/NavigationButtons';

const PORTIONS: PortionItem[] = ['Pcontrol', 'Pimmortality', 'Pinvisibility'];
const SPECIAL_ITEMS: SpecialItem[] = ['Sdragon', 'Shat', 'Sspellbook'];

const InventorySelection: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const getItemName = (filename: string) => {
    // Remove first letter (P or S) and capitalize the rest
    const name = filename.substring(1);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handlePortionSelect = (item: PortionItem) => {
    updateFormData({ portion: item });
    setError(null);
  };

  const handleSpecialSelect = (item: SpecialItem) => {
    updateFormData({ specialItem: item });
    setError(null);
  };

  const handleNext = () => {
    if (!formData.portion || !formData.specialItem) {
      setError('Please select one Portion and one Special Item!');
      return;
    }
    nextStep();
  };

  const ItemCard = ({ 
    item, 
    isSelected, 
    onSelect 
  }: { 
    item: string, 
    isSelected: boolean, 
    onSelect: () => void 
  }) => (
    <div
      onClick={onSelect}
      className={`
        cursor-pointer relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-300
        ${isSelected 
          ? 'bg-[#00FFFF]/20 border-[#00FFFF] scale-105 shadow-[0_0_15px_rgba(0,255,255,0.4)]' 
          : 'bg-black/40 border-white/10 hover:border-white/40 hover:bg-black/60'}
      `}
    >
      <div className="relative w-20 h-20">
        <Image
          src={`/${item}.png`}
          alt={getItemName(item)}
          fill
          className={`object-contain transition-all duration-300 ${isSelected ? 'drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'opacity-80'}`}
        />
      </div>
      <span className={`text-xs font-bold uppercase tracking-wide ${isSelected ? 'text-[#00FFFF]' : 'text-gray-400'}`}>
        {getItemName(item)}
      </span>
      
      {/* Selection Indicator */}
      <div className={`
        absolute top-2 right-2 w-3 h-3 rounded-full border border-white/50
        ${isSelected ? 'bg-[#00FFFF] shadow-[0_0_5px_#00FFFF]' : 'bg-transparent'}
      `} />
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto z-10">
      <h2 className="text-xl text-[#00FFFF] mb-6 text-center uppercase tracking-wider drop-shadow-[2px_2px_0_#000] bg-black/80 px-8 py-3 rounded-full border border-[#00FFFF]/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
        CHOOSE YOUR INVENTORY
      </h2>

      <div className="flex flex-col gap-8 w-full justify-center items-start mb-8">
        
        {/* Portions Section */}
        <div className="flex-1 w-full bg-black/30 p-4 rounded-xl border border-white/10">
          <h3 className="text-[#FF3FB4] text-center mb-4 uppercase tracking-widest text-sm border-b border-[#FF3FB4]/30 pb-2">
            Select Portion (1)
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {PORTIONS.map((item) => (
              <ItemCard
                key={item}
                item={item}
                isSelected={formData.portion === item}
                onSelect={() => handlePortionSelect(item)}
              />
            ))}
          </div>
        </div>

        {/* Special Items Section */}
        <div className="flex-1 w-full bg-black/30 p-4 rounded-xl border border-white/10">
          <h3 className="text-[#FF3FB4] text-center mb-4 uppercase tracking-widest text-sm border-b border-[#FF3FB4]/30 pb-2">
            Select Special Item (1)
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {SPECIAL_ITEMS.map((item) => (
              <ItemCard
                key={item}
                item={item}
                isSelected={formData.specialItem === item}
                onSelect={() => handleSpecialSelect(item)}
              />
            ))}
          </div>
        </div>

      </div>

      {error && (
        <div className="text-[#FF0000] text-sm mb-6 bg-black/80 px-4 py-2 rounded border border-red-500 animate-pulse">
          ! {error}
        </div>
      )}

      <NavigationButtons
        onBack={prevStep}
        onNext={handleNext}
        disableNext={!formData.portion || !formData.specialItem}
      />
    </div>
  );
};

export default InventorySelection;
