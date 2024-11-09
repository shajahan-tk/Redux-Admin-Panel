import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function AdminHome() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = Cookies.get('loggedInUser');
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  useEffect(() => {
    // Check for admin authentication status
    const isAuthenticated = Cookies.get('isAuthenticated') === 'admin';
    const storedAdmin = Cookies.get('loggedInUser');

    // Redirect to login if not authenticated as admin or no stored admin data
    if (!isAuthenticated || !storedAdmin) {
      navigate('/');
      return;
    }

    // Set admin state from cookies if not already set
    if (!admin) {
      setAdmin(JSON.parse(storedAdmin));
    }

    // Disable back button functionality
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href);
    };
    window.addEventListener('popstate', handlePopState);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [admin, navigate]);

  const handleLogout = () => {
    // Clear authentication data from cookies
    Cookies.remove('isAuthenticated');
    Cookies.remove('loggedInUser');

    // Clear admin state and navigate to login page
    setAdmin(null);
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-red-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Admin Home Page</h1>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li>
                <h2 className="bg-white text-black px-2 py-1 rounded">
                  Admin Name: {admin?.username || 'Guest'}
                </h2>
              </li>
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

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Admin Home Page</h2>
        <p className="text-gray-700">
          Here is where your content will go. Use this space to provide the main content of the page, such as user information, recent activities, or personalized recommendations.
        </p>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center px-4">
          <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
