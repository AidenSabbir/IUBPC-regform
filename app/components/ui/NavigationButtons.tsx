import React from 'react';
import PixelButton from './PixelButton';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  disableNext?: boolean;
  showBack?: boolean;
  loading?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  nextLabel = 'NEXT',
  disableNext = false,
  showBack = true,
  loading = false
}) => {
  return (
    <div className="flex justify-between w-full mt-8 gap-4">
      {showBack ? (
        <PixelButton 
          type="button" 
          onClick={onBack}
          variant="secondary"
          className="flex-1 max-w-[80px] flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </PixelButton>
      ) : (
        <div className="flex-1 max-w-[80px]"></div>
      )}
      
      <PixelButton 
        type="button" 
        onClick={onNext}
        disabled={disableNext || loading}
        className="flex-1 max-w-[80px] flex items-center justify-center"
        aria-label="Next"
      >
        {loading ? (
          '...'
        ) : (
          <ArrowRightIcon className="w-6 h-6" />
        )}
      </PixelButton>
    </div>
  );
};

export default NavigationButtons;
