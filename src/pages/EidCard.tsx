import React from 'react';
import { CreditCard } from 'lucide-react';
import Header from '@/components/kiosk/Header';
import Footer from '@/components/kiosk/Footer';
import Title from '@/components/kiosk/Title';
import BackButton from '@/components/kiosk/BackButton';
import Card from '@/components/kiosk/Card';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';

const EidCard: React.FC = () => {
  const currentTime = useCurrentTime();
  useInactivityTimer();

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <BackButton />
        <Title>Patient identification</Title>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <Card
              title="Insert your eID card"
              icon={<CreditCard className="w-full h-full animate-pulse" />}
              description="Please insert your Belgian eID card into the card reader and wait for the system to read your information."
              className="text-center"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EidCard;