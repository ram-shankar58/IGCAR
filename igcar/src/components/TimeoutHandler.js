import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkConnection, logout } from '../store/authSlice';

const TimeoutHandler = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timeout, warningTimeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      clearTimeout(warningTimeout);

      warningTimeout = setTimeout(() => {
        setOpen(true);
        timeout = setTimeout(() => {
          dispatch(logout());
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
  }, [navigate, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkConnection());
    }, 60 * 1000); // Check every 1 minute

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (!isConnected) {
      dispatch(logout());
      navigate('/connection-snapped');
    }
  }, [isConnected, navigate, dispatch]);

  return <>{children}</>;
};

export default TimeoutHandler;
