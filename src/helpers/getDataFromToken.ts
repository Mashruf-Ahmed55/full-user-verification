import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    if (!decodedToken || !decodedToken.userId) {
      throw new Error('Invalid token or user ID not found.');
    }

    return decodedToken.userId;
  } catch (error: any) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
};

export default getDataFromToken;
