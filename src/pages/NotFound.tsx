
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-health-light">
      <div className="text-center max-w-md px-6">
        <div className="mb-8">
          <div className="inline-block p-6 rounded-full bg-health-soft-purple">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-health-primary"
            >
              <path d="m2 2 20 20"/>
              <path d="M8.5 8.5a4 4 0 1 0 7 7"/>
              <path d="M14 14v7h-4v-1"/>
              <path d="M6 6h.01"/>
              <path d="M22 12c0 5.5-4.5 10-10 10"/>
              <path d="M22 2 2 22"/>
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-health-dark">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! We couldn't find the health data you're looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-health-primary hover:bg-health-secondary text-white rounded-md transition-colors duration-300"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
