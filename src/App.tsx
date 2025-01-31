import React from 'react';
import { Bot } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { RegistrationForm } from './components/RegistrationForm';
import { OrganizationSetup } from './components/OrganizationSetup';
import { WebPageScanner } from './components/WebPageScanner';
import { ChatbotIntegration } from './components/ChatbotIntegration';

function App() {
  const [step, setStep] = React.useState<
    'register' | 'organization' | 'scanning' | 'integration'
  >('register');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg transform hover:scale-110 transition-transform duration-200">
            <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-2">
            BeyondChats
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center max-w-md">
            Set up your intelligent chatbot in minutes
          </p>
        </div>

        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-md">
            {(['register', 'organization', 'scanning', 'integration'] as const).map(
              (s, index) => (
                <div key={s} className="flex flex-col items-center relative">
                  {index > 0 && (
                    <div className="absolute top-4 -left-1/2 w-full h-0.5 bg-gray-300 dark:bg-gray-700" />
                  )}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                      step === s
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-[10px] sm:text-xs mt-1 text-gray-600 dark:text-gray-400 text-center">
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md sm:max-w-2xl md:max-w-4xl">
            {step === 'register' && <RegistrationForm />}
            {step === 'organization' && <OrganizationSetup />}
            {step === 'scanning' && <WebPageScanner />}
            {step === 'integration' && <ChatbotIntegration />}
          </div>
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="flex gap-3 sm:gap-4">
            {step !== 'register' && (
              <button
                onClick={() =>
                  setStep((s) => {
                    switch (s) {
                      case 'organization':
                        return 'register';
                      case 'scanning':
                        return 'organization';
                      case 'integration':
                        return 'scanning';
                      default:
                        return s;
                    }
                  })
                }
                className="px-4 sm:px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm sm:text-base"
              >
                Back
              </button>
            )}
            {step !== 'integration' && (
              <button
                onClick={() =>
                  setStep((s) => {
                    switch (s) {
                      case 'register':
                        return 'organization';
                      case 'organization':
                        return 'scanning';
                      case 'scanning':
                        return 'integration';
                      default:
                        return s;
                    }
                  })
                }
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;