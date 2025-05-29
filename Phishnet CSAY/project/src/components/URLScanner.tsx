import React, { useState, useEffect } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, History, Trash2 } from 'lucide-react';
import { mockScanResults } from '../mockData';
import { RiskLevel, ScanResult, ScanHistory } from '../types';

const riskLevelStyles: Record<RiskLevel, { bg: string; text: string; icon: React.ReactNode; border: string }> = {
  safe: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-800 dark:text-green-300',
    border: 'border-green-200 dark:border-green-800',
    icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
  },
  suspicious: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-800 dark:text-yellow-300',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
  },
  dangerous: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-800 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    icon: <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
  }
};

export function URLScanner() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ScanHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('scanHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (scanResult: ScanResult) => {
    const historyEntry: ScanHistory = {
      ...scanResult,
      id: crypto.randomUUID()
    };
    const updatedHistory = [historyEntry, ...history].slice(0, 10); // Keep last 10 scans
    setHistory(updatedHistory);
    localStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('scanHistory');
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const exactMatch = mockScanResults[url];
    if (exactMatch) {
      setResult(exactMatch);
      saveToHistory(exactMatch);
      setLoading(false);
      return;
    }

    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();

    const isSuspicious = 
      domain.includes('secure') ||
      domain.includes('login') ||
      domain.includes('account') ||
      domain.includes('verify') ||
      domain.includes('-') ||
      domain.endsWith('.xyz') ||
      domain.endsWith('.net');

    const isDangerous =
      domain.includes('0') ||
      domain.includes('1') ||
      domain.includes('security') ||
      domain.includes('bank') ||
      /[0-9]/.test(domain);

    const result: ScanResult = {
      url,
      riskLevel: isDangerous ? 'dangerous' : isSuspicious ? 'suspicious' : 'safe',
      threats: [],
      timestamp: new Date().toISOString(),
      recommendations: []
    };

    if (isDangerous) {
      result.threats = [
        'Suspicious character substitution detected',
        'Domain contains security-sensitive keywords',
        'Potential phishing attempt'
      ];
      result.recommendations = [
        'Do not enter any personal information',
        'Avoid accessing this website',
        'Report to relevant authorities'
      ];
    } else if (isSuspicious) {
      result.threats = [
        'Domain contains suspicious keywords',
        'Unusual domain pattern detected',
        'Limited domain history available'
      ];
      result.recommendations = [
        'Proceed with extreme caution',
        'Verify the website\'s legitimacy',
        'Do not enter sensitive information'
      ];
    } else {
      result.recommendations = [
        'Website appears legitimate',
        'Always verify SSL certificates',
        'Monitor for unusual activity'
      ];
    }

    setResult(result);
    saveToHistory(result);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">URL Security Scanner</h2>
          <p className="text-slate-600 dark:text-slate-400">Check any URL for potential phishing threats</p>
        </div>
      </div>

      <form onSubmit={handleScan} className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to scan (e.g., https://example.com)"
              className="block w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-center"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Scan URL
              </>
            )}
          </button>
        </div>
      </form>

      {result && (
        <div className="space-y-6 animate-fade-in">
          <div className={`p-6 rounded-xl border ${riskLevelStyles[result.riskLevel].bg} ${riskLevelStyles[result.riskLevel].border}`}>
            <div className="flex items-center gap-3 mb-3">
              {riskLevelStyles[result.riskLevel].icon}
              <h3 className={`font-semibold capitalize text-lg ${riskLevelStyles[result.riskLevel].text}`}>
                {result.riskLevel} URL Detected
              </h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-mono text-sm break-all">{result.url}</p>
          </div>

          {result.threats.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Detected Threats
              </h4>
              <ul className="space-y-2">
                {result.threats.map((threat, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    {threat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Recommendations
            </h4>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <History className="w-5 h-5" />
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Clear History
            </button>
          )}
        </div>

        {showHistory && history.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            {history.map((scan) => (
              <div
                key={scan.id}
                className={`p-4 rounded-lg border ${riskLevelStyles[scan.riskLevel].bg} ${riskLevelStyles[scan.riskLevel].border}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {riskLevelStyles[scan.riskLevel].icon}
                  <span className={`font-medium capitalize ${riskLevelStyles[scan.riskLevel].text}`}>
                    {scan.riskLevel}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-mono text-sm break-all">{scan.url}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                  Scanned on {new Date(scan.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}