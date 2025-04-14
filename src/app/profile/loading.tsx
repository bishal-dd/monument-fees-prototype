export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 to-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-red-800 border-t-transparent"></div>
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    </div>
  );
}
