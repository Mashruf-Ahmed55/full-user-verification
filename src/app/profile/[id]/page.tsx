export default function Page({ params }: { params: any }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="mb-3 text-2xl text-green-600 font-bold">Profile page</h1>
      <div className="flex flex-col border-2 border-green-400 px-8 rounded-xl gap-y-3 items-center justify-center max-h-screen py-3">
        <h2 className="text-white px-3 py-2 bg-green-500 rounded-lg">
          {params.id}
        </h2>
      </div>
    </div>
  );
}
