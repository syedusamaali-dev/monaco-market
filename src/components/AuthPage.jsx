import { useState } from 'react';

export function AuthPage({ onNavigate, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'otp'
  const [authMethod, setAuthMethod] = useState('email'); // 'email' | 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    identifier: '',
    password: '',
    rememberMe: false,
    agreeTerms: false,
  });

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (authMethod === 'phone' && mode !== 'otp') {
      setTimeout(() => {
        setIsSubmitting(false);
        setMode('otp');
      }, 1000);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      const user = {
        name: formData.fullName || (authMethod === 'email' ? formData.identifier.split('@')[0] : 'User'),
        identifier: formData.identifier,
      };
      if (onLoginSuccess) onLoginSuccess(user);
      onNavigate('dashboard');
    }, 1200);
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess({ name: 'Google User', identifier: 'user@gmail.com' });
      }
      onNavigate('dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#191919] text-[#ffffff] flex flex-col justify-between selection:bg-[#f05a67] selection:text-white">
      {/* Top Header */}
      <header className="bg-[#191919]/90 backdrop-blur-md border-b border-[#2f2f2f] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-xs font-semibold text-[#999999] hover:text-[#f05a67] transition-colors cursor-pointer"
          >
            ← Return to Store
          </button>

          <div className="text-xs font-medium text-[#999999]">
            {mode === 'login' ? (
              <span>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-[#f05a67] hover:underline font-bold cursor-pointer ml-1"
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#f05a67] hover:underline font-bold cursor-pointer ml-1"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md w-full mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        <div className="bg-[#222222] border border-[#2f2f2f] rounded-3xl p-8 shadow-2xl space-y-6">
          
          {/* Header Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {mode === 'login' && (
                <span>
                  Welcome <span className="text-[#f05a67]">Back</span>
                </span>
              )}
              {mode === 'register' && (
                <span>
                  Create <span className="text-[#f05a67]">Account</span>
                </span>
              )}
              {mode === 'otp' && (
                <span>
                  Verify <span className="text-[#f05a67]">Phone</span>
                </span>
              )}
            </h1>
            <p className="text-xs text-[#999999]">
              {mode === 'login' && 'Sign in to access your dashboard and active orders'}
              {mode === 'register' && 'Join for an exclusive shopping experience'}
              {mode === 'otp' && `Enter the 6-digit code sent to ${formData.identifier}`}
            </p>
          </div>

          {/* Email vs Phone Tab Selector */}
          {mode !== 'otp' && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#191919] rounded-xl border border-[#2f2f2f] text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMethod === 'email'
                    ? 'bg-[#f05a67] text-white shadow-md'
                    : 'text-[#999999] hover:text-white'
                }`}
              >
                📧 Email
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMethod === 'phone'
                    ? 'bg-[#f05a67] text-white shadow-md'
                    : 'text-[#999999] hover:text-white'
                }`}
              >
                📱 Mobile Phone
              </button>
            </div>
          )}

          {/* Form Content */}
          {mode === 'otp' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-bold bg-[#191919] border border-[#2f2f2f] rounded-xl outline-none focus:border-[#f05a67] text-white"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.join('').length < 6}
                className="w-full py-3.5 rounded-xl bg-[#f05a67] hover:bg-[#d94754] text-white text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-[#f05a67]/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Verifying Code...' : 'Verify & Continue'}
              </button>

              <div className="text-center text-xs text-[#999999]">
                Didn't receive a code?{' '}
                <button
                  type="button"
                  onClick={() => setOtp(['', '', '', '', '', ''])}
                  className="text-[#f05a67] font-bold hover:underline cursor-pointer"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs text-[#999999] font-bold mb-1.5">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Alex Morgan"
                    className="w-full bg-[#191919] border border-[#2f2f2f] rounded-xl p-3 outline-none focus:border-[#f05a67] transition-colors text-xs text-white placeholder-[#666666]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs text-[#999999] font-bold mb-1.5">
                  {authMethod === 'email' ? 'Email Address' : 'Phone Number'}
                </label>
                <input
                  required
                  type={authMethod === 'email' ? 'email' : 'tel'}
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder={
                    authMethod === 'email' ? 'alex@example.com' : '+1 (555) 000-0000'
                  }
                  className="w-full bg-[#191919] border border-[#2f2f2f] rounded-xl p-3 outline-none focus:border-[#f05a67] transition-colors text-xs text-white placeholder-[#666666]"
                />
              </div>

              {authMethod === 'email' && (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs text-[#999999] font-bold">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        className="text-[10px] text-[#f05a67] hover:underline cursor-pointer font-semibold"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-[#191919] border border-[#2f2f2f] rounded-xl p-3 pr-10 outline-none focus:border-[#f05a67] transition-colors text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[#666666] hover:text-[#999999] text-xs cursor-pointer"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              )}

              {/* Controls */}
              {mode === 'login' ? (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded bg-[#191919] border-[#2f2f2f] text-[#f05a67] focus:ring-[#f05a67]"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-[#999999] cursor-pointer">
                    Keep me signed in
                  </label>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    required
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="rounded bg-[#191919] border-[#2f2f2f] text-[#f05a67] focus:ring-[#f05a67]"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-[#999999] cursor-pointer">
                    I agree to the <span className="text-[#f05a67] underline">Terms</span> and <span className="text-[#f05a67] underline">Privacy Policy</span>
                  </label>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 mt-2 rounded-xl bg-[#f05a67] hover:bg-[#d94754] text-white text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-[#f05a67]/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : mode === 'login' ? (
                  authMethod === 'phone' ? 'Send OTP Code 📱' : 'Sign In 🚀'
                ) : (
                  authMethod === 'phone' ? 'Send OTP Code 📱' : 'Create Account ✨'
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2f2f2f]"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-[#666666]">
                  <span className="bg-[#222222] px-2">Or Continue With</span>
                </div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#191919] border border-[#2f2f2f] hover:border-[#444444] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.4-.7-.6-1.5-.6-2.3z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                Sign in with Google
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-[#2f2f2f] py-4 px-6 text-center text-[10px] text-[#666666]">
        © Storefront Inc. All rights reserved.
      </footer>
    </div>
  );
}