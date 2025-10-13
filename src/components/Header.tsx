'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Logout from '@/components/Logout';

// export default function Header() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//   }, []);

//   return (
//     <div className="flex justify-between items-center mb-8">
//       <h1 className="text-3xl font-bold text-center text-gray-800">Our Products</h1>
//       {isAuthenticated ? <Logout /> : <Link href="/login" className="text-blue-500">Войти</Link>}
//     </div>
//   );
// }







// import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
//    import { Iproduct } from '../product/productType';

//    let cachedClient: MongoClient | null = null;

//    export async function connectToDatabase() {
//      if (cachedClient) {
//        return cachedClient.db('next').collection<Iproduct>('products');
//      }
//      const uri = process.env.MONGODB_URI;
//      if (!uri) {
//        console.error('MONGODB_URI is not defined in .env');
//        throw new Error('MONGODB_URI is not defined');
//      }
//      console.log('Connecting to MongoDB with URI:', uri);
//      const client = new MongoClient(uri, {
//        serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
//      });
//      try {
//        await client.connect();
//        console.log('Connected to MongoDB');
//        cachedClient = client;
//        return client.db('next').collection<Iproduct>('products');
//      } catch (error) {
//        console.error('MongoDB connection error:', error);
//        throw error;
//      }
//    }

//    export async function getProducts(): Promise<Iproduct[]> {
//      const products = await connectToDatabase();
//      const result = await products.find({}).toArray();
//      return result.map((product) => ({ ...product, _id: product._id.toString() }));
//    }

//    export async function getProductById(id: string): Promise<Iproduct | null> {
//      const products = await connectToDatabase();
//      const result = await products.findOne({ _id: new ObjectId(id) });
//      if (result) {
//        result._id = result._id.toString();
//      }
//      return result;
//    }

//    export async function addProduct(productData: Omit<Iproduct, '_id'>): Promise<Iproduct> {
//      const products = await connectToDatabase();
//      console.log('Adding product:', productData);
//      const result = await products.insertOne(productData);
//      console.log('Inserted ID:', result.insertedId);
//      const newProduct = { ...productData, _id: result.insertedId.toString() };
//      return newProduct;
//    }

//    export async function updateProduct(id: string, updateData: Partial<Iproduct>): Promise<Iproduct | null> {
//      const products = await connectToDatabase();
//      const result = await products.findOneAndUpdate(
//        { _id: new ObjectId(id) },
//        { $set: updateData },
//        { returnDocument: 'after' }
//      );
//      if (result.value) {
//        result.value._id = result.value._id.toString();
//      }
//      return result.value;
//    }

//    export async function deleteProduct(id: string): Promise<boolean> {
//      const products = await connectToDatabase();
//      const result = await products.deleteOne({ _id: new ObjectId(id) });
//      return result.deletedCount > 0;
//    }

