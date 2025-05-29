import React, { useEffect, useState, Fragment } from 'react';
import {
  Shield,
  Brain,
  AlertTriangle,
  BookOpen,
  ShieldCheck,
  Zap,
  Search,
  LogOut,
} from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { ThemeProvider } from 'next-themes';
import { URLScanner } from './components/URLScanner';
import { SecurityQuiz } from './components/SecurityQuiz';
import { ThreatDashboard } from './components/ThreatDashboard';
import { SecurityGuide } from './components/SecurityGuide';
import { ThemeToggle } from './components/ThemeToggle';
import ReportPhishing from './components/ReportPhishing';
import TrackReport from './components/TrackReport';
import AuthPage from './components/AuthPage';
import { supabase } from './supabaseClient';
import MyReports from './components/MyReports';

type TabType = 'scanner' | 'quiz' | 'threats' | 'guide' | 'report' | 'track' | 'myreports';

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>('scanner');
  const [session, setSession] = useState<any>(null);
  const [showAuth, setShowAuth] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'scanner', label: 'URL Scanner', icon: Shield },
    { id: 'quiz', label: 'Security Quiz', icon: Brain },
    { id: 'threats', label: 'Threat Dashboard', icon: AlertTriangle },
    { id: 'guide', label: 'Security Guide', icon: BookOpen },
    { id: 'report', label: 'Report Phishing', icon: Zap },
    { id: 'track', label: 'Track Report', icon: Search },
    { id: 'myreports', label: 'My Reports', icon: ShieldCheck },
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 relative">

        {/* Header */}
        <header className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center gap-4 animate-fade-in">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-shift"></div>
                  <div className="relative flex items-center gap-2 bg-white dark:bg-black rounded-lg p-2 transition-colors duration-300">
                    <div className="relative">
                      <ShieldCheck className="w-8 h-8 text-blue-500" />
                      <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient-shift">
                    PhishNet
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    Advanced Threat Protection
                  </p>
                </div>
              </div>

              {/* User */}
              <div className="flex items-center gap-4">
                {session ? (
                  <Menu as="div" className="relative inline-block text-left z-50">
                    <div>
                      <Menu.Button className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:text-blue-500">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${session.user.email || 'User'}`}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="hidden sm:inline truncate max-w-[150px]">
                          {session.user.email}
                        </span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-slate-200 dark:divide-slate-700">
                        <div className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                          <p className="truncate">{session.user.email}</p>
                        </div>
                        <div className="p-2">
                          <ThemeToggle />
                        </div>
                        <div className="p-2">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={async () => {
                                  await supabase.auth.signOut();
                                  setSession(null);
                                }}
                                className={`${
                                  active ? 'bg-slate-100 dark:bg-slate-700' : ''
                                } w-full text-left px-2 py-2 text-sm flex items-center gap-2 text-red-600 rounded-md`}
                              >
                                <LogOut className="w-4 h-4" /> Logout
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-300">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`relative pb-4 px-3 border-b-2 font-medium text-sm flex items-center gap-2 transition-all duration-300 ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      activeTab === id
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700/50 animate-fade-in transition-colors duration-300">
            {activeTab === 'scanner' && <URLScanner />}
            {activeTab === 'quiz' && <SecurityQuiz />}
            {activeTab === 'threats' && <ThreatDashboard />}
            {activeTab === 'guide' && <SecurityGuide />}
            {activeTab === 'report' && <ReportPhishing />}
            {activeTab === 'track' && <TrackReport />}
            {activeTab === 'myreports' && <MyReports />}
          </div>
        </main>

        {/* Auth Modal */}
        {showAuth && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative">
              <AuthPage />
              <button
                onClick={() => setShowAuth(false)}
                className="absolute top-2 right-2 text-white bg-slate-700 hover:bg-slate-600 p-1 rounded-full"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-auto py-8 bg-white/30 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700/50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} PhishNet • Protecting Your Digital World
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
