import React from 'react';

interface MaracanaLogoProps {
  className?: string;
  size?: number | string;
}

export const MaracanaLogo: React.FC<MaracanaLogoProps> = ({
  className = "w-12 h-12",
}) => {
  return (
    <img
      src="/maracana-logo.png"
      alt="El Maracaná Sports Bar and Grill Logo"
      width={512}
      height={512}
      draggable={false}
      className={`${className} shrink-0 object-contain drop-shadow-md select-none`}
    />
  );
};
