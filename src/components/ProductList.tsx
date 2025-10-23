
"use client";
import { useState } from 'react';
import { Iproduct } from '../app/product/productType';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useRouter } from 'next/navigation';
import { useProductOperations } from '../hooks/useProductOperations';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface ProductListProps {
  initialProducts: Iproduct[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { products, handleUpdateProduct, handleDeleteProduct, handleToggleFavorite } = useProductOperations();
  const [searchTerm, setSearchTerm] = useState('');

  const displayProducts = products ?? initialProducts;

  const filteredProducts = displayProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if product is in user's favorites
  const isProductFavorite = (productId: string) => {
    if (!user?.favorites) return false;
    return user.favorites.some((fav) => fav.product._id === productId);
  };

  return (
    <div>
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product._id} className="relative">
            {user && (
              <Button
                onClick={() => handleToggleFavorite(product._id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition z-10"
                variant="ghost"
                size="icon"
              >
                {isProductFavorite(product._id) ? (
                  <FaHeart className="w-6 h-6 text-red-500" />
                ) : (
                  <FaRegHeart className="w-6 h-6 text-gray-500" />
                )}
              </Button>
            )}
            <Link href={`/product/${product._id}`}>
              <CardHeader>
                <CardTitle className="hover:text-blue-600 cursor-pointer">{product.title}</CardTitle>
              </CardHeader>
            </Link>
            <CardContent>
              {product.image ? (
                <img src={product.image} alt={product.title} />
              ) : (
                <p>No image available</p>
              )}
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <p>City: {product.city}</p>
              <p>Category: {product.category}</p>
              <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateProduct(product._id, { price: product.price + 10 });
                  }}
                  size="sm"
                >
                  Update Price
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product._id);
                  }}
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        onClick={() => router.push('/add-product')}
        className="mt-4"
      >
        Add New Product
      </Button>
    </div>
  );
}