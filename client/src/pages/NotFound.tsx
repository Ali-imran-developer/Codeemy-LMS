import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link to="/" className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition">
           Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;