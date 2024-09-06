import dbConnect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import sendEmail from '@/helpers/mailer';
dbConnect();

export async function POST(request: NextRequest) {
  try {
    const bodyRequest = await request.json();
    const { username, email, password } = bodyRequest;
    console.log(bodyRequest);

    // User Find in Database && validation
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists.' },
        { status: 409 }
      );
    }

    // Password hashed
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // New User Saved
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email
    sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json(
      { message: 'User registered successfully.', savedUser, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
