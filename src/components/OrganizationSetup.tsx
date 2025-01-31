import React from 'react';
import { Building2, Globe, FileText } from 'lucide-react';

export function OrganizationSetup() {
  const [website, setWebsite] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchMetaDescription = async (url: string) => {
    try {
      setIsLoading(true);
      // Add https:// if not present
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(fullUrl)}`);
      const data = await response.json();
      
      if (data.data?.description) {
        setDescription(data.data.description);
      }
    } catch (error) {
      console.error('Error fetching meta description:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 px-4 sm:px-0">
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Company Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base"
              placeholder="BeyondChats Inc."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Website URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
                if (e.target.value.includes('.')) {
                  fetchMetaDescription(e.target.value);
                }
              }}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Description
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base"
              rows={4}
              placeholder="Tell us about your company..."
            />
            {isLoading && (
              <div className="absolute right-3 top-3">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}