import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '../../productLib/db';
import { Iproduct } from '../../product/productType';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json() as Omit<Iproduct, '_id'>;
    const newProduct = await addProduct(productData);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


