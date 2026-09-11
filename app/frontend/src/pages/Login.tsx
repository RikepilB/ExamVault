// src/pages/Login.tsx
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setError(null);
  }, [email, password]);

  /* redirect only when auth is settled */
  if (!isLoading && isAuthenticated && !error) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const result = await login(normalizedEmail, password);

    if (result.success) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      // Leave the message until the user types or resubmits
      setError(result.error || 'Invalid credentials');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 paper grain relative flex items-center justify-center p-4 text-[var(--ink)]">
      <div className="w-full max-w-md sheet rounded-lg p-8 relative">
        {/* red margin rule, like the paper theme */}
        <span
          className="absolute left-5 top-6 bottom-6 w-px bg-[rgba(193,18,31,0.25)]"
          aria-hidden="true"
        />
        <p className="font-mono-plex text-[10px] uppercase tracking-[0.25em] text-[var(--ink-faint)] mb-2">
          Instructor sign-in
        </p>
        <h1 className="font-display text-3xl font-semibold mb-6">
          Welcome back<span className="text-[var(--marker)]">.</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block font-mono-plex text-xs uppercase tracking-wider text-[var(--ink-soft)] mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[rgba(27,36,49,0.35)] rounded bg-white/70 text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--marker)]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-mono-plex text-xs uppercase tracking-wider text-[var(--ink-soft)] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-[rgba(27,36,49,0.35)] rounded bg-white/70 text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--marker)]"
              required
            />
            <div className="mt-1 text-xs text-[var(--ink-soft)] text-right">
              <span
                onClick={() => navigate('/forgot-password')}
                className="cursor-pointer link-underline"
              >
                Forgot your password?
              </span>
            </div>
          </div>

          {error && (
            <p className="text-[var(--marker)] text-sm border-l-2 border-[var(--marker)] pl-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-marker w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-[var(--ink-soft)]">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="link-underline font-semibold ml-1"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
