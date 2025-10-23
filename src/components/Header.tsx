

'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { MdOutlineFavoriteBorder } from "react-icons/md";

export default function Header() {
  const { user, logout, isLoading } = useAuth();
  
  const favoritesCount = user?.favorites?.length || 0;

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
      <h1 className="text-3xl font-bold text-center text-gray-800">Housing Anywhere</h1>
      <ul className="flex gap-4">
        <li>Home</li>
        <Link href="/about"><li>About</li></Link>
        <Link href="/add-product"><li className="hover:text-amber-300">Add Product</li></Link> 
        <Link href="/products"><li>Products</li></Link>
      </ul>
      <div className="flex gap-2">
        {user ? (
          <>
            <span className="text-sm text-gray-600 self-center mr-2">
              Welcome, {user.name}
            </span>
            <div className="relative">
              <Link href="/favorites" className="flex items-center space-x-1">
                <MdOutlineFavoriteBorder className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-gray-700 hover:text-black" />
                <span className="absolute -top-2 -right-2 text-[10px] sm:text-xs font-semibold text-white bg-red-500 rounded-full px-1.5 py-0.5">
                  {favoritesCount}
                </span>
              </Link>
            </div>
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