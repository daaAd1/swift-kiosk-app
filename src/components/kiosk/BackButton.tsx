import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-3 text-muted-foreground hover:text-foreground kiosk-interactive kiosk-touch-target mb-6 ${className}`}
    >
      <ArrowLeft className="h-6 w-6" />
      <span className="kiosk-body font-medium">Back</span>
    </button>
  );
};

export default BackButton;