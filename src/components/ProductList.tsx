"use client";
import { useState } from 'react';
import { Iproduct } from '../app/product/productType';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useRouter } from 'next/navigation';
import { useProductOperations } from '../hooks/useProductOperations';

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
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
              <Button
                onClick={() =>
                  handleUpdateProduct(product._id, { price: product.price + 10 })
                }
                className="mr-2"
              >
                Update Price
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteProduct(product._id)}>
                Delete
              </Button>
              <Button
                onClick={() =>
                  handleUpdateProduct(product._id, { rating: { rate: product.rating.rate + 1, count: product.rating.count + 1 } })
                }
              >
                Add Review
              </Button>
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