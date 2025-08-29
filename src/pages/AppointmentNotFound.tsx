import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import Button from '@/components/kiosk/Button';
import Text from '@/components/kiosk/Text';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useCountdown } from '@/hooks/useCountdown';
import { useInternationalization } from '@/contexts/InternationalizationContext';

const AppointmentNotFound: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  const { t } = useInternationalization();
  const { count, start } = useCountdown(8, () => navigate('/'));

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto">
          <AlertTriangle className="h-24 w-24 text-danger mb-8" />
          
          <Title>{t('appointment.notFound', "We couldn't find your appointment")}</Title>
          
          <div className="mb-12">
            <Text variant="large" center>
              {t('appointment.notFoundText', 'Please report to an assistant at the front desk.')}
            </Text>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <Button 
          variant="danger" 
          size="lg"
          countdown={count}
          onClick={() => navigate('/')}
        >
          {t('button.ok', 'OK')}
        </Button>
      </div>
    </div>
  );
};

export default AppointmentNotFound;