import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PharmacyAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthMessage = (event) => {
      if (event.data.type === 'AUTH_TOKEN') {
        const { token, user } = event.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Pharmacy login successful!');
        navigate('/pharmacy/dashboard');
        event.source.postMessage({ type: 'AUTH_SUCCESS' }, event.origin);
      }
    };

    window.addEventListener('message', handleAuthMessage);
    return () => window.removeEventListener('message', handleAuthMessage);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Pharmacy Authentication</h1>
        <p>Please wait while we verify your pharmacy credentials.</p>
      </div>
    </div>
  );
};

export default PharmacyAuthHandler;