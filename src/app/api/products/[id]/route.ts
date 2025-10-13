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
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updateData = await request.json() as Partial<Iproduct>;
    const updatedProduct = await updateProduct(params.id, updateData);
    if (!updatedProduct) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deleteProduct(params.id);
    if (!deleted) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 


