import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import app from '../firebase';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaGoogle, FaGithub, FaMicrosoft } from 'react-icons/fa'; 

const SignupComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const microsoftProvider = new OAuthProvider('microsoft.com');

  // Email/Password signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user); 
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
    }
  };

  // Google signup
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google signup error:', error);
      setError(error.message);
    }
  };

  // GitHub signup
  const handleGithubSignup = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error('GitHub signup error:', error);
      setError(error.message);
    }
  };

  // Microsoft signup
  const handleMicrosoftSignup = async () => {
    try {
      await signInWithPopup(auth, microsoftProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Microsoft signup error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSignup} className="space-y-4">
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

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center my-4">Or sign up with:</p>

        <div className="space-y-2">
          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            <FaGoogle className="mr-2" /> Sign up with Google
          </button>

          <button
            onClick={handleGithubSignup}
            className="flex items-center justify-center w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-900 transition duration-200"
          >
            <FaGithub className="mr-2" /> Sign up with GitHub
          </button>

          <button
            onClick={handleMicrosoftSignup}
            className="flex items-center justify-center w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            <FaMicrosoft className="mr-2" /> Sign up with Microsoft
          </button>
        </div>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupComponent;
