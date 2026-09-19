// src/pages/Login.tsx
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthPageLayout } from '../components/AuthPageLayout';

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
    <AuthPageLayout mode="login">
        <p className="font-mono-plex text-[10px] uppercase tracking-[0.25em] text-[var(--ink-faint)] mb-2">
          Instructor sign-in
        </p>
        <h1 className="font-display text-4xl font-semibold mb-3">
          Welcome back<span className="text-[var(--marker)]">.</span>
        </h1>
        <p className="text-[var(--ink-soft)] mb-8">Sign in to continue working on your exams.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block font-mono-plex text-xs uppercase tracking-wider text-[var(--ink-soft)] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-11 px-3 py-2 border border-[rgba(27,36,49,0.45)] rounded bg-white text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--marker)]"
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full min-h-11 px-3 py-2 border border-[rgba(27,36,49,0.45)] rounded bg-white text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--marker)]"
              required
            />
            <div className="mt-1 text-xs text-[var(--ink-soft)] text-right">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="min-h-11 link-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--marker)]"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-[var(--marker)] text-sm border-l-2 border-[var(--marker)] pl-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-marker w-full min-h-12 justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--marker)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-[var(--ink-soft)]">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="min-h-11 link-underline font-semibold ml-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--marker)]"
          >
            Sign up
          </button>
        </div>
    </AuthPageLayout>
  );
};
