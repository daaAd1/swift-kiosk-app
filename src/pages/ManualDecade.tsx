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

const ManualDecade: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  useInactivityTimer();
  
  const [decades, setDecades] = useState<string[]>([]);
  const [selectedDecade, setSelectedDecade] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDecades = async () => {
      try {
        const availableDecades = await KioskAPI.getAvailableDecades();
        setDecades(availableDecades);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load decades:', error);
        setLoading(false);
      }
    };

    loadDecades();
  }, []);

  const handleContinue = async () => {
    if (!selectedDecade) return;
    
    try {
      setLoading(true);
      const result = await KioskAPI.filterByDecade(selectedDecade);
      
      if (result.appointmentFound) {
        const appointment = await KioskAPI.getAppointmentDetails();
        navigate('/appointment-confirm', { state: { appointment } });
      } else {
        navigate('/manual-year');
      }
    } catch (error) {
      console.error('Failed to filter by decade:', error);
      navigate('/appointment-not-found');
    }
  };

  const handleBack = () => {
    navigate('/manual-surname');
  };

  if (loading) {
    return (
      <div className="kiosk-container">
        <Header currentTime={currentTime} />
        <div className="kiosk-content">
          <Loader text="Loading available decades..." />
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
        <Title>Enter the decade in which you were born</Title>
        
        <div className="flex-1 flex flex-col justify-center items-center space-y-4 w-full max-w-4xl mx-auto">
          <Keyboard
            options={decades}
            onSelect={setSelectedDecade}
            selectedOption={selectedDecade}
            columns={4}
          />
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleContinue}
            disabled={!selectedDecade}
          >
            Continue
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ManualDecade;