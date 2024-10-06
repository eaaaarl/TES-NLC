// app/dashboard/loading.tsx

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 space-y-4">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      {/* Loading Text */}
      <p className="text-white text-lg">Loading...</p>
    </div>
  );
}
