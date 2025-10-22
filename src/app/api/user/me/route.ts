import { NextResponse } from 'next/server';
import { connectToAuthDatabase, verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { userId } = verifyToken(token);

    const users = await connectToAuthDatabase();
    const user = await users.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } } // Не возвращать пароль
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}