import dbConnect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import getDataFromToken from '@/helpers/getDataFromToken';
dbConnect();

export async function POST(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request); // Ensure this function returns the correct user ID
    console.log(userID);

    if (!userID) {
      return NextResponse.json(
        { message: 'Invalid or missing token.' },
        { status: 401 }
      );
    }

    const user = await User.findOne({ _id: userID }).select('-password');
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User found', data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'An error occurred.' },
      { status: 500 }
    );
  }
}
