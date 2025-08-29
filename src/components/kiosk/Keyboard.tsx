import React from 'react';

interface KeyboardProps {
  options: string[];
  onSelect: (option: string) => void;
  selectedOption?: string;
  columns?: number;
  className?: string;
}

const Keyboard: React.FC<KeyboardProps> = ({
  options,
  onSelect,
  selectedOption,
  columns = 6,
  className = ""
}) => {
  return (
    <div 
      className={`grid gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`
            kiosk-interactive kiosk-touch-target
            bg-card border-2 rounded-lg p-4 shadow-sm
            hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            ${selectedOption === option ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
          `}
        >
          <span className="kiosk-body font-semibold text-foreground">
            {option}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Keyboard;