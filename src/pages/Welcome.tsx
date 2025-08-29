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
import clinicLogo from '@/assets/clinic-logo.png';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const currentTime = useCurrentTime();
  
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
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
    setSelectedLanguage(languageCode);
    // Here you would typically update the app's language context
  };

  if (loading) {
    return (
      <div className="kiosk-container">
        <Header currentTime={currentTime} clinicName={clinicInfo?.name} />
        <div className="kiosk-content">
          <Loader text="Loading clinic information..." />
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
        currentLanguage={selectedLanguage}
        availableLanguages={languages}
        onLanguageChange={handleLanguageSelect}
      />
      
      <div className="kiosk-content">
        <div className="flex-1 flex flex-col justify-center items-center space-y-12">
          <div className="text-center max-w-4xl">
            <Title>Welcome to our clinic!</Title>
            
            <div className="mb-12">
              <Button 
                variant="primary" 
                size="xl"
                onClick={handleStartCheckIn}
                className="shadow-lg"
              >
                Tap to check-in
              </Button>
            </div>
          </div>

          {/* Language Selection */}
          {languages.length > 1 && (
            <div className="w-full max-w-4xl">
              <h2 className="kiosk-h2 text-center text-muted-foreground mb-8">
                Select your language
              </h2>
              <div className="grid grid-cols-3 gap-6 justify-items-center">
                {languages.map((language) => (
                  <LanguageCard
                    key={language.code}
                    flag={language.flag}
                    countryName={language.name}
                    languageName={language.name}
                    selected={selectedLanguage === language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className="w-48"
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