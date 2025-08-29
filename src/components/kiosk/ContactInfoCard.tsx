import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Button from './Button';
import { useInternationalization } from '@/contexts/InternationalizationContext';

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
  const { t } = useInternationalization();

  return (
    <div className={`bg-card border border-border rounded-lg p-8 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 flex-1">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="text-muted-foreground kiosk-body mb-2">
              {label}
            </div>
            <div className="text-foreground kiosk-h2 font-semibold">
              {value}
            </div>
          </div>
        </div>

        {onUpdate && (
          <Button 
            variant="primary" 
            size="lg"
            onClick={onUpdate}
          >
            {t('contact.update', 'Update')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContactInfoCard;