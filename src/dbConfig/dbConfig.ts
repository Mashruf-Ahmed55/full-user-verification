import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connections = mongoose.connection;
    connections.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    
    connections.on('error', (error: any) => {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    });
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default dbConnect;
