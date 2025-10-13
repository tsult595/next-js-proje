"use client";
import { useState } from 'react';
import { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../app/product/productApi';
import { Iproduct } from '../app/product/productType';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'react-toastify';

interface ProductListProps {
  initialProducts: Iproduct[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const { data, refetch } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState<Omit<Iproduct, '_id'>>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  });

  const products = data ?? initialProducts;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = async () => {
    try {
      await addProduct(newProduct).unwrap();
      toast.success('Product added');
      setNewProduct({ title: '', price: 0, description: '', category: '', image: '', rating: { rate: 0, count: 0 } });
      refetch();
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleUpdateProduct = async (id: string, updateData: Partial<Iproduct>) => {
    try {
      await updateProduct({ id, updateData }).unwrap();
      toast.success('Product updated');
      refetch();
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success('Product deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div>
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
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
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className="mb-2"
          />
          <Input
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="mb-2"
          />
          <Button onClick={handleAddProduct}>Add Product</Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
    </div>
  );
}