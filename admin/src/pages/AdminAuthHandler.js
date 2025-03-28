import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // 1. Try with cookie first
        await axios.get('https://medisense-backend.vercel.app/user/verify', {
          withCredentials: true
        });
        
        // 2. If successful, proceed to dashboard
        navigate('/dashboard');
      } catch (error) {
        // 3. If failed, try with localStorage token
        const localToken = localStorage.getItem('token');
        if (localToken) {
          try {
            await axios.get('https://medisense-backend.vercel.app/user/verify', {
              headers: { Authorization: `Bearer ${localToken}` }
            });
            navigate('/dashboard');
            return;
          } catch (err) {
            console.error("Token verification failed:", err);
          }
        }
        
        // 4. Redirect to login if both methods fail
        window.location.href = 'https://medisense-frontend.vercel.app/login';
      }
    };

    verifyAuth();
  }, [navigate]);

  return <div>Verifying authentication...</div>;
};

export default AdminAuthHandler;