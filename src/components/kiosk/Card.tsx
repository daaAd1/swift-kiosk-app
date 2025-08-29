import React from 'react';

interface CardProps {
  title: string;
  image?: string;
  icon?: React.ReactNode;
  description?: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  icon,
  description,
  onClick,
  selected = false,
  className = "",
  children
}) => {
  const isClickable = !!onClick;

  return (
    <div
      className={`
        bg-card border-2 rounded-lg shadow-sm
        ${isClickable ? 'cursor-pointer kiosk-interactive hover:shadow-md' : ''}
        ${selected ? 'border-primary bg-primary/5' : 'border-border'}
        ${isClickable ? 'hover:border-primary/50' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="p-6">
        {/* Image or Icon */}
        {image && (
          <div className="flex justify-center mb-4">
            <img 
              src={image} 
              alt={title}
              className="w-16 h-16 object-contain"
            />
          </div>
        )}
        
        {icon && (
          <div className="flex justify-center mb-4 text-primary">
            <div className="w-16 h-16 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="kiosk-h2 text-center text-foreground mb-3">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="kiosk-body text-center text-muted-foreground mb-4">
            {description}
          </p>
        )}

        {/* Custom content */}
        {children}
      </div>
    </div>
  );
};

export default Card;