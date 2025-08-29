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
import { useInternationalization } from '@/contexts/InternationalizationContext';

const ManualYear: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  const { t } = useInternationalization();
  useInactivityTimer();
  
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadYears = async () => {
      try {
        const availableYears = await KioskAPI.getAvailableYears();
        setYears(availableYears);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load years:', error);
        setLoading(false);
      }
    };

    loadYears();
  }, []);

  const handleContinue = async () => {
    if (!selectedYear) return;
    
    try {
      setLoading(true);
      const result = await KioskAPI.filterByYear(selectedYear);
      
      if (result.appointmentFound) {
        const appointment = await KioskAPI.getAppointmentDetails();
        navigate('/appointment-confirm', { state: { appointment } });
      } else {
        navigate('/manual-month');
      }
    } catch (error) {
      console.error('Failed to filter by year:', error);
      navigate('/appointment-not-found');
    }
  };

  const handleBack = () => {
    navigate('/manual-decade');
  };

  if (loading) {
    return (
      <div className="kiosk-container">
        <Header currentTime={currentTime} />
        <div className="kiosk-content">
          <Loader text={t('loading.availableYears', 'Loading available years...')} />
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
        <Title>{t('manual.year', 'Enter the year in which you were born')}</Title>
        
        <div className="flex-1 flex flex-col justify-center items-center space-y-4 w-full max-w-5xl mx-auto">
          <Keyboard
            options={years}
            onSelect={setSelectedYear}
            selectedOption={selectedYear}
            columns={5}
          />
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleContinue}
            disabled={!selectedYear}
          >
            {t('button.continue', 'Continue')}
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ManualYear;