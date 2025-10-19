import { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../app/product/productApi';
import { Iproduct } from '../app/product/productType';
import { toast } from 'react-toastify';

export const useProductOperations = () => {
  const { data, refetch } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async (productData: Omit<Iproduct, '_id'>) => {
    try {
      await addProduct(productData).unwrap();
      toast.success('Product added');
      refetch();
      return true;
    } catch (error) {
      console.error('Add product error:', error);
      toast.error('Failed to add product');
      return false;
    }
  };

  const handleUpdateProduct = async (id: string, updateData: Partial<Iproduct>) => {
    try {
      await updateProduct({ id, updateData }).unwrap();
      toast.success('Product updated');
      refetch();
      return true;
    } catch (error) {
      console.error('Update product error:', error);
      toast.error('Failed to update product');
      return false;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success('Product deleted');
      refetch();
      return true;
    } catch (error) {
      console.error('Delete product error:', error);
      toast.error('Failed to delete product');
      return false;
    }
  };

  return {
    products: data,
    refetch,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
};
