import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
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

const AppointmentDifferentLocation: React.FC = () => {
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
          <AlertTriangle className="h-20 w-20 text-danger" />
          
          <Title>Your appointment is at a different location</Title>
          
          <div className="max-w-2xl">
            <Text variant="large" center>
              If you can't arrive on time, please call {appointment?.location?.phone || 'the clinic'}.
            </Text>
          </div>

          {appointment && (
            <div className="w-full max-w-3xl">
              <Appointment
                appointment={appointment}
                showLocation={true}
                showWarning={true}
                warningMessage={`Different location: ${appointment.location?.address}`}
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            variant="danger" 
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

export default AppointmentDifferentLocation;