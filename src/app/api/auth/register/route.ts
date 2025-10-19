import { NextResponse } from 'next/server';
import { createUser, generateToken } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Create user
    const user = await createUser(name, email, password);

    // Generate token
    const token = generateToken(user._id.toString());

    // Return user data (without password) and token
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    return NextResponse.json({
      user: userData,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    
    if (error instanceof Error && error.message === 'User already exists') {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
