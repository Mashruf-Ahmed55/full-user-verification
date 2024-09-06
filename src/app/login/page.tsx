'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [button, setButton] = useState(false);

  const [loading, setLoading] = useState(false);

  const onLogIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Log In successfully');
      toast.success('Login successful', response.data);
      router.push('/profile');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="mb-3 text-2xl text-green-600 font-bold">Log In From</h1>
      <div className="flex flex-col border-2 border-green-400 px-8 rounded-xl gap-y-3 items-center justify-center max-h-screen py-3">
        <h1 className=" text-white px-3 py-2 bg-green-500 rounded-lg">
          {loading ? 'Processing' : 'Log In'}
        </h1>
        <hr />
        <div className="flex flex-col gap-y-3 items-center">
          <div className="flex flex-col justify-start gap-y-2">
            <label htmlFor="email" className=" text-green-600">
              Email
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-green-600 text-green-600"
              type="text"
              id="username"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email"
            />
          </div>
          <div className="flex flex-col justify-start gap-y-2">
            <label htmlFor="password" className=" text-green-600">
              Password
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-green-600 text-green-600"
              type="text"
              id="username"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter Password"
            />
          </div>
          <button
            onClick={onLogIn}
            className="text-white px-3 py-2 bg-green-500 rounded-lg"
          >
            {button ? 'No LogIn' : 'Log In'}
          </button>
          <h1>
            Go to{' '}
            <Link className="text-green-600 underline" href={'/signup'}>
              Sign Up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
