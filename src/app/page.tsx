
import {getProducts} from './productLib/db';
import ProductList from '../components/ProductList';

export default async function Page() {
  try {
    const products = await getProducts();
    return <ProductList initialProducts={products} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Error loading products</div>;
  }
}