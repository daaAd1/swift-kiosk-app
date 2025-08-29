import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  clinicName?: string;
  clinicLogo?: string;
  currentTime?: string;
  showLanguageSelector?: boolean;
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
  availableLanguages?: Array<{ code: string; name: string; flag: string }>;
}

const Header: React.FC<HeaderProps> = ({
  clinicName = "Central Medical Clinic",
  clinicLogo,
  currentTime,
  showLanguageSelector = false,
  currentLanguage = "en",
  onLanguageChange,
  availableLanguages = []
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <header className="bg-card border-b border-border shadow-sm" style={{ height: 'var(--kiosk-header-height)' }}>
      <div className="kiosk-container">
        <div className="flex items-center justify-between h-full px-16">
          {/* Logo and Clinic Name */}
          <div className="flex items-center space-x-6">
            {clinicLogo && (
              <img 
                src={clinicLogo} 
                alt={clinicName}
                className="h-12 w-auto object-contain"
              />
            )}
            <h1 className="text-2xl font-bold text-foreground">{clinicName}</h1>
          </div>

          {/* Time and Language Selector */}
          <div className="flex items-center space-x-8">
            {currentTime && (
              <div className="text-xl font-semibold text-muted-foreground">
                {currentTime}
              </div>
            )}
            
            {showLanguageSelector && availableLanguages.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 bg-secondary hover:bg-secondary-hover px-4 py-2 rounded-lg kiosk-interactive kiosk-touch-target"
                >
                  <span className="text-lg">
                    {availableLanguages.find(lang => lang.code === currentLanguage)?.flag}
                  </span>
                  <span className="font-medium">
                    {availableLanguages.find(lang => lang.code === currentLanguage)?.name}
                  </span>
                  <ChevronDown className="h-5 w-5" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[200px]">
                    {availableLanguages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          onLanguageChange?.(language.code);
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-muted text-left kiosk-interactive"
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;