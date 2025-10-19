'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Our Products</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">Our Products</h1>
      <div className="flex gap-2">
        {user ? (
          <>
            <span className="text-sm text-gray-600 self-center mr-2">
              Welcome, {user.name}
            </span>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}