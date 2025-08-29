import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const INACTIVITY_TIMEOUT = 30000; // 30 seconds

export const useInactivityTimer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Don't set timer if we're already on the welcome screen
    if (location.pathname === '/') {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      navigate('/');
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    // Reset timer on location change
    resetTimer();

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetTimerHandler = () => {
      resetTimer();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimerHandler, true);
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, resetTimerHandler, true);
      });
    };
  }, [location.pathname, navigate]);

  return { resetTimer };
};