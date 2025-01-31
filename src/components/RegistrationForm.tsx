import React from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export function RegistrationForm() {
  const [step, setStep] = React.useState<'register' | 'verify'>('register');
  const [verificationCode, setVerificationCode] = React.useState(['', '', '', '', '', '']);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      {step === 'register' ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={() => setStep('verify')}
            className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-sm sm:text-base">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            Verify your email
          </h3>
          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
            We've sent a verification code to your email
          </p>
          <div className="flex gap-2 justify-center">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-10 sm:w-12 h-10 sm:h-12 text-center text-lg sm:text-xl border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}