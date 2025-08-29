import React from 'react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'default' | 'small' | 'large';
  color?: 'default' | 'muted' | 'success' | 'danger' | 'warning';
  className?: string;
  center?: boolean;
}

const Text: React.FC<TextProps> = ({ 
  children, 
  variant = 'default',
  color = 'default',
  className = "",
  center = false
}) => {
  const baseClasses = center ? 'text-center' : '';
  
  const variantClasses = {
    default: 'kiosk-body',
    small: 'kiosk-body-sm',
    large: 'text-xl leading-relaxed'
  };

  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning'
  };

  return (
    <p className={`${baseClasses} ${variantClasses[variant]} ${colorClasses[color]} ${className}`}>
      {children}
    </p>
  );
};

export default Text;