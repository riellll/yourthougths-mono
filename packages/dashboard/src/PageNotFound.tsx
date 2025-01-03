import React from "react";
import { Link } from "react-router-dom";
import notFound from "./assets/404_z4xiwg.webp";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white">
        <img src={notFound} alt="404" className="w-96" />
      {/* <h1 className="text-8xl font-bold text-red-500">404</h1> */}
      <p className="text-6xl font-bold text-white mt-4">Oops! Page not found.</p>
      <p className="text-gray-300 mt-2">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
