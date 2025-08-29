import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import Button from '@/components/kiosk/Button';
import Text from '@/components/kiosk/Text';
import Appointment from '@/components/kiosk/Appointment';
import { Appointment as AppointmentType } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useCountdown } from '@/hooks/useCountdown';

const WeCallYouSoon: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTime = useCurrentTime();
  const appointment = location.state?.appointment as AppointmentType;
  const { count, start } = useCountdown(8, () => navigate('/'));

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (!appointment) {
      navigate('/');
    }
  }, [appointment, navigate]);

  if (!appointment) {
    return null;
  }

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
          <Clock className="h-24 w-24 text-primary mb-8" />
          
          <Title>We'll call you soon</Title>
          
          <div className="mb-8">
            <Text variant="large" center>
              We have noted your arrival, and your appointment is scheduled. Please take a coffee 
              and have a seat in the waiting room until you are called for your appointment. 
              It will be anytime soon!
            </Text>
          </div>

          <div className="w-full max-w-3xl mb-8">
            <Appointment appointment={appointment} centered />
          </div>
        </div>
      </div>
      
      <Footer />
      
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <Button 
          variant="success" 
          size="lg"
          countdown={count}
          onClick={() => navigate('/')}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default WeCallYouSoon;