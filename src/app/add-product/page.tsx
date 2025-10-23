import ProductPost from '../../components/ProductPost';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function AddProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <Link href="/">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
      <ProductPost />
    </div>
  );
}


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useProductOperations } from '@/hooks/useProductOperations';


// export default function AddProductPage() {
//   const router = useRouter();
//   const { handleAddProduct } = useProductOperations();
  
//   // ✅ ИСПРАВЛЕНИЕ: используйте пустые строки вместо null
//   const [formData, setFormData] = useState({
//     title: '',           // ← было null, теперь ''
//     price: '',           // ← было null, теперь ''
//     description: '',     // ← было null, теперь ''
//     category: '',        // ← было null, теперь ''
//     image: '',           // ← было null, теперь ''
//     city: '',            // ← было null, теперь ''
//     rating: {
//       rate: '',          // ← было null, теперь ''
//       count: 0
//     },
//     bedrooms: '',        // ← было null, теперь ''
//     bathrooms: '',       // ← было null, теперь ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Преобразуем строки в числа для числовых полей
//     const productData = {
//       title: formData.title,
//       price: Number(formData.price),
//       description: formData.description,
//       category: formData.category,
//       rating: {
//         rate: Number(formData.rating.rate),
//         count: 0
//       },
//       image: formData.image,
//       city: formData.city,
//       bedrooms: Number(formData.bedrooms),
//       bathrooms: Number(formData.bathrooms),
//     };

//     const success = await handleAddProduct(productData);
    
//     if (success) {
//       // Небольшая задержка перед редиректом
//       setTimeout(() => {
//         router.push('/products');
//       }, 1000); // 1 секунда задержка
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Добавить продукт</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-2">Название</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}  
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Цена</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}  
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Описание</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//             rows={4}
//           />
//         </div>

//         <div>
//           <label className="block mb-2">URL изображения</label>
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             // required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Местоположение</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-2">Category</label>
//           <input
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Спальни</label>
//           <input
//             type="number"
//             name="bedrooms"
//             value={formData.bedrooms} 
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Ванные</label>
//           <input
//             type="number"
//             name="bathrooms"
//             value={formData.bathrooms} 
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Добавить продукт
//         </button>
//       </form>
//     </div>
//   );
// }
