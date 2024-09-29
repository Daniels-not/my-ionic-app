import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../firebase'; // Import Firebase instance
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider, // For Microsoft
  signInWithPopup
} from 'firebase/auth';

// Importing icons from react-icons
import { FcGoogle } from 'react-icons/fc'; // Google Icon
import { FaGithub, FaMicrosoft } from 'react-icons/fa'; // GitHub and Microsoft Icons

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const microsoftProvider = new OAuthProvider('microsoft.com');

  // Email/Password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message); // Handle login errors
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Google login error:', error);
      setError(error.message); // Handle login errors
    }
  };

  // GitHub login
  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('GitHub login error:', error);
      setError(error.message); // Handle login errors
    }
  };

  // Microsoft login
  const handleMicrosoftLogin = async () => {
    try {
      await signInWithPopup(auth, microsoftProvider);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Microsoft login error:', error);
      setError(error.message); // Handle login errors
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">

      <div className="bg-[#95ff8d] w-full h-3/4 skew-y-12 absolute -top-[10rem] left-0 z-0">

      </div>

      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-center my-4">Or sign in with:</p>

        <div className="space-y-2">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center hover:bg-red-600 transition duration-200"
          >
            <FcGoogle className="mr-2" size={24} /> Sign in with Google
          </button>

          <button
            onClick={handleGithubLogin}
            className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-900 transition duration-200"
          >
            <FaGithub className="mr-2" size={24} /> Sign in with GitHub
          </button>

          <button
            onClick={handleMicrosoftLogin}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center hover:bg-blue-700 transition duration-200"
          >
            <FaMicrosoft className="mr-2" size={24} /> Sign in with Microsoft
          </button>
        </div>

        <p className="text-center mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-600 hover:underline font-bold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
