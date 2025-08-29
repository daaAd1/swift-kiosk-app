import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
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
import { useInternationalization } from '@/contexts/InternationalizationContext';

const PatientLate: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  const { t } = useInternationalization();
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
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
          <AlertCircle className="h-20 w-20 text-danger" />
          
          <Title>{t('appointment.patientLate', 'We notice you arrived late on your appointment.')}</Title>
          
          <div className="max-w-2xl">
            <Text variant="large" center>
              {t('appointment.patientLateText', 'Please report to an assistant at the front desk. Thank you!')}
            </Text>
          </div>

          {appointment && (
            <div className="w-full max-w-3xl">
              <Appointment
                appointment={appointment}
                showWarning={true}
                warningMessage="Patient arrived late"
                centered
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
            {t('button.ok', 'OK')}
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PatientLate;