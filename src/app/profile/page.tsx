'use client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState('');

  const getUserDetails = async () => {
    const response = await axios.post('/api/users/me');
    console.log()
    setData(response.data.data._id);
  };
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to log out');
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="mb-3 text-2xl text-green-600 font-bold">Profile page</h1>
      <div className="flex flex-col border-2 border-green-400 px-8 rounded-xl gap-y-3 items-center justify-center max-h-screen py-3">
        <h2>
          {data === 'nothing' ? (
            'Nothing'
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <button
          onClick={getUserDetails}
          className="text-white px-3 py-2 bg-blue-500 rounded-lg"
        >
          Get Details
        </button>
        <button
          onClick={logout}
          className="text-white px-3 py-2 bg-green-500 rounded-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
