import { useEffect, useState } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "IMS - 404";
  }, []);


  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
