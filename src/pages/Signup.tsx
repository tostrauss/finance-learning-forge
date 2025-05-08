// C:\Users\Hamid Malakpour\Desktop\Finance2.6\finance-learning-forge\src\pages\Signup.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);

  const { signup } = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(username, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-app-purple text-white py-2 rounded hover:bg-purple-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
