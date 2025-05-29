import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (isRegistering) {
      // Register new user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: fullName,
        });
      }

      alert('Registration successful! Please check your email for verification.');
    } else {
      // Login user
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        return;
      }
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: window.location.origin + '/reset-password',
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage('Password reset email sent! Check your inbox.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-slate-800 dark:text-white">
        {isResettingPassword
          ? 'Reset Password'
          : isRegistering
          ? 'Register'
          : 'Login'} to PhishNet
      </h2>

      {isResettingPassword ? (
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Send Reset Link
          </button>
          <button
            type="button"
            onClick={() => {
              setIsResettingPassword(false);
              setError(null);
              setMessage(null);
            }}
            className="w-full text-sm mt-2 text-blue-600 dark:text-blue-400 underline"
          >
            Back to Login
          </button>
        </form>
      ) : (
        <>
          <form onSubmit={handleAuth} className="space-y-4">
            {isRegistering && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          {!isRegistering && (
            <div className="mt-2 text-center text-sm">
              <button
                onClick={() => {
                  setIsResettingPassword(true);
                  setError(null);
                  setMessage(null);
                }}
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError(null);
                setMessage(null);
              }}
              className="text-blue-600 dark:text-blue-400 font-semibold underline"
            >
              {isRegistering ? 'Login here' : 'Register here'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthPage;
