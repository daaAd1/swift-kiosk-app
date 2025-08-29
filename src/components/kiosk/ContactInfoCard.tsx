import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Button from './Button';

interface ContactInfoCardProps {
  type: 'email' | 'phone';
  label: string;
  value: string;
  onUpdate?: () => void;
  className?: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  type,
  label,
  value,
  onUpdate,
  className = ""
}) => {
  const Icon = type === 'email' ? Mail : Phone;

  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="text-muted-foreground kiosk-body-sm mb-1">
              {label}
            </div>
            <div className="text-foreground kiosk-body font-semibold">
              {value}
            </div>
          </div>
        </div>

        {onUpdate && (
          <Button 
            variant="primary" 
            size="sm"
            onClick={onUpdate}
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContactInfoCard;