import dbConnect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const bodyRequest = await request.json();
    const { token } = bodyRequest;
    // console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpires: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { message: 'Token expired or invalid.' },
        { status: 401 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();
    return NextResponse.json(
      { message: 'Email verified successfully.', success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
