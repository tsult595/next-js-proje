import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/app/productLib/db';
import { connectToAuthDatabase } from '@/lib/auth';
import { Iproduct } from '@/app/product/productType';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const product = await getProductById(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updateData = await request.json() as Partial<Iproduct>;
    
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    const updatedProduct = await updateProduct(id, updateData);
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Удалить продукт
    await deleteProduct(id);
    
    // Удалить из favorites всех пользователей
    const users = await connectToAuthDatabase();
    await users.updateMany(
      { 'favorites.product._id': id },
      { $pull: { favorites: { 'product._id': id } } }
    );
    
    return NextResponse.json(
      { success: true, message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}