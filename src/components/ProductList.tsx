"use client";
import { useState } from 'react';
import { Iproduct } from '../app/product/productType';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useRouter } from 'next/navigation';
import { useProductOperations } from '../hooks/useProductOperations';
import Link from 'next/link';

interface ProductListProps {
  initialProducts: Iproduct[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const router = useRouter();
  const { products, handleUpdateProduct, handleDeleteProduct } = useProductOperations();
  const [searchTerm, setSearchTerm] = useState('');

  const displayProducts = products ?? initialProducts;

  const filteredProducts = displayProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Card key={product._id}>
            <Button
              onClick={() => {
                // Add to favorites logic
              }}
            >
              Add to Favorites
            </Button>
            <Link href={`/product/${product._id}`}>
              <CardHeader>
                <CardTitle className="hover:text-blue-600 cursor-pointer">{product.title}</CardTitle>
              </CardHeader>
            </Link>
            <CardContent>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
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
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateProduct(product._id, { rating: { rate: product.rating.rate + 1, count: product.rating.count + 1 } });
                  }}
                  size="sm"
                >
                  Add Review
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <Button
          onClick={() => router.push('/add-product')}
          className="mt-4"
        >
          Add New Product
        </Button>
      </div>
    </div>
  );
}