'use client'
import React from 'react'
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Iproduct } from '../app/product/productType';
import { useState } from 'react';
import { useProductOperations } from '../hooks/useProductOperations';
import ImageUpload from './ImageUpload';

const ProductPost = () => {
  const { handleAddProduct } = useProductOperations();
  const [newProduct, setNewProduct] = useState<Omit<Iproduct, '_id'>>({
    title: '',
    price: 0,
    description: '',
    city: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  });

  const onSubmit = async () => {
    if (!newProduct.image) {
      alert('Please upload an image');
      return;
    }

    const success = await handleAddProduct(newProduct);
    if (success) {
      setNewProduct({ 
        title: '', 
        price: 0,
        description: '', 
        city: '', 
        category: '', 
        image: '', 
        rating: { rate: 0, count: 0 } 
      });
    }
  }; 

  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            className="mb-2"
          />
          <Input
            type="number"
            placeholder="Price"
            value={newProduct.price || ''}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) || 0 })}
            className="mb-2"
          />
          <Input
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="City"
            value={newProduct.city}
            onChange={(e) => setNewProduct({ ...newProduct, city: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="mb-2"
          />
          
          {/* ✅ Заменили текстовый input на загрузку изображения */}
          <ImageUpload
            onImageUpload={(url) => setNewProduct({ ...newProduct, image: url })}
            currentImage={newProduct.image}
          />

          <Button onClick={onSubmit} className="mt-4">Add Product</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductPost