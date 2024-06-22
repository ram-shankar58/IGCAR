import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TimeoutHandler = ({ children }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const warningRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  const logout = () => {
    localStorage.removeItem("user");
    toast.warn("Logged out due to inactivity or connection loss");
    navigate('/login');
  };

  const resetTimeout = () => {
    clearTimeout(timeoutRef.current);
    clearTimeout(warningRef.current);

    timeoutRef.current = setTimeout(() => {
      logout();
    }, 10 * 60 * 1000); // 10 minutes

    warningRef.current = setTimeout(() => {
      toast.warn("You will be logged out soon due to inactivity");
    }, 9 * 60 * 1000); // 9 minutes
  };

  const handleActivity = () => {
    lastActivityRef.current = Date.now();
    resetTimeout();
  };

  const checkBackendConnection = async () => {
    try {
      const response = await fetch('/api/status'); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error('Connection failed');
      }
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimeout();

    const backendCheckInterval = setInterval(checkBackendConnection, 60 * 1000); // 1 minute

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearTimeout(timeoutRef.current);
      clearTimeout(warningRef.current);
      clearInterval(backendCheckInterval);
    };
  }, []);

  return <>{children}</>;
};

export default TimeoutHandler;
