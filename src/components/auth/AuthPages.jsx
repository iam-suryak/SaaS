import React, { useState } from 'react';
import { Eye, EyeOff, Check, X, ArrowLeft } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

// Import cropped high-res illustrations from user's Figma designs
import signupIllustration from '../../Images/auth/signup-illustration.png';
import loginIllustration from '../../Images/auth/login-illustration.png';
import confirmIllustration from '../../Images/auth/confirm-illustration.png';

// SVG Base Logo matching the design
const BaseLogo = () => (
  <div className="w-14 h-14 rounded-full bg-[#546FFF] flex items-center justify-center shadow-soft mx-auto mb-4">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 14.5L10 10.5L14 13.5L18 8.5"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="14.5" r="2.2" fill="white" />
      <circle cx="10" cy="10.5" r="2.2" fill="white" />
      <circle cx="14" cy="13.5" r="2.2" fill="white" />
      <circle cx="18" cy="8.5" r="2.2" fill="white" />
    </svg>
  </div>
);

// SVG Google Icon
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// SVG Facebook Icon
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" className="shrink-0">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function AuthPages({ initialView = 'login', onClose }) {
  const { setCurrentView, setCurrentUser, setAuthModal } = useDashboard();
  const [view, setView] = useState(initialView); // 'login' | 'signup' | 'recover' | 'confirm'

  // Form states matching screenshots
  const [fullName, setFullName] = useState('Jiangyu');
  const [email, setEmail] = useState('example@gmail.com');
  const [username, setUsername] = useState('johnkevine4362');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = (e) => {
    e?.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      email: email || 'example@gmail.com',
      name: email ? email.split('@')[0] : 'Easin Arafat'
    }));
    if (onClose) onClose();
    setCurrentView('dashboard');
  };

  const handleSignUpSubmit = (e) => {
    e?.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name: fullName || 'Jiangyu',
      email: email || 'example@gmail.com'
    }));
    setView('confirm');
  };

  const handleGoHome = () => {
    if (onClose) onClose();
    setCurrentView('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F5F9] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 shadow-soft transition-all z-50"
          title="Close"
        >
          <X size={20} />
        </button>
      )}

      {/* 1. SIGN UP PAGE (Image 1) */}
      {view === 'signup' && (
        <div className="bg-white rounded-3xl shadow-soft-lg border border-[#F0F2F8] max-w-5xl w-full overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Left Form (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center">
            <BaseLogo />
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] text-center mb-6">
              Sign Up
            </h2>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#F8F9FD] hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
              >
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#F8F9FD] hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
              >
                <FacebookIcon />
                <span>Facebook</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-[#EEF2F9] w-full"></div>
              <span className="bg-white px-3 text-xs text-slate-400 font-medium">
                Or
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-transparent focus:border-[#546FFF] focus:bg-white rounded-xl text-xs sm:text-sm text-slate-800 transition-all outline-none"
                  placeholder="Jiangyu"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-transparent focus:border-[#546FFF] focus:bg-white rounded-xl text-xs sm:text-sm text-slate-800 transition-all outline-none"
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-transparent focus:border-[#546FFF] focus:bg-white rounded-xl text-xs sm:text-sm text-slate-800 transition-all outline-none"
                  placeholder="johnkevine4362"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-[#F8F9FD] border border-transparent focus:border-[#546FFF] focus:bg-white rounded-xl text-xs sm:text-sm text-slate-800 transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                    agreeTerms
                      ? 'bg-[#546FFF] border-[#546FFF] text-white'
                      : 'border-slate-300 hover:border-slate-400 bg-white'
                  }`}
                >
                  {agreeTerms && <Check size={11} strokeWidth={3} />}
                </button>
                <p className="text-[11px] text-slate-500 leading-tight">
                  By creating an account you agree to the{' '}
                  <span className="text-[#546FFF] hover:underline cursor-pointer">
                    terms of use
                  </span>{' '}
                  and our{' '}
                  <span className="text-[#546FFF] hover:underline cursor-pointer">
                    privacy policy
                  </span>
                  .
                </p>
              </div>

              {/* Create account button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#546FFF] hover:bg-[#435EEB] active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-soft transition-all text-center mt-2"
              >
                Create account
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-400">
                  Already have an account?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-xs font-bold text-[#546FFF] hover:underline"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>

          {/* Right Illustration (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAFBFD] p-8 flex items-center justify-center border-l border-[#F0F2F8]">
            <img
              src={signupIllustration}
              alt="Sign Up workspace illustration"
              className="max-h-[520px] w-auto object-contain select-none"
            />
          </div>
        </div>
      )}

      {/* 2. LOGIN PAGE (Image 2) */}
      {view === 'login' && (
        <div className="bg-white rounded-3xl shadow-soft-lg border border-[#F0F2F8] max-w-5xl w-full overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Left Form (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center">
            <BaseLogo />
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] text-center mb-6">
              Log in
            </h2>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#F8F9FD] hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
              >
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#F8F9FD] hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
              >
                <FacebookIcon />
                <span>Facebook</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-[#EEF2F9] w-full"></div>
              <span className="bg-white px-3 text-xs text-slate-400 font-medium">
                Or
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-transparent focus:border-[#546FFF] focus:bg-white rounded-xl text-xs sm:text-sm text-slate-800 transition-all outline-none"
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-[#F8F9FD] border border-transparent focus:border-[#546FFF] focus:bg-white rounded-xl text-xs sm:text-sm text-slate-800 transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Options Row: Remember Me & Reset Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                      rememberMe
                        ? 'bg-[#546FFF] border-[#546FFF] text-white'
                        : 'border-slate-300 hover:border-slate-400 bg-white'
                    }`}
                  >
                    {rememberMe && <Check size={11} strokeWidth={3} />}
                  </button>
                  <span className="text-xs text-slate-600">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setView('recover')}
                  className="text-xs font-semibold text-[#546FFF] hover:underline"
                >
                  Reset Password?
                </button>
              </div>

              {/* Log In Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#546FFF] hover:bg-[#435EEB] active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-soft transition-all text-center mt-2"
              >
                Log in
              </button>

              <div className="text-center pt-3">
                <span className="text-xs text-slate-400">
                  Don't have account yet?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setView('signup')}
                  className="text-xs font-bold text-[#546FFF] hover:underline"
                >
                  New Account
                </button>
              </div>
            </form>
          </div>

          {/* Right Illustration (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAFBFD] p-8 flex items-center justify-center border-l border-[#F0F2F8]">
            <img
              src={loginIllustration}
              alt="Login workspace illustration"
              className="max-h-[500px] w-auto object-contain select-none"
            />
          </div>
        </div>
      )}

      {/* 3. RECOVER PASSWORD PAGE (Image 3) */}
      {view === 'recover' && (
        <div className="bg-white rounded-3xl shadow-soft-lg border border-[#F0F2F8] max-w-md w-full p-8 sm:p-10 text-center animate-fade-in">
          <BaseLogo />
          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
            Recover
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Password reset instructions sent to ${email}`);
              setView('login');
            }}
            className="space-y-5 text-left"
          >
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-transparent focus:border-[#546FFF] focus:bg-white rounded-xl text-xs sm:text-sm text-slate-800 transition-all outline-none"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#546FFF] hover:bg-[#435EEB] active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-soft transition-all text-center"
            >
              Reset Your Password
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setView('login')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                <span>Back to Log in</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. CONFIRMATION PAGE (Image 4) */}
      {view === 'confirm' && (
        <div className="bg-white rounded-3xl shadow-soft-lg border border-[#F0F2F8] max-w-md w-full p-8 sm:p-12 text-center animate-fade-in space-y-6">
          {/* Celebratory Thumbs Up with Confetti */}
          <div className="flex justify-center">
            <img
              src={confirmIllustration}
              alt="Account Created Successfully"
              className="w-36 h-36 object-contain select-none"
            />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
            Your account successfully created.
          </h2>

          <button
            onClick={handleGoHome}
            className="py-3 px-8 rounded-2xl bg-[#546FFF] hover:bg-[#435EEB] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-soft transition-all"
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
}
