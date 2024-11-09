import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load sample data if not already present in cookies
  useEffect(() => {
    if (!Cookies.get('formData')) {
      const sampleData = [
        { username: 'adminUser', password: 'adminPass', title: 'Add Admin' },
        { username: 'normalUser', password: 'userPass', title: 'Add User' },
      ];
      Cookies.set('formData', JSON.stringify(sampleData), { expires: 7 });
    }
  }, []);

  // Redirect to home page if already logged in
  useEffect(() => {
    const isAuthenticated = Cookies.get('isAuthenticated');
    if (isAuthenticated) {
      const homeRoute = isAuthenticated === 'admin' ? '/adminhome' : '/userhome';
      navigate(homeRoute, { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(Cookies.get('formData') || '[]');
    const user = storedData.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        ((loginType === 'admin' && user.title === 'Add Admin') ||
          (loginType === 'user' && user.title === 'Add User'))
    );

    if (user) {
      setError('');
      Cookies.set('isAuthenticated', loginType, { expires: 7 });
      Cookies.set('loggedInUser', JSON.stringify(user), { expires: 7 });

      const homeRoute = loginType === 'admin' ? '/adminhome' : '/userhome';
      navigate(homeRoute, { state: { user }, replace: true });
    } else {
      setError(`Invalid ${loginType === 'admin' ? 'Admin' : 'User'} username or password`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-600">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="username">
              {loginType === 'admin' ? 'Admin Username' : 'User Username'}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
              autoComplete="username"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="password">
              {loginType === 'admin' ? 'Admin Password' : 'User Password'}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">Login As</label>
              <div className="flex space-x-4">
                <label className="flex items-center text-gray-600">
                  <input
                    type="radio"
                    id="user"
                    name="loginType"
                    value="user"
                    checked={loginType === 'user'}
                    onChange={(e) => setLoginType(e.target.value)}
                    className="text-blue-600 focus:ring-blue-400"
                  />
                  <span className="ml-2">User</span>
                </label>
                <label className="flex items-center text-gray-600">
                  <input
                    type="radio"
                    id="admin"
                    name="loginType"
                    value="admin"
                    checked={loginType === 'admin'}
                    onChange={(e) => setLoginType(e.target.value)}
                    className="text-blue-600 focus:ring-blue-400"
                  />
                  <span className="ml-2">Admin</span>
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
