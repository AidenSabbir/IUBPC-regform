import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface PixelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  prefix?: string;
}

const PixelInput = forwardRef<HTMLInputElement, PixelInputProps>(({ 
  label, 
  error, 
  className = '', 
  prefix,
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      {label && (
        <label className="text-[#FF3FB4] text-sm uppercase tracking-wider mb-2 bg-black/80 px-4 py-1.5 rounded-full w-fit border border-[#FF3FB4]/30 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium z-10">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={`
            text-base p-3
            bg-[rgba(26,26,46,0.8)]
            border-4 
            text-[#00FFFF]
            placeholder:text-gray-500
            focus:outline-none focus:border-[#00FF00] focus:shadow-[0_0_10px_#00FF00]
            w-full
            ${prefix ? 'pl-16' : ''}
            ${error ? 'border-[#FF0000] shadow-[0_0_10px_#FF0000]' : 'border-[#00FFFF]'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[#FF0000] text-xs">
          ! {error.message}
        </span>
      )}
    </div>
  );
});

PixelInput.displayName = 'PixelInput';

export default PixelInput;
