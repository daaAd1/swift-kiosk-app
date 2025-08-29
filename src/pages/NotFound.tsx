import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import Header from "@/components/kiosk/Header";
import Footer from "@/components/kiosk/Footer";
import Title from "@/components/kiosk/Title";
import Button from "@/components/kiosk/Button";
import Text from "@/components/kiosk/Text";
import { useCurrentTime } from "@/hooks/useCurrentTime";

const NotFound = () => {
  const location = useLocation();
  const currentTime = useCurrentTime();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="kiosk-container">
      <Header currentTime={currentTime} />
      
      <div className="kiosk-content">
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto">
          <AlertTriangle className="h-24 w-24 text-warning mb-8" />
          
          <Title>404</Title>
          
          <div className="mb-12">
            <Text variant="large" center>
              Oops! Page not found
            </Text>
          </div>
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
