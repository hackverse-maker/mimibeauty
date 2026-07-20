import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export function AuthDialog() {
  const {
    user,
    isOpen,
    setIsOpen,
    mode,
    setMode,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Pre-fill profile fields when entering profile mode
  useEffect(() => {
    if (mode === 'profile' && user) {
      setName(user.name ?? '');
      setBio(user.bio ?? '');
    }
  }, [mode, user]);

  // Reset fields when dialog opens/closes or mode changes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setBio('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) handleClose();
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = await signup(name, email, password);
      if (ok) handleClose();
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = await forgotPassword(email);
      if (ok) handleClose();
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = await resetPassword(password);
      if (ok) handleClose();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = await updateProfile(name, bio);
      if (ok) handleClose();
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-full border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-gold';

  const labelClass =
    'block text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-2';

  const submitClass =
    'w-full rounded-full bg-foreground py-4 text-sm text-background transition hover:bg-gold disabled:opacity-50';

  const renderPasswordInput = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void,
    visible: boolean,
    toggleVisible: () => void,
  ) => (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className={inputClass}
          placeholder="••••••••"
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={toggleVisible}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );

  const renderTitle = (eyebrow: string, title: string) => (
    <div className="mb-8 text-center">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl">{title}</h2>
    </div>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-5">
      {renderTitle('Welcome Back', 'Sign In')}

      <div>
        <label htmlFor="login-email" className={labelClass}>
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
          placeholder="your@email.com"
        />
      </div>

      {renderPasswordInput(
        'login-password',
        'Password',
        password,
        setPassword,
        showPassword,
        () => setShowPassword((p) => !p),
      )}

      <button
        type="submit"
        disabled={loading}
        aria-label="Sign in"
        className={submitClass}
      >
        {loading ? 'Loading...' : 'Sign In'}
      </button>

      <div className="space-y-2 pt-2 text-center text-sm text-muted-foreground">
        <p>
          <button
            type="button"
            aria-label="Go to forgot password"
            onClick={() => setMode('forgot')}
            className="text-gold transition hover:underline"
          >
            Forgot password?
          </button>
        </p>
        <p>
          Don&apos;t have an account?{' '}
          <button
            type="button"
            aria-label="Go to sign up"
            onClick={() => setMode('signup')}
            className="text-gold transition hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSignup} className="space-y-5">
      {renderTitle('Join Us', 'Create Account')}

      <div>
        <label htmlFor="signup-name" className={labelClass}>
          Full Name
        </label>
        <input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="signup-email" className={labelClass}>
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
          placeholder="your@email.com"
        />
      </div>

      {renderPasswordInput(
        'signup-password',
        'Password',
        password,
        setPassword,
        showPassword,
        () => setShowPassword((p) => !p),
      )}

      <button
        type="submit"
        disabled={loading}
        aria-label="Create account"
        className={submitClass}
      >
        {loading ? 'Loading...' : 'Create Account'}
      </button>

      <p className="pt-2 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button
          type="button"
          aria-label="Go to sign in"
          onClick={() => setMode('login')}
          className="text-gold transition hover:underline"
        >
          Sign In
        </button>
      </p>
    </form>
  );

  const renderForgotForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-5">
      {renderTitle('Reset', 'Forgot Password')}

      <p className="text-center text-sm text-muted-foreground -mt-4 mb-2">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <div>
        <label htmlFor="forgot-email" className={labelClass}>
          Email
        </label>
        <input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
          placeholder="your@email.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-label="Send reset link"
        className={submitClass}
      >
        {loading ? 'Loading...' : 'Send Reset Link'}
      </button>

      <p className="pt-2 text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <button
          type="button"
          aria-label="Go to sign in"
          onClick={() => setMode('login')}
          className="text-gold transition hover:underline"
        >
          Sign In
        </button>
      </p>
    </form>
  );

  const renderResetForm = () => (
    <form onSubmit={handleResetPassword} className="space-y-5">
      {renderTitle('New Password', 'Reset Password')}

      {renderPasswordInput(
        'reset-password',
        'New Password',
        password,
        setPassword,
        showPassword,
        () => setShowPassword((p) => !p),
      )}

      {renderPasswordInput(
        'reset-confirm-password',
        'Confirm Password',
        confirmPassword,
        setConfirmPassword,
        showConfirmPassword,
        () => setShowConfirmPassword((p) => !p),
      )}

      <button
        type="submit"
        disabled={loading || password !== confirmPassword}
        aria-label="Reset password"
        className={submitClass}
      >
        {loading ? 'Loading...' : 'Reset Password'}
      </button>

      <p className="pt-2 text-center text-sm text-muted-foreground">
        <button
          type="button"
          aria-label="Go to sign in"
          onClick={() => setMode('login')}
          className="text-gold transition hover:underline"
        >
          Back to Sign In
        </button>
      </p>
    </form>
  );

  const renderProfileForm = () => (
    <form onSubmit={handleUpdateProfile} className="space-y-5">
      {renderTitle('Your Account', 'Edit Profile')}

      <div>
        <label htmlFor="profile-name" className={labelClass}>
          Full Name
        </label>
        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="profile-bio" className={labelClass}>
          Bio
        </label>
        <textarea
          id="profile-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-gold resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-label="Save profile"
        className={submitClass}
      >
        {loading ? 'Loading...' : 'Save Changes'}
      </button>

      <button
        type="button"
        aria-label="Sign out"
        onClick={() => {
          logout();
          handleClose();
        }}
        className="w-full rounded-full border border-border py-4 text-sm text-muted-foreground transition hover:border-gold hover:text-gold"
      >
        Sign Out
      </button>
    </form>
  );

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return renderLoginForm();
      case 'signup':
        return renderSignupForm();
      case 'forgot':
        return renderForgotForm();
      case 'reset':
        return renderResetForm();
      case 'profile':
        return renderProfileForm();
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="auth-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-foreground/40 backdrop-blur-sm"
            onClick={handleClose}
            aria-label="Close dialog"
          />

          {/* Content wrapper */}
          <motion.div
            key="auth-content"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[81] flex items-center justify-center"
            onClick={handleClose}
          >
            <div
              className="relative max-w-md w-full mx-auto rounded-3xl border border-border bg-background p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                aria-label="Close"
                onClick={handleClose}
                className="absolute right-4 top-4 text-muted-foreground transition hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              {renderForm()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
