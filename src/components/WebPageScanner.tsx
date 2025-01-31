import React from 'react';
import { CheckCircle2, Clock, Loader2, ExternalLink } from 'lucide-react';
import type { WebPage } from '../types';

const demoPages: WebPage[] = [
  {
    url: '/about',
    status: 'scraped',
    title: 'About Us',
    data: ['Company history', 'Mission statement', 'Team members']
  },
  {
    url: '/products',
    status: 'in-progress',
    title: 'Our Products',
    data: []
  },
  {
    url: '/contact',
    status: 'pending',
    title: 'Contact Us',
    data: []
  }
];

export function WebPageScanner() {
  const [selectedPage, setSelectedPage] = React.useState<WebPage | null>(null);

  return (
    <div className="w-full max-w-4xl px-4 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {demoPages.map((page) => (
          <div
            key={page.url}
            onClick={() => setSelectedPage(page)}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{page.title}</h3>
              {page.status === 'scraped' && (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              )}
              {page.status === 'in-progress' && (
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin flex-shrink-0" />
              )}
              {page.status === 'pending' && (
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">{page.url}</p>
          </div>
        ))}
      </div>

      {selectedPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                {selectedPage.title}
              </h3>
              <button
                onClick={() => setSelectedPage(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
            
            {selectedPage.status === 'scraped' ? (
              <div className="space-y-3 sm:space-y-4">
                {selectedPage.data.map((chunk, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 text-sm sm:text-base"
                  >
                    {chunk}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  {selectedPage.status === 'in-progress'
                    ? 'Scanning page...'
                    : 'Waiting to scan...'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}