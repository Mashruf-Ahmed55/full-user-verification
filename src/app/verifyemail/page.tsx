'use client';

import axios from 'axios';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Page() {
  // const router = useRouter();
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      setError(true);
    } catch (error: any) {
      setError(true);
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    setError(false);
    // Get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    setToken(urlToken || '');
    // const { query } = router;
    // const urlToken = query.token;
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="flex flex-col border-2 border-green-400 px-8 rounded-xl gap-y-3 items-center justify-center max-h-screen py-3">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 rounded-xl bg-green-500 text-white">
          {token ? `${token}` : 'no token'}
        </h2>
        {verified && (
          <div>
            <h3 className="p-2 rounded-xl bg-green-500 text-white">
              Email verified! &#10003;
            </h3>
            <Link href={'/login'}>Go to log in</Link>
          </div>
        )}
        {verified && (
          <div>
            <h3 className="p-2 rounded-xl bg-green-500 text-white">
              {error} &#10539;
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
