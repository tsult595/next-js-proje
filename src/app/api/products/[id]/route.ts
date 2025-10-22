import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '../../../productLib/db';
import { Iproduct } from '../../../product/productType';

// import { z } from 'zod';

// const ProductSchema = z.object({
//   title: z.string().optional(),
//   price: z.number().optional(),
//   description: z.string().optional(),
//   category: z.string().optional(),
//   image: z.string().optional(),
//   rating: z.object({ rate: z.number(), count: z.number() }).optional(),
// });


export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const product = await getProductById(id);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } // Типизация для params
) {
  try {
    // Дожидаемся params
    const { id } = await context.params;
    console.log('PUT request for ID:', id); // Лог для дебага

    const updateData = await request.json() as Partial<Iproduct>; // Исправил Iproduct на IProduct
    const updatedProduct = await updateProduct(id, updateData);

    if (!updatedProduct) {
      console.log('Product not found in DB for ID:', id);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/products/[id]:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ idx: string }> }
) {
  try {
    const { idx } = await context.params;
    const deleted = await deleteProduct(idx);
    if (!deleted) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 


