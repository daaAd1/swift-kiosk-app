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
    <div className={`bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center justify-center w-14 h-14 bg-primary/20 rounded-xl border border-primary/30">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-muted-foreground text-base font-medium mb-1">
              {label}
            </div>
            <div className="text-foreground text-xl font-semibold truncate">
              {value}
            </div>
          </div>
        </div>

        {onUpdate && (
          <div className="ml-4">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={onUpdate}
              className="min-w-[100px]"
            >
              {t('contact.update', 'Update')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfoCard;