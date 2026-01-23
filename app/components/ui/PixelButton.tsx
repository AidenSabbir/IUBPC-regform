import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  fullWidth = false,
  disabled,
  ...props 
}) => {
  const baseStyles = "pixel-shadow h-10 px-4 py-2 text-sm font-medium uppercase tracking-widest active:translate-y-0 active:shadow-none border-4 flex items-center justify-center";
  
  const variants = {
    primary: "bg-[#00FF00] border-white text-black hover:bg-[#00FFFF] hover:scale-105",
    secondary: "bg-white border-white text-[#4A3F8C] hover:bg-[#FF3FB4] hover:text-white",
    danger: "bg-[#FF0000] border-white text-white hover:bg-[#FF69B4]"
  };
  
  const disabledStyles = "opacity-50 cursor-not-allowed transform-none hover:transform-none hover:bg-[#00FF00] hover:scale-100";
  
  return (
    <button 
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelButton;

