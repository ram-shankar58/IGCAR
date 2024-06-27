import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkBackendConnection } from '../utils/APIRequest';

const TimeoutHandler = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timeout, warningTimeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      clearTimeout(warningTimeout);

      warningTimeout = setTimeout(() => {
        setOpen(true);
        timeout = setTimeout(() => {
          localStorage.removeItem('user');
          navigate('/login');
        }, 5 * 60 * 1000); // 5 minutes after warning
      }, 5 * 60 * 1000); // 5 minutes of inactivity
    };

    const handleActivity = () => {
      setOpen(false);
      resetTimeout();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeout);
      clearTimeout(warningTimeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [navigate]);

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        localStorage.removeItem('user');
        navigate('/connection-snapped');
      }
    };

    const interval = setInterval(checkConnection, 60 * 1000); // Check every 1 minute

    return () => clearInterval(interval);
  }, [navigate]);

  return <>{children}</>;
};

export default TimeoutHandler;
