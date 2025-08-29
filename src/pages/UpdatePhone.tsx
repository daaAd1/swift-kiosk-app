import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Delete } from 'lucide-react';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import BackButton from '@/components/kiosk/BackButton';
import Button from '@/components/kiosk/Button';
import { Appointment as AppointmentType, ContactInfo } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useInternationalization } from '@/contexts/InternationalizationContext';

const UpdatePhone: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTime = useCurrentTime();
  const { t, currentLanguage } = useInternationalization();
  const [phone, setPhone] = useState('');
  
  const appointment = location.state?.appointment as AppointmentType;
  const contactInfo = location.state?.contactInfo as ContactInfo;
  
  useInactivityTimer();

  // Country prefixes based on language
  const getCountryPrefix = () => {
    switch (currentLanguage) {
      case 'nl': return '+32'; // Belgium
      case 'fr': return '+33'; // France  
      case 'es': return '+34'; // Spain
      default: return '+1';    // US/Default
    }
  };

  const numberRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  const handleKeyPress = (key: string) => {
    setPhone(prev => prev + key);
  };

  const handleBackspace = () => {
    setPhone(prev => prev.slice(0, -1));
  };

  const handleAddPrefix = () => {
    const prefix = getCountryPrefix();
    if (!phone.startsWith(prefix)) {
      setPhone(prefix + phone);
    }
  };

  const handleAddPlus = () => {
    if (!phone.startsWith('+')) {
      setPhone('+' + phone);
    }
  };

  const handleSave = () => {
    if (phone && appointment && contactInfo) {
      const updatedContactInfo = { ...contactInfo, phone };
      navigate('/verify-contact', {
        state: {
          appointment,
          contactInfo: updatedContactInfo
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/verify-contact', {
      state: { appointment, contactInfo }
    });
  };

  if (!appointment || !contactInfo) {
    navigate('/');
    return null;
  }

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <BackButton onClick={handleBack} />
        <Title>{t('contact.updatePhone', 'Update Phone Number')}</Title>
        
        <div className="flex-1 flex flex-col min-h-0 py-4">
          {/* Phone Input Display */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-card border-2 border-border rounded-lg p-3 w-full max-w-2xl">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <input
                  type="text"
                  value={phone}
                  readOnly
                  className="flex-1 bg-transparent text-xl font-medium text-foreground focus:outline-none"
                  placeholder="Enter your phone number..."
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBackspace}
                  disabled={phone.length === 0}
                >
                  <Delete className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Number Keyboard - Centered and properly sized */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-0">
            <div className="w-full max-w-sm mx-auto">
              <div className="grid grid-cols-3 gap-3">
                {numberRows.flat().map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className="w-16 h-12 bg-card border border-border rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground text-xl font-medium"
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Special Action Buttons */}
              <div className="flex justify-center space-x-3 mt-4">
                <Button
                  variant="secondary"
                  size="default"
                  onClick={handleAddPlus}
                  disabled={phone.startsWith('+')}
                >
                  +
                </Button>
                <Button
                  variant="primary"
                  size="default"
                  onClick={handleAddPrefix}
                  disabled={phone.startsWith(getCountryPrefix())}
                >
                  {getCountryPrefix()}
                </Button>
              </div>
            </div>
          </div>

          {/* Save Button - Fixed at bottom */}
          <div className="text-center pt-3 pb-2">
            <Button
              variant="success"
              size="lg"
              onClick={handleSave}
              disabled={!phone.trim()}
              showArrow
            >
              {t('button.confirm', 'Confirm')}
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UpdatePhone;