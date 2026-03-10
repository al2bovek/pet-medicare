import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <p className="text-gray-600 mb-6 text-2xl">Page not found</p>
      <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>

      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-900"
      >
        Go Home
      </Link>
    </div>
  );
}
