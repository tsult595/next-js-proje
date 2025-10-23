import { ObjectId } from 'mongodb';

export interface Iproduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  city : string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  isFavorite?: boolean | null;
}

export interface IproductDB {
  _id: ObjectId;
  title: string;
  price: number;
  description: string;
  city : string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
   isFavorite?: boolean | null;
}