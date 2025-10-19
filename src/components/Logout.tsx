'use client';

import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

export default function Logout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
}