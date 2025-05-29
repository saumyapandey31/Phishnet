import React from 'react';
import { Shield, AlertTriangle, Clock, ExternalLink } from 'lucide-react';
import { recentThreats } from '../mockData';

export function ThreatDashboard() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500 rounded-xl">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Threat Dashboard</h2>
          <p className="text-gray-500">Monitor active phishing threats and alerts</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="divide-y divide-gray-100">
          {recentThreats.map((threat, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">{threat.domain}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{threat.type}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(threat.detectedAt).toLocaleString()}</span>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                    threat.status === 'Active'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    threat.status === 'Active' ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                  {threat.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <h3 className="font-semibold text-lg text-blue-900">Stay Protected</h3>
        </div>
        <p className="text-blue-800">
          Keep your system updated and always verify website authenticity before entering sensitive information.
          Our threat detection system continuously monitors for new phishing attempts.
        </p>
      </div>
    </div>
  );
}