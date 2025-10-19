
import {getProducts} from './productLib/db';
import ProductList from '../components/ProductList';
import Header from '../components/Header';

export default async function Page() {
  try {
    const products = await getProducts();
    return (
      <div>
        <Header />
        <ProductList initialProducts={products} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Error loading products</div>;
  }
}