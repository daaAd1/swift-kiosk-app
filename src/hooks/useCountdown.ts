import { useState, useEffect, useRef } from 'react';

export const useCountdown = (initialCount: number, onComplete?: () => void) => {
  const [count, setCount] = useState(initialCount);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const reset = (newCount?: number) => {
    setCount(newCount ?? initialCount);
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isActive && count > 0) {
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, count, onComplete]);

  return { count, isActive, start, stop, reset };
};