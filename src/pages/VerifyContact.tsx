import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import Button from '@/components/kiosk/Button';
import ContactInfoCard from '@/components/kiosk/ContactInfoCard';
import { Appointment as AppointmentType, ContactInfo } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useInternationalization } from '@/contexts/InternationalizationContext';

const VerifyContact: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTime = useCurrentTime();
  const { t } = useInternationalization();
  const [processing, setProcessing] = useState(false);
  
  const appointment = location.state?.appointment as AppointmentType;
  const contactInfo = location.state?.contactInfo as ContactInfo;
  
  useInactivityTimer();

  useEffect(() => {
    if (!appointment || !contactInfo) {
      navigate('/');
    }
  }, [appointment, contactInfo, navigate]);

  const handleConfirm = async () => {
    setProcessing(true);
    // Simulate API call to confirm contact details
    setTimeout(() => {
      navigate('/welcome-final', { state: { appointment } });
    }, 300);
  };

  const handleUpdateEmail = () => {
    navigate('/update-email', {
      state: { appointment, contactInfo }
    });
  };

  const handleUpdatePhone = () => {
    navigate('/update-phone', {
      state: { appointment, contactInfo }
    });
  };

  if (!appointment || !contactInfo) {
    return null;
  }

  const hasAllInfo = contactInfo.email && contactInfo.phone;

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <Title>{t('contact.verify', 'Verify your contact details')}</Title>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-3xl mx-auto space-y-8 mb-12">
            {contactInfo.email && (
              <ContactInfoCard
                type="email"
                label={t('contact.email', 'Email address')}
                value={contactInfo.email}
                onUpdate={handleUpdateEmail}
              />
            )}
            
            {contactInfo.phone && (
              <ContactInfoCard
                type="phone"
                label={t('contact.phone', 'Phone number')}
                value={contactInfo.phone}
                onUpdate={handleUpdatePhone}
              />
            )}
          </div>
          
          {hasAllInfo && (
            <div className="text-center">
              <Button 
                variant="success" 
                size="lg"
                onClick={handleConfirm}
                loading={processing}
                showArrow
              >
                {t('button.thisIsCorrect', 'This is correct')}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VerifyContact;