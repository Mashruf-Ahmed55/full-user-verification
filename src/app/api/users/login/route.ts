import dbConnect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const bodyRequest = await request.json();
    const { email, password } = bodyRequest;
    console.log(bodyRequest);
    // User Find in Database && validation
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Email does not exists.' },
        { status: 400 }
      );
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Incorrect password.' },
        { status: 400 }
      );
    }
    // Generate JWT
    const tokenData = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });
    const response = NextResponse.json(
      { message: 'Login successful.', success: true },
      { status: 200 }
    );
    response.cookies.set('token', token, {
      httpOnly: true, // 1 day
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
