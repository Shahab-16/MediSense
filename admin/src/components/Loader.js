
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
        <p className="mt-4 text-blue-600 font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;