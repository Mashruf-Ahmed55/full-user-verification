'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [button, setButton] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Sign Up successfully');
      toast.success('SignUp successful', response.data);
      router.push('/login');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className=" mb-3 text-2xl text-green-600 font-bold">Sign Up From</h1>
      <div className="flex flex-col border-2 border-green-400 px-8 rounded-xl gap-y-3 items-center justify-center max-h-screen py-3">
        <h1 className=" text-white px-3 py-2 bg-green-500 rounded-lg">
          {loading ? 'Processing' : 'Sign Up'}
        </h1>
        <hr />
        <div className="flex flex-col gap-y-3 items-center">
          <div className="flex flex-col justify-start gap-y-2">
            <label htmlFor="username" className=" text-green-600">
              Username
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-green-600 text-green-600"
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter Name"
            />
          </div>
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
            onClick={onSignUp}
            className="text-white px-3 py-2 bg-green-500 rounded-lg"
          >
            {button ? 'No SignUp' : 'sign Up'}
          </button>
          <h1>
            Go to{' '}
            <Link className="text-green-600 underline" href={'/login'}>
              log In
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
