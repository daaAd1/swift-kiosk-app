import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import BackButton from '@/components/kiosk/BackButton';
import Card from '@/components/kiosk/Card';
import Loader from '@/components/kiosk/Loader';
import { KioskAPI } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useInternationalization } from '@/contexts/InternationalizationContext';

const EidCard: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  const { t } = useInternationalization();
  const [showLoader, setShowLoader] = useState(false);
  useInactivityTimer();

  // Show loader after 1000ms
  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setShowLoader(true);
    }, 1000);

    return () => clearTimeout(loaderTimer);
  }, []);

  // Simulate eID card reading after 3 seconds
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        // Simulate successful eID card reading
        const appointment = await KioskAPI.getAppointmentDetails();
        navigate('/appointment-confirm', { state: { appointment, fromEid: true } });
      } catch (error) {
        console.error('Failed to read eID card:', error);
        navigate('/appointment-not-found');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <BackButton />
        <Title>{t('eid.title', 'Patient identification')}</Title>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            {showLoader ? (
              <Loader text={t('loading.pleaseWait', 'Reading eID card...')} />
            ) : (
              <Card
                title={t('eid.instruction', 'Insert your eID card')}
                icon={<CreditCard className="w-full h-full animate-pulse" />}
                description={t('eid.description', 'Please insert your Belgian eID card into the card reader and wait for the system to read your information.')}
                className="text-center"
              />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EidCard;