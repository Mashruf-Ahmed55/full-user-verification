import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className=" mb-3 text-2xl text-green-600 font-bold">Hello Boss !</h1>
      <div className="flex flex-col px-8 rounded-xl gap-y-3 items-center justify-center max-h-screen py-3">
        <Link href={"/signup"}>Go to Sign Up</Link>
      </div>
    </div>
  );
}
