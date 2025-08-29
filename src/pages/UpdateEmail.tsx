import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Delete } from 'lucide-react';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import BackButton from '@/components/kiosk/BackButton';
import Button from '@/components/kiosk/Button';
import { Appointment as AppointmentType, ContactInfo } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useInternationalization } from '@/contexts/InternationalizationContext';

const UpdateEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTime = useCurrentTime();
  const { t } = useInternationalization();
  const [email, setEmail] = useState('');
  const [keyboardMode, setKeyboardMode] = useState<'letters' | 'numbers' | 'symbols'>('letters');
  
  const appointment = location.state?.appointment as AppointmentType;
  const contactInfo = location.state?.contactInfo as ContactInfo;
  
  useInactivityTimer();

  const letterRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  const numberRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
    ['.', ',', '?', '!', "'", '"', '|', '\\', '[', ']']
  ];

  const symbolRows = [
    ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
    ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'],
    ['°', '…', '÷', '×', '¶', '∆', '£', '¢', '§', '®']
  ];

  const getCurrentRows = () => {
    switch (keyboardMode) {
      case 'numbers': return numberRows;
      case 'symbols': return symbolRows;
      default: return letterRows;
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === '@gmail.com') {
      setEmail(prev => prev + '@gmail.com');
    } else {
      setEmail(prev => prev + key);
    }
  };

  const handleBackspace = () => {
    setEmail(prev => prev.slice(0, -1));
  };

  const handleSave = () => {
    if (email && appointment && contactInfo) {
      const updatedContactInfo = { ...contactInfo, email };
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
        <Title>{t('contact.updateEmail', 'Update Email Address')}</Title>
        
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Email Input Display */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-card border-2 border-border rounded-lg p-3 w-full max-w-xl">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <input
                  type="text"
                  value={email}
                  readOnly
                  className="flex-1 bg-transparent text-lg font-medium text-foreground focus:outline-none"
                  placeholder="Enter your email address..."
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBackspace}
                  disabled={email.length === 0}
                >
                  <Delete className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Keyboard Mode Switcher */}
          <div className="flex justify-center space-x-2">
            <Button
              variant={keyboardMode === 'letters' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setKeyboardMode('letters')}
            >
              ABC
            </Button>
            <Button
              variant={keyboardMode === 'numbers' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setKeyboardMode('numbers')}
            >
              123
            </Button>
            <Button
              variant={keyboardMode === 'symbols' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setKeyboardMode('symbols')}
            >
              #+=
            </Button>
          </div>

          {/* Compact Keyboard */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <div className="space-y-1">
                {getCurrentRows().map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center space-x-1">
                    {row.map((key) => (
                      <button
                        key={key}
                        onClick={() => handleKeyPress(key)}
                        className="w-12 h-8 bg-card border border-border rounded hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground font-medium text-sm"
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                ))}
                
                {/* @gmail.com button */}
                <div className="flex justify-center mt-1">
                  <button
                    onClick={() => handleKeyPress('@gmail.com')}
                    className="px-3 h-8 bg-primary text-primary-foreground border border-primary rounded hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-medium text-sm"
                  >
                    @gmail.com
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="text-center">
            <Button
              variant="success"
              size="lg"
              onClick={handleSave}
              disabled={!email.trim()}
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

export default UpdateEmail;