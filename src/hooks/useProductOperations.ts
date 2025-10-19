import { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, useAddToFavoritesMutation , useRemoveFromFavoritesMutation  } from '../app/product/productApi';
import { Iproduct } from '../app/product/productType';
import { toast } from 'react-toastify';

export const useProductOperations = () => {
  const { data, refetch } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();

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
  const handleAddToFavorites = async (id: string) => {
    try {
      await addToFavorites(id).unwrap();
      toast.success('Product added to favorites');
      return true;
    } catch (error) {
      console.error('Add to favorites error:', error);
      toast.error('Failed to add product to favorites');
      return false;
    }
  };
  const handleRemoveFromFavorites = async (id: string) => {
    try {
      await removeFromFavorites(id).unwrap();
      toast.success('Product removed from favorites');
      return true;
    } catch (error) {
      console.error('Remove from favorites error:', error);
      toast.error('Failed to remove product from favorites');
      return false;
    }
  };

  return {
    products: data,
    refetch,
    handleAddProduct,
    handleAddToFavorites,
    handleUpdateProduct,
    handleDeleteProduct,
    handleRemoveFromFavorites,
  };
};


