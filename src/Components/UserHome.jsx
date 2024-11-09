import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function UserHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = Cookies.get('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Check if user is authenticated and has the 'user' role
    const isAuthenticated = Cookies.get('isAuthenticated');
    const storedUser = Cookies.get('loggedInUser');

    if (isAuthenticated === 'user' && storedUser) {
      // If user is not in state, set it
      if (!user) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      // If not authenticated as 'user' or no stored user data, redirect to login page
      navigate('/');
    }

    // Disable back button functionality
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href);
    };
    window.addEventListener('popstate', handlePopState);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [user, navigate]);

  const handleLogout = () => {
    // Clear authentication data from cookies
    Cookies.remove('isAuthenticated');
    Cookies.remove('loggedInUser');

    // Clear user state
    setUser(null);

    // Navigate to login page
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">User Home Page</h1>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li>
                <h2 className="bg-green-600 px-2 py-1 rounded">
                  User Name: {user?.username || 'Guest'}
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
        <h2 className="text-3xl font-semibold mb-4">Welcome to the User Home Page</h2>
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
