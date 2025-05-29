import React from 'react';
import { phishingGuides } from '../mockData';

export function SecurityGuide() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Phishing Prevention Guide</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn how to protect yourself from phishing attacks with our comprehensive guide.
          Understanding these concepts is crucial for maintaining your online security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {phishingGuides.map((guide, index) => {
          const Icon = guide.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{guide.title}</h3>
              </div>
              <ul className="space-y-3">
                {guide.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 text-center">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">Stay Informed, Stay Secure</h3>
        <p className="text-blue-800">
          Phishing attacks are constantly evolving. Keep yourself updated with the latest security practices
          and always maintain a cautious approach while browsing online.
        </p>
      </div>
    </div>
  );
}