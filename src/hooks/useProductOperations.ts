// import { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, 
//   useAddToFavoritesMutation ,
//    useRemoveFromFavoritesMutation  } from '../app/product/productApi';
// import { Iproduct } from '../app/product/productType';
// import { toast } from 'react-toastify';

// export const useProductOperations = () => {
//   const { data, refetch } = useGetProductsQuery();
//   const [addProduct] = useAddProductMutation();
//   const [updateProduct] = useUpdateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();
//   const [addToFavorites] = useAddToFavoritesMutation();
//   const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  
//   const handleAddProduct = async (productData: Omit<Iproduct, '_id'>) => {
//     try {
//       await addProduct(productData).unwrap();
//       toast.success('Product added');
//       refetch();
//       return true;
//     } catch (error) {
//       console.error('Add product error:', error);
//       toast.error('Failed to add product');
//       return false;
//     }
//   };

//   const handleUpdateProduct = async (id: string, updateData: Partial<Iproduct>) => {
//     try {
//       await updateProduct({ id, updateData }).unwrap();
//       toast.success('Product updated');
//       refetch();
//       return true;
//     } catch (error) {
//       console.error('Update product error:', error);
//       toast.error('Failed to update product');
//       return false;
//     }
//   };
  
//   const handleAddToFavorites = async (id: string) => {
//     try {
//       const res = await addToFavorites(id).unwrap();
//       toast.success('Added to favorites');
//       refetch();
//       return res;
//     } catch (error) {
//       console.error('Add to favorites error:', error);
//       toast.error('Failed to add to favorites');
//       return null;
//     }
//   };

//   const handleRemoveFromFavorites = async (id: string) => {
//     try {
//       await removeFromFavorites(id).unwrap();
//       toast.success('Removed from favorites');
//       refetch();
//       return true;
//     } catch (error) {
//       console.error('Remove from favorites error:', error);
//       toast.error('Failed to remove from favorites');
//       return false;
//     }
//   };
//   const handleDeleteProduct = async (id: string) => {
//     try {
//       await deleteProduct(id).unwrap();
//       toast.success('Product deleted');
//       refetch();
//       return true;
//     } catch (error) {
//       console.error('Delete product error:', error);
//       toast.error('Failed to delete product');
//       return false;
//     }
//   };
//    const handleToggleFavorite = async (productId: string, isFavorite?: boolean) => {
//     try {
//       if (isFavorite) {
//         await handleRemoveFromFavorites(productId);
//         return { productId, action: 'removed' };
//       } else {
//         const res = await handleAddToFavorites(productId);
//         return { productId, action: 'added', product: res?.product ?? null };
//       }
//     } catch (error) {
//       console.error('Toggle favorite error:', error);
//       toast.error('Failed to update favorite');
//       return null;
//     }
//   };
//   return {
//    products: data,
//     refetch,
//     handleAddProduct,
//     handleUpdateProduct,
//     handleDeleteProduct,
//     handleToggleFavorite,
//     handleAddToFavorites,
//     handleRemoveFromFavorites,
//   };
// };
  
import { 
  useGetProductsQuery, 
  useAddProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation,
  useToggleFavoriteMutation
} from '../app/product/productApi';
import { Iproduct } from '../app/product/productType';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

export const useProductOperations = () => {
  const { data, refetch } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [toggleFavorite] = useToggleFavoriteMutation();
  const { refreshUser } = useAuth();

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
    
    // Обновить данные пользователя после удаления
    if (refreshUser) {
      await refreshUser();
    }
    
    refetch();
    return true;
  } catch (error) {
    console.error('Delete product error:', error);
    toast.error('Failed to delete product');
    return false;
  }
};

    const handleToggleFavorite = async (productId: string) => {
    try {
      const result = await toggleFavorite(productId).unwrap();
      toast.success(result.message);
      
      // ← ОБНОВИТЬ USER ПОСЛЕ ИЗМЕНЕНИЯ FAVORITES
      await refreshUser();
      
      refetch();
      return result.isFavorite;
    } catch (error) {
      console.error('Toggle favorite error:', error);
      toast.error('Failed to update favorite');
      return null;
    }
  };

  return {
    products: data,
    refetch,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleToggleFavorite,
  };
};



