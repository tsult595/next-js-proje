'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useProductOperations } from '@/hooks/useProductOperations';
import { FaHeart } from 'react-icons/fa';

export default function FavoritesPage() {
  const { user } = useAuth();
  const { handleToggleFavorite } = useProductOperations();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
        <p className="mb-4">Please log in to view your favorites</p>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  const favorites = user.favorites || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Favorites ({favorites.length})</h1>
        <Link href="/">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven t added any favorites yet</p>
          <Link href="/">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(({ product }: any) => (
            <Card key={product._id} className="relative">
              <Button
                onClick={() => handleToggleFavorite(product._id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition z-10"
                variant="ghost"
                size="icon"
              >
                <FaHeart className="w-6 h-6 text-red-500" />
              </Button>
              <Link href={`/product/${product._id}`}>
                <CardHeader>
                  <CardTitle className="hover:text-blue-600 cursor-pointer">
                    {product.title}
                  </CardTitle>
                </CardHeader>
              </Link>
              <CardContent>
                <p className="font-bold text-lg mb-2">${product.price}</p>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
                <p className="text-sm text-gray-500">
                  Rating: {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}