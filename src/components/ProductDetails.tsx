'use client';

import { useParams } from 'next/navigation';
import { useGetProductByIdQuery } from '../app/product/productApi';
import Link from 'next/link';
// import Image from 'next/image';
import { Button } from './ui/button';

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id as string);

  if (isLoading) return <p className="text-center">Loading details...</p>;
  if (isError || !data) return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-2">{data.description}</p>
      <p className="text-orange-500 font-semibold mb-4">${data.price}</p>
      <p className="text-gray-700 mb-4">Category: {data.category}</p>
      <p className="text-gray-700 mb-4">Rating: {data.rating.rate} ({data.rating.count} reviews)</p>
{/*       
      {data.image && (
        <Image 
          src={data.image} 
          alt={data.title} 
          width={400}
          height={256}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )} */}

      <Link href="/">
        <Button variant="outline">← Back to Products</Button>
      </Link>
    </div>
  );
}
