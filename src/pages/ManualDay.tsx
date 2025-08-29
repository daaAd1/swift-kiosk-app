import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import BackButton from '@/components/kiosk/BackButton';
import Button from '@/components/kiosk/Button';
import Keyboard from '@/components/kiosk/Keyboard';
import Loader from '@/components/kiosk/Loader';
import { KioskAPI, Appointment } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';

const ManualDay: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  useInactivityTimer();
  
  const [days, setDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDays = async () => {
      try {
        const availableDays = await KioskAPI.getAvailableDays();
        setDays(availableDays);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load days:', error);
        setLoading(false);
      }
    };

    loadDays();
  }, []);

  const handleContinue = async () => {
    if (!selectedDay) return;
    
    try {
      setLoading(true);
      const result = await KioskAPI.filterByDay(selectedDay);
      
      if (result.appointmentFound) {
        const appointment = await KioskAPI.getAppointmentDetails();
        navigate('/appointment-confirm', { state: { appointment } });
      } else {
        navigate('/appointment-not-found');
      }
    } catch (error) {
      console.error('Failed to filter by day:', error);
      navigate('/appointment-not-found');
    }
  };

  const handleBack = () => {
    navigate('/manual-month');
  };

  if (loading) {
    return (
      <div className="kiosk-container">
        <Header currentTime={currentTime} />
        <div className="kiosk-content">
          <Loader text="Loading available days..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <BackButton onClick={handleBack} />
        <Title>Enter the day in which you were born</Title>
        
        <div className="flex-1 flex flex-col justify-center items-center space-y-4 w-full max-w-5xl mx-auto">
          <Keyboard
            options={days}
            onSelect={setSelectedDay}
            selectedOption={selectedDay}
            columns={7}
          />
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleContinue}
            disabled={!selectedDay}
          >
            Continue
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ManualDay;