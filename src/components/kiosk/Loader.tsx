import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  text?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  text = "Please wait...", 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="kiosk-body text-muted-foreground text-center">
        {text}
      </p>
    </div>
  );
};

export default Loader;