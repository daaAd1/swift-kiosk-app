import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className = "" }) => {
  return (
    <h1 className={`kiosk-h1 text-center text-foreground mb-8 ${className}`}>
      {children}
    </h1>
  );
};

export default Title;