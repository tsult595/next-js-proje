
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { Iproduct, IproductDB } from '../product/productType';

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient.db('next').collection<IproductDB>('products');
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not defined in .env');
    throw new Error('MONGODB_URI is not defined');
  }
  console.log('Connecting to MongoDB with URI:', uri.replace(/mongodb\+srv:\/\/[^@]+@/, 'mongodb+srv://[hidden]@'));
  const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    cachedClient = client;
    return client.db('next').collection<IproductDB>('products');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function getProducts(): Promise<Iproduct[]> {
  const products = await connectToDatabase();
  const result = await products.find({}).toArray();
  return result.map((product) => ({ ...product, _id: product._id.toString() }));
}

export async function getProductById(id: string): Promise<Iproduct | null> {
  const products = await connectToDatabase();
  const result = await products.findOne({ _id: new ObjectId(id) });
  if (result) {
    return { ...result, _id: result._id.toString() };
  }
  return null;
}

export async function addProduct(productData: Omit<Iproduct, '_id'>): Promise<Iproduct> {
  const products = await connectToDatabase();
  console.log('Adding product:', productData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await products.insertOne(productData as any);
  console.log('Inserted ID:', result.insertedId);
  const newProduct = { ...productData, _id: result.insertedId.toString() };
  return newProduct;
}

export async function updateProduct(id: string, updateData: Partial<Iproduct>): Promise<Iproduct | null> {
  const products = await connectToDatabase();
  console.log('updateProduct called with ID:', id, 'updateData:', updateData);
  
  // Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    console.error('Invalid ObjectId format:', id);
    throw new Error('Invalid product ID format');
  }
  
  // Remove _id from updateData if present since we don't want to update the ID
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...updateDataWithoutId } = updateData;
  
  const result = await products.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDataWithoutId },
    { returnDocument: 'after' }
  );
  
  console.log('MongoDB update result:', result);
  
  if (result) {
    return { ...result, _id: result._id.toString() };
  }
  return null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await connectToDatabase();
  const result = await products.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
 }