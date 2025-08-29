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

const ManualMonth: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  useInactivityTimer();
  
  const [months, setMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMonths = async () => {
      try {
        const availableMonths = await KioskAPI.getAvailableMonths();
        setMonths(availableMonths);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load months:', error);
        setLoading(false);
      }
    };

    loadMonths();
  }, []);

  const handleContinue = async () => {
    if (!selectedMonth) return;
    
    try {
      setLoading(true);
      const result = await KioskAPI.filterByMonth(selectedMonth);
      
      if (result.appointmentFound) {
        const appointment = await KioskAPI.getAppointmentDetails();
        navigate('/appointment-confirm', { state: { appointment } });
      } else {
        navigate('/manual-day');
      }
    } catch (error) {
      console.error('Failed to filter by month:', error);
      navigate('/appointment-not-found');
    }
  };

  const handleBack = () => {
    navigate('/manual-year');
  };

  if (loading) {
    return (
      <div className="kiosk-container">
        <Header currentTime={currentTime} />
        <div className="kiosk-content">
          <Loader text="Loading available months..." />
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
        <Title>Enter the month in which you were born</Title>
        
        <div className="flex-1 flex flex-col justify-center items-center space-y-4 w-full max-w-4xl mx-auto">
          <Keyboard
            options={months}
            onSelect={setSelectedMonth}
            selectedOption={selectedMonth}
            columns={4}
          />
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleContinue}
            disabled={!selectedMonth}
          >
            Continue
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ManualMonth;