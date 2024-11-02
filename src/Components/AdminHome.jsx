import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const location = useLocation();
  const user = location.state?.user; // Access the user from the location state
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-red-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Admin Home Page</h1>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              {/* Display the logged-in admin's name */}
              <li><h2 className="bg-white text-black px-2 py-1 rounded">Admin Name: {user?.username || 'Guest'}</h2></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Admin Home Page</h2>
        <p className="text-gray-700">
          Here is where your content will go. Use this space to provide the main content of the page, such as user information, recent activities, or personalized recommendations.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center px-4">
          <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
