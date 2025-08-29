import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import Button from '@/components/kiosk/Button';
import LanguageCard from '@/components/kiosk/LanguageCard';
import Loader from '@/components/kiosk/Loader';
import { KioskAPI, ClinicInfo, Language } from '@/services/api';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInternationalization } from '@/contexts/InternationalizationContext';
import clinicLogo from '@/assets/clinic-logo.png';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  const { t, setLanguage, currentLanguage } = useInternationalization();
  
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWelcomeData = async () => {
      try {
        const [clinic, availableLanguages] = await Promise.all([
          KioskAPI.getClinicInfo(),
          KioskAPI.getAvailableLanguages()
        ]);
        
        // Use generated logo as placeholder
        clinic.logo = clinicLogo;
        
        setClinicInfo(clinic);
        setLanguages(availableLanguages);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load welcome data:', error);
        setLoading(false);
      }
    };

    loadWelcomeData();
  }, []);

  const handleStartCheckIn = () => {
    navigate('/check-in');
  };

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode);
  };

  if (loading) {
    return (
      <div className="kiosk-container">
        <Header currentTime={currentTime} clinicName={clinicInfo?.name} />
        <div className="kiosk-content">
          <Loader text={t('loading.clinicInfo', 'Loading clinic information...')} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="kiosk-container">
      <Header 
        currentTime={currentTime}
        clinicName={clinicInfo?.name}
        clinicLogo={clinicInfo?.logo}
        showLanguageSelector={languages.length > 1}
        currentLanguage={currentLanguage}
        availableLanguages={languages}
        onLanguageChange={handleLanguageSelect}
      />
      
      <div className="kiosk-content">
        <div className="flex-1 flex flex-col justify-center items-center space-y-8 min-h-0">
          <div className="text-center max-w-3xl">
            <Title>{t('welcome.title', 'Welcome to our clinic!')}</Title>
            
            <div className="mb-8">
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleStartCheckIn}
                className="shadow-lg"
              >
                {t('welcome.checkInButton', 'Tap to check-in')}
              </Button>
            </div>
          </div>

          {/* Language Selection */}
          {languages.length > 1 && (
            <div className="w-full max-w-3xl">
              <h2 className="kiosk-h2 text-center text-muted-foreground mb-6">
                {t('welcome.selectLanguage', 'Select your language')}
              </h2>
              <div className="grid grid-cols-3 gap-4 justify-items-center">
                {languages.map((language) => (
                  <LanguageCard
                    key={language.code}
                    flag={language.flag}
                    countryName={language.name}
                    languageName={language.name}
                    selected={currentLanguage === language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className="w-40"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Welcome;