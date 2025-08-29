import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import BackButton from '@/components/kiosk/BackButton';
import Button from '@/components/kiosk/Button';
import Keyboard from '@/components/kiosk/Keyboard';
import Loader from '@/components/kiosk/Loader';
import { KioskAPI, PatientFilters } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useInternationalization } from '@/contexts/InternationalizationContext';

const ManualForename: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  const { t } = useInternationalization();
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [continuing, setContinuing] = useState(false);
  
  useInactivityTimer();

  useEffect(() => {
    const loadAvailableLetters = async () => {
      try {
        const letters = await KioskAPI.getAvailableLetters('forename', {});
        setAvailableLetters(letters);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load available letters:', error);
        setLoading(false);
      }
    };

    loadAvailableLetters();
  }, []);

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
  };

  const handleContinue = async () => {
    if (!selectedLetter) return;
    
    setContinuing(true);
    try {
      const filters: PatientFilters = { forenameInitial: selectedLetter };
      const result = await KioskAPI.findAppointments(filters);
      
      if (result.isFiltered && result.appointments.length === 1) {
        // Navigate to appointment confirmation
        navigate('/appointment-confirm', { 
          state: { 
            appointment: result.appointments[0],
            filters 
          } 
        });
      } else {
        // Continue to surname selection
        navigate('/manual-surname', { 
          state: { filters } 
        });
      }
    } catch (error) {
      console.error('Failed to filter appointments:', error);
      setContinuing(false);
    }
  };

  if (loading) {
    return (
      <div className="kiosk-container">
        <Header currentTime={currentTime} />
        <div className="kiosk-content">
          <Loader text={t('loading.availableOptions', 'Loading available options...')} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <BackButton />
        <Title>{t('manual.forename', 'Enter the first letter of your forename')}</Title>
        
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <Keyboard
            options={availableLetters}
            onSelect={handleLetterSelect}
            selectedOption={selectedLetter}
            columns={6}
            className="max-w-5xl mx-auto"
          />
          
          <div className="text-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleContinue}
              disabled={!selectedLetter}
              loading={continuing}
            >
              {t('button.continue', 'Continue')}
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ManualForename;