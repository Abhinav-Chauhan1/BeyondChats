import React from 'react';
import { MessageSquare, Code, Mail, Share2, ExternalLink, Rocket, MessageCircle, Facebook, Twitter, Linkedin, AlertCircle, Copy, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ChatbotIntegration() {
  const [step, setStep] = React.useState<'options' | 'integration' | 'success' | 'error'>('options');
  const [showEmailForm, setShowEmailForm] = React.useState(false);
  const [developerEmail, setDeveloperEmail] = React.useState('');
  const [showFeedbackBar, setShowFeedbackBar] = React.useState(true);

  const embedCode = `<!-- BeyondChats Integration -->
<script src="https://beyondchats.com/widget.js"></script>
<script>
  window.BeyondChats.init({
    apiKey: 'your-api-key',
    theme: 'light'
  });
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
  };

  const handleSendToDeveloper = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating email send
    setShowEmailForm(false);
    setStep('success');
  };

  const handleTestIntegration = () => {
    // Simulating integration test
    setStep('success');
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3B82F6', '#8B5CF6']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3B82F6', '#8B5CF6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl px-4 sm:px-6">
        {showFeedbackBar && (
          <div className="fixed top-0 left-0 right-0 bg-blue-50 dark:bg-blue-900/20 p-3 flex items-center justify-center text-sm">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-800 dark:text-blue-200">Chatbot not working as intended? </span>
            <button 
              onClick={() => window.open('/feedback', '_blank')}
              className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Share feedback
            </button>
            <button 
              onClick={() => setShowFeedbackBar(false)}
              className="ml-auto text-blue-600 dark:text-blue-400 hover:opacity-75"
            >
              ×
            </button>
          </div>
        )}

        {step === 'options' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <button
              onClick={() => window.open('/demo', '_blank')}
              className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex items-center sm:block">
                <MessageSquare className="w-8 h-8 text-blue-500 mb-0 sm:mb-4 mr-4 sm:mr-0 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 sm:mb-2">Test Chatbot</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Preview the chatbot on your website
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setStep('integration')}
              className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex items-center sm:block">
                <Code className="w-8 h-8 text-purple-500 mb-0 sm:mb-4 mr-4 sm:mr-0 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 sm:mb-2">
                    Integrate on your website
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get the integration code
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {step === 'integration' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Integration Options
            </h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Option 1: Add to your website
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Copy and paste this code into the <code className="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded">&lt;head&gt;</code> of your website
                </p>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {embedCode}
                  </pre>
                  <button
                    onClick={handleCopyCode}
                    className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Option 2: Send to developer
                </h4>
                {!showEmailForm ? (
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    Send instructions to developer
                  </button>
                ) : (
                  <form onSubmit={handleSendToDeveloper} className="space-y-3">
                    <input
                      type="email"
                      value={developerEmail}
                      onChange={(e) => setDeveloperEmail(e.target.value)}
                      placeholder="developer@company.com"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      required
                    />
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Send className="w-4 h-4" />
                      Send Instructions
                    </button>
                  </form>
                )}
              </div>

              <button
                onClick={handleTestIntegration}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Test Integration
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-6 sm:space-y-8 py-4 sm:py-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-blue-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto flex items-center justify-center animate-bounce">
                <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>

            <div className="px-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Integration Successful! 🎉
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Your chatbot is now ready to assist your website visitors
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 max-w-xl mx-auto px-4">
              <button
                onClick={() => window.open('/admin', '_blank')}
                className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 group text-sm sm:text-base"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                <span>Explore Admin Panel</span>
              </button>
              <button
                onClick={() => window.open('/chat', '_blank')}
                className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 group text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                <span>Start Talking to Chatbot</span>
              </button>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 px-4">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                Share your new chatbot with the world
              </p>
              <div className="flex justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => window.open('https://facebook.com/share', '_blank')}
                  className="p-2 text-blue-600 hover:text-blue-700 hover:scale-110 transition-all duration-200 active:scale-95"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => window.open('https://twitter.com/share', '_blank')}
                  className="p-2 text-blue-400 hover:text-blue-500 hover:scale-110 transition-all duration-200 active:scale-95"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => window.open('https://linkedin.com/share', '_blank')}
                  className="p-2 text-blue-700 hover:text-blue-800 hover:scale-110 transition-all duration-200 active:scale-95"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center space-y-4 sm:space-y-6 px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
            </div>

            <h3 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">
              Integration Not Detected
            </h3>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We couldn't detect the chatbot on your website. Please make sure you've added the
              integration code correctly.
            </p>

            <button
              onClick={() => setStep('integration')}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors duration-200 active:scale-95"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}