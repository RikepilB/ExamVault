import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerInstructor } from '../api/auth';
import { AuthPageLayout } from '../components/AuthPageLayout';

// Validator functions
const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateName = (name: string) => /^[A-Za-z]+$/.test(name);
const validatePassword = (password: string) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).{8,}$/.test(
    password
  );

const hasUppercase = (str: string) => /[A-Z]/.test(str);
const hasLowercase = (str: string) => /[a-z]/.test(str);
const hasNumber = (str: string) => /\d/.test(str);
const hasSpecialChar = (str: string) =>
  /[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]/.test(str);

const isLongEnough = (str: string) => str.length >= 8;

const allPasswordCriteriaMet = (password: string) =>
  isLongEnough(password) &&
  hasUppercase(password) &&
  hasLowercase(password) &&
  hasNumber(password) &&
  hasSpecialChar(password);

interface ExtendedUserModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Signup = () => {
  const [data, setData] = useState<ExtendedUserModel>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
    setError('');
    setSuccess('');

    let errorMsg = '';

    switch (id) {
      case 'firstname':
      case 'lastname':
        if (value && !validateName(value)) {
          errorMsg = 'Must contain only letters with no spaces.';
        }
        break;
      case 'email':
        if (value && !validateEmail(value)) {
          errorMsg = 'Invalid email format.';
        }
        break;
      case 'password':
        if (value && !validatePassword(value)) {
          errorMsg = 'Password must contain the following criteria:';
        }
        break;

      case 'confirmPassword':
        if (value !== data.password) {
          errorMsg = 'Passwords do not match.';
        }
        break;
    }

    setFieldErrors((prev) => ({ ...prev, [id]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { firstname, lastname, email, password, confirmPassword } = data;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      setError('Please fill all fields.');
      setLoading(false);
      return;
    }

    if (!validateName(firstname) || !validateName(lastname)) {
      setError('First and last name must contain only letters.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must include 1 uppercase letter, 1 digit, 1 special character and be at least 8 characters.'
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    // Backend integration
    const response = await registerInstructor({
      email,
      password,
      name: `${firstname.trim()} ${lastname.trim()}`, // ← COMBINE into a single `name` field
    });

    if (response.success) {
      setSuccess(
        'A verification email has been sent to your email address. Please verify your account within 3 days or it will be locked.'
      );
      setData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      // Handle specific error messages
      if (
        response.error.toLowerCase().includes('already exists') ||
        response.error.toLowerCase().includes('already registered')
      ) {
        setError(
          'This email is already registered. Please use a different email or login.'
        );
      } else {
        setError(response.error);
      }
    }

    setLoading(false);

    // Hide the success message after 30 seconds
    if (response.success) {
      setTimeout(() => {
        setSuccess('');
      }, 30000);
    }
  };

  return (
    <AuthPageLayout mode="signup">
        <p className="font-mono-plex text-[10px] uppercase tracking-[0.25em] text-[var(--ink-faint)] mb-2">
          New instructor
        </p>
        <h1 className="font-display text-4xl font-semibold mb-3">
          Create your account<span className="text-[var(--marker)]">.</span>
        </h1>
        <p className="text-[var(--ink-soft)] mb-8">Start with a course and a question bank.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['firstname', 'lastname'].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium mb-1 capitalize"
                >
                  {field === 'firstname' ? 'First Name' : 'Last Name'}
                </label>
                <input
                  type="text"
                  id={field}
                  autoComplete={field === 'firstname' ? 'given-name' : 'family-name'}
                  value={data[field as keyof ExtendedUserModel]}
                  onChange={handleChange}
                  aria-invalid={Boolean(fieldErrors[field])}
                  aria-describedby={fieldErrors[field] ? `${field}-error` : undefined}
                  className={`w-full min-h-11 px-3 py-2 border rounded bg-white text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--marker)] ${
                    fieldErrors[field] ? 'border-[var(--marker)]' : 'border-[rgba(27,36,49,0.45)]'
                  }`}
                  required
                />
                {fieldErrors[field] && (
                  <p id={`${field}-error`} className="mt-1 text-[var(--marker)] text-sm">{fieldErrors[field]}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={data.email}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              className={`w-full min-h-11 px-3 py-2 border rounded bg-white text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--marker)] ${
                fieldErrors.email ? 'border-[var(--marker)]' : 'border-[rgba(27,36,49,0.45)]'
              }`}
              required
            />
              {fieldErrors.email && <p id="email-error" className="mt-1 text-[var(--marker)] text-sm">{fieldErrors.email}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              value={data.password}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'password-error' : undefined}
              className={`w-full min-h-11 px-3 py-2 border rounded bg-white text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--marker)] ${
                fieldErrors.password ? 'border-[var(--marker)]' : 'border-[rgba(27,36,49,0.45)]'
              }`}
              required
            />
            {fieldErrors.password && (
              <p id="password-error" className="text-[var(--marker)] text-sm whitespace-pre-line mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {data.password && !allPasswordCriteriaMet(data.password) && (
            <ul className="text-sm mt-2 space-y-1">
              <li
                className={
                  isLongEnough(data.password)
                    ? 'text-green-600'
                    : 'text-red-500'
                }
              >
                {isLongEnough(data.password) ? '✓' : '✗'} At least 8 characters
                long
              </li>
              <li
                className={
                  hasUppercase(data.password)
                    ? 'text-green-600'
                    : 'text-red-500'
                }
              >
                {hasUppercase(data.password) ? '✓' : '✗'} At least 1 uppercase
                letter (A-Z)
              </li>
              <li
                className={
                  hasLowercase(data.password)
                    ? 'text-green-600'
                    : 'text-red-500'
                }
              >
                {hasLowercase(data.password) ? '✓' : '✗'} At least 1 lowercase
                letter (a-z)
              </li>
              <li
                className={
                  hasNumber(data.password) ? 'text-green-600' : 'text-red-500'
                }
              >
                {hasNumber(data.password) ? '✓' : '✗'} At least 1 number (0-9)
              </li>
              <li
                className={
                  hasSpecialChar(data.password)
                    ? 'text-green-600'
                    : 'text-red-500'
                }
              >
                {hasSpecialChar(data.password) ? '✓' : '✗'} At least 1 special
                character (!@#$...)
              </li>
            </ul>
          )}

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={data.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              aria-describedby={fieldErrors.confirmPassword ? 'confirmPassword-error' : undefined}
              className={`w-full min-h-11 px-3 py-2 border rounded bg-white text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--marker)] ${
                fieldErrors.confirmPassword
                  ? 'border-[var(--marker)]'
                  : 'border-[rgba(27,36,49,0.45)]'
              }`}
              required
            />
            {fieldErrors.confirmPassword && (
              <p id="confirmPassword-error" className="mt-1 text-[var(--marker)] text-sm">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {error && (
            <div role="alert" className="text-[var(--marker)] text-sm border-l-2 border-[var(--marker)] pl-3">
              {error}
            </div>
          )}
          {success && (
            <div role="status" className="text-[var(--correct)] text-sm border-l-2 border-[var(--correct)] pl-3">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-marker w-full min-h-12 justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--marker)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering…' : 'Create account'}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-[var(--ink-soft)]">
          Already have an account?{' '}
          <Link to="/login" className="inline-flex min-h-11 items-center link-underline font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--marker)]">
            Sign in
          </Link>
        </div>
    </AuthPageLayout>
  );
};
