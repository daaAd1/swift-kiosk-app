import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import Button from '@/components/kiosk/Button';
import Appointment from '@/components/kiosk/Appointment';
import { KioskAPI, Appointment as AppointmentType } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';

const AppointmentConfirm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTime = useCurrentTime();
  const [processing, setProcessing] = useState(false);
  
  const appointment = location.state?.appointment as AppointmentType;
  
  useInactivityTimer();

  useEffect(() => {
    if (!appointment) {
      navigate('/');
    }
  }, [appointment, navigate]);

  const handleReject = () => {
    navigate('/appointment-not-found');
  };

  const handleConfirm = async () => {
    if (!appointment) return;
    
    setProcessing(true);
    try {
      const result = await KioskAPI.performCheckIn(appointment.id);
      
      if (result.alreadyCheckedIn) {
        navigate('/we-call-you-soon', { state: { appointment } });
      } else if (result.needsContactVerification) {
        navigate('/verify-contact', { 
          state: { 
            appointment, 
            contactInfo: result.contactInfo 
          } 
        });
      } else if (result.isLate) {
        navigate('/patient-late', { state: { appointment } });
      } else if (result.hasDelay) {
        navigate('/sorry-delay', { state: { appointment } });
      } else if (result.needsEidRegistration) {
        navigate('/eid-warning', { state: { appointment } });
      } else {
        navigate('/welcome-final', { state: { appointment } });
      }
    } catch (error) {
      console.error('Failed to perform check-in:', error);
      setProcessing(false);
    }
  };

  if (!appointment) {
    return null;
  }

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <div className="text-center mb-8">
          <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />
          <Title>Is this your appointment?</Title>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-3xl mx-auto mb-12">
            <Appointment 
              appointment={appointment}
              showLocation
            />
          </div>
          
          <div className="flex justify-center space-x-8">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={handleReject}
              disabled={processing}
            >
              No
            </Button>
            <Button 
              variant="success" 
              size="lg"
              onClick={handleConfirm}
              loading={processing}
              showArrow
            >
              This is correct
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AppointmentConfirm;