import { NextResponse } from 'next/server';
import { getProductById } from '@/app/productLib/db';
import { connectToAuthDatabase, verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { userId } = verifyToken(token);

    // Check if product exists
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get user and check if product is already in favorites
    const users = await connectToAuthDatabase();
    const user = await users.findOne({ _id: new ObjectId(userId) });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const favorites = user.favorites || [];
    const favoriteIndex = favorites.findIndex(
      (fav: any) => fav.product._id === id
    );

    let isFavorite = false;
    let message = '';

    if (favoriteIndex >= 0) {
      // Remove from favorites
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { favorites: { 'product._id': id } } }
      );
      message = 'Removed from favorites';
      isFavorite = false;
    } else {
      // Add to favorites
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { favorites: { product } } }
      );
      message = 'Added to favorites';
      isFavorite = true;
    }

    return NextResponse.json({ 
      success: true, 
      message,
      isFavorite 
    }, { status: 200 });

  } catch (error) {
    console.error('Error toggling favorite:', error);
    
    if (error instanceof Error && error.message.includes('jwt')) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}