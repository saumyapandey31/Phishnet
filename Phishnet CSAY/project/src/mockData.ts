import { ScanResult, QuizQuestion, ThreatEntry, PhishingGuide } from './types';
import { AlertTriangle, Link2, Mail, CreditCard, ShieldAlert, Eye, BrainCircuit } from 'lucide-react';

export const mockScanResults: Record<string, ScanResult> = {
  'https://legitimate-bank.com': {
    url: 'https://legitimate-bank.com',
    riskLevel: 'safe',
    threats: [],
    timestamp: new Date().toISOString(),
    recommendations: [
      'Site verified as legitimate',
      'SSL certificate is valid and up to date',
      'Domain has long-standing reputation'
    ]
  },
  'https://faceb00k-login.com': {
    url: 'https://faceb00k-login.com',
    riskLevel: 'dangerous',
    threats: [
      'Domain spoofing detected - attempting to imitate Facebook',
      'Invalid SSL certificate',
      'Domain registered within last 24 hours',
      'Suspicious character substitution in domain name'
    ],
    timestamp: new Date().toISOString(),
    recommendations: [
      'Do not enter any personal information',
      'Block this domain in your browser',
      'Report this website to anti-phishing authorities',
      'If you entered any credentials, change them immediately'
    ]
  },
  'https://amaz0n-security-verify.net': {
    url: 'https://amaz0n-security-verify.net',
    riskLevel: 'dangerous',
    threats: [
      'Known phishing domain',
      'Impersonating Amazon.com',
      'Multiple fraud reports',
      'Hosted on suspicious IP range'
    ],
    timestamp: new Date().toISOString(),
    recommendations: [
      'Avoid accessing this website',
      'Report to Amazon\'s security team',
      'Clear browser cookies if site was accessed',
      'Monitor your accounts for suspicious activity'
    ]
  },
  'https://mybank.com-secure.xyz': {
    url: 'https://mybank.com-secure.xyz',
    riskLevel: 'dangerous',
    threats: [
      'Deceptive domain structure',
      'Recently registered domain',
      'Connected to known phishing campaign',
      'Suspicious redirect chain detected'
    ],
    timestamp: new Date().toISOString(),
    recommendations: [
      'Do not proceed to this website',
      'Report to your bank\'s security team',
      'Check your computer for malware',
      'Monitor financial statements for unauthorized activity'
    ]
  },
  'https://docs.google.com': {
    url: 'https://docs.google.com',
    riskLevel: 'safe',
    threats: [],
    timestamp: new Date().toISOString(),
    recommendations: [
      'Verified Google domain',
      'Strong security measures in place',
      'Continue using service as normal',
      'Always verify you\'re on the correct Google domain'
    ]
  },
  'https://shopping-deals.suspicious.com': {
    url: 'https://shopping-deals.suspicious.com',
    riskLevel: 'suspicious',
    threats: [
      'Unusual domain pattern',
      'Limited domain history',
      'Mixed content warnings'
    ],
    timestamp: new Date().toISOString(),
    recommendations: [
      'Exercise caution when browsing',
      'Do not enter payment information',
      'Research the website before making purchases',
      'Look for verified customer reviews'
    ]
  }
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which of these is a sign of a phishing email?',
    options: [
      'The sender\'s email matches the company domain',
      'The email creates urgency and threatens account closure',
      'The email addresses you by your full name',
      'The email contains the company\'s official logo'
    ],
    correctAnswer: 1,
    explanation: 'Legitimate companies rarely create false urgency or threaten account closure. This is a common phishing tactic.'
  },
  {
    id: 2,
    question: 'What should you do if you receive a suspicious link?',
    options: [
      'Click it to see where it goes',
      'Forward it to your friends to verify',
      'Hover over it to check the actual URL',
      'Enter your credentials to check if they work'
    ],
    correctAnswer: 2,
    explanation: 'Hovering over links reveals their true destination without the risk of clicking them.'
  },
  {
    id: 3,
    question: 'Which URL is most likely to be a phishing attempt?',
    options: [
      'https://www.paypal.com/login',
      'https://www.paypa1.com/login',
      'https://www.paypal.com/signin',
      'https://accounts.paypal.com'
    ],
    correctAnswer: 1,
    explanation: 'The second URL uses the number "1" instead of the letter "l" - a common phishing tactic called typosquatting.'
  },
  {
    id: 4,
    question: 'What is a common characteristic of phishing websites?',
    options: [
      'They have a valid SSL certificate',
      'They use the company\'s official domain',
      'They have URLs with misspellings or numbers replacing letters',
      'They load quickly and efficiently'
    ],
    correctAnswer: 2,
    explanation: 'Phishing sites often use domain names that look similar to legitimate ones by replacing letters with numbers or making slight misspellings.'
  },
  {
    id: 5,
    question: 'What should you do if you accidentally entered information on a phishing site?',
    options: [
      'Wait and see if any unauthorized activity occurs',
      'Only change the password for that specific site',
      'Immediately change passwords on all your accounts and monitor for suspicious activity',
      'Clear your browser history'
    ],
    correctAnswer: 2,
    explanation: 'If you\'ve entered information on a phishing site, you should immediately change passwords on all accounts, especially if you reuse passwords.'
  },
  {
    id: 6,
    question: 'Which of these email subject lines is most likely to be a phishing attempt?',
    options: [
      'Team meeting scheduled for Thursday',
      'Your account will be terminated in 24 hours - Immediate action required',
      'Welcome to our newsletter',
      'Invoice #12345 for your recent purchase'
    ],
    correctAnswer: 1,
    explanation: 'Phishing emails often create a false sense of urgency to panic users into taking immediate action without thinking.'
  },
  {
    id: 7,
    question: 'What is "spear phishing"?',
    options: [
      'Using a fishing rod emoji in scam emails',
      'Targeted phishing attacks using personal information about the victim',
      'Sending millions of phishing emails at once',
      'Phishing attempts during fishing season'
    ],
    correctAnswer: 1,
    explanation: 'Spear phishing is a targeted attack where scammers use personal information about the victim to make their attempts more convincing.'
  },
  {
    id: 8,
    question: 'Which security feature helps identify legitimate websites?',
    options: [
      'Pop-up advertisements',
      'Requests for immediate payment',
      'SSL certificate (https://)',
      'Flashing security badges'
    ],
    correctAnswer: 2,
    explanation: 'SSL certificates (indicated by https:// and a padlock icon) help verify a website\'s identity, though they alone don\'t guarantee legitimacy.'
  }
];

export const recentThreats: ThreatEntry[] = [
  {
    domain: 'paypa1-secure.com',
    type: 'Payment Processor Spoof',
    detectedAt: '2024-03-10T15:30:00Z',
    status: 'Active'
  },
  {
    domain: 'netflix-account-verify.net',
    type: 'Streaming Service Spoof',
    detectedAt: '2024-03-10T14:15:00Z',
    status: 'Active'
  },
  {
    domain: 'google-docs-share.xyz',
    type: 'Cloud Service Spoof',
    detectedAt: '2024-03-10T13:45:00Z',
    status: 'Blocked'
  }
];

export const phishingGuides: PhishingGuide[] = [
  {
    title: 'Common Phishing Tactics',
    icon: AlertTriangle,
    content: [
      'Creating urgency or threats',
      'Impersonating legitimate companies',
      'Using similar-looking domain names',
      'Requesting sensitive information',
      'Poor grammar and spelling mistakes'
    ]
  },
  {
    title: 'URL Safety Tips',
    icon: Link2,
    content: [
      'Check for HTTPS and valid certificates',
      'Verify the domain name carefully',
      'Watch for typos and number substitutions',
      'Be wary of URL shorteners',
      'Hover over links before clicking'
    ]
  },
  {
    title: 'Email Security',
    icon: Mail,
    content: [
      'Verify sender email addresses',
      'Don\'t trust display names alone',
      'Be cautious of unexpected attachments',
      'Check for personalization inconsistencies',
      'Validate unusual requests through other channels'
    ]
  },
  {
    title: 'Financial Protection',
    icon: CreditCard,
    content: [
      'Never send sensitive data via email',
      'Use unique passwords for financial accounts',
      'Enable two-factor authentication',
      'Monitor accounts regularly',
      'Report suspicious activities immediately'
    ]
  },
  {
    title: 'Red Flags to Watch For',
    icon: ShieldAlert,
    content: [
      'Requests for immediate action',
      'Threats of account closure',
      'Unusual sender addresses',
      'Generic greetings',
      'Requests to verify account information'
    ]
  },
  {
    title: 'Visual Clues',
    icon: Eye,
    content: [
      'Mismatched or pixelated logos',
      'Poor formatting and layout',
      'Inconsistent branding',
      'Unusual color schemes',
      'Missing company information'
    ]
  },
  {
    title: 'Best Practices',
    icon: BrainCircuit,
    content: [
      'Keep software and browsers updated',
      'Use password managers',
      'Enable spam filters',
      'Backup important data',
      'Educate yourself and others'
    ]
  }
];
