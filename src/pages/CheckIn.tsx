import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone } from 'lucide-react';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import Card from '@/components/kiosk/Card';
import Button from '@/components/kiosk/Button';
import Loader from '@/components/kiosk/Loader';
import { KioskAPI, CheckInMethod } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useInternationalization } from '@/contexts/InternationalizationContext';

const CheckIn: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  const { t } = useInternationalization();
  const [checkInMethods, setCheckInMethods] = useState<CheckInMethod[]>([]);
  const [loading, setLoading] = useState(true);
  
  useInactivityTimer();

  useEffect(() => {
    const loadCheckInMethods = async () => {
      try {
        const methods = await KioskAPI.getAvailableCheckInMethods();
        setCheckInMethods(methods.filter(method => method.enabled));
        setLoading(false);
      } catch (error) {
        console.error('Failed to load check-in methods:', error);
        setLoading(false);
      }
    };

    loadCheckInMethods();
  }, []);

  const handleEidCardClick = () => {
    navigate('/eid-card');
  };

  const handleHeldAccountClick = () => {
    // For now, redirect to manual check-in as Held account integration is not implemented
    navigate('/manual-forename');
  };

  const handleNoCardClick = () => {
    navigate('/manual-forename');
  };

  if (loading) {
    return (
      <div className="kiosk-container">
        <Header currentTime={currentTime} />
        <div className="kiosk-content">
          <Loader text={t('loading.pleaseWait', 'Please wait...')} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <Title>{t('checkIn.title', 'Patient identification')}</Title>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-12 max-w-4xl mx-auto mb-12">
            {checkInMethods.find(m => m.id === 'eid') && (
              <Card
                title={t('checkIn.eidCard', 'Enter your eID card')}
                icon={<CreditCard className="w-full h-full" />}
                onClick={handleEidCardClick}
              />
            )}
            
            {checkInMethods.find(m => m.id === 'held') && (
              <Card
                title={t('checkIn.heldAccount', 'Sign in with your Held account')}
                icon={<Smartphone className="w-full h-full" />}
                onClick={handleHeldAccountClick}
              />
            )}
          </div>

          <div className="text-center">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleNoCardClick}
            >
              {t('checkIn.noCard', "I don't have my eID card or Held app with me")}
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckIn;