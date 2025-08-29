import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import Button from '@/components/kiosk/Button';
import Text from '@/components/kiosk/Text';
import Appointment from '@/components/kiosk/Appointment';
import Loader from '@/components/kiosk/Loader';
import { KioskAPI, Appointment as AppointmentType } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useCountdown } from '@/hooks/useCountdown';

const SorryDelay: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  useInactivityTimer();
  
  const [appointment, setAppointment] = useState<AppointmentType | null>(null);
  const [loading, setLoading] = useState(true);
  const { count: countdown, start } = useCountdown(8, () => navigate('/'));

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const appointmentData = await KioskAPI.getAppointmentDetails();
        setAppointment(appointmentData);
        setLoading(false);
        start(); // Start countdown after loading
      } catch (error) {
        console.error('Failed to load appointment:', error);
        setLoading(false);
        start(); // Start countdown even if loading fails
      }
    };

    loadAppointment();
  }, [start]);

  const handleOK = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="kiosk-container">
        <Header currentTime={currentTime} />
        <div className="kiosk-content">
          <Loader text="Loading appointment details..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
          <Clock className="h-20 w-20 text-warning" />
          
          <Title>We are sorry for the delay.</Title>
          
          <div className="max-w-3xl">
            <Text variant="large" center>
              It takes a bit longer than expected to prepare for your treatment. 
              Please take a coffee and have a seat in the waiting room until you are called for your appointment. 
              It will be anytime soon!
            </Text>
          </div>

          {appointment && (
            <div className="w-full max-w-3xl">
              <Appointment
                appointment={appointment}
                centered
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            variant="success" 
            size="lg"
            onClick={handleOK}
            countdown={countdown}
          >
            OK
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SorryDelay;