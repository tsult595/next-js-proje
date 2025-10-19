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
