import React from 'react';

interface LanguageCardProps {
  flag: string;
  countryName: string;
  languageName: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({
  flag,
  countryName,
  languageName,
  selected = false,
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        kiosk-interactive kiosk-touch-target 
        bg-card border-2 rounded-lg p-4 shadow-sm
        hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        ${selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
        ${className}
      `}
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-4xl">{flag}</span>
        <div className="text-center">
          <div className="font-semibold text-foreground">{countryName}</div>
          <div className="text-muted-foreground text-sm">{languageName}</div>
        </div>
      </div>
    </button>
  );
};

export default LanguageCard;