import { ReactNode } from 'react';

export type RiskLevel = 'safe' | 'suspicious' | 'dangerous';

export interface ScanResult {
  url: string;
  riskLevel: RiskLevel;
  threats: string[];
  timestamp: string;
  recommendations: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ThreatEntry {
  domain: string;
  type: string;
  detectedAt: string;
  status: 'Active' | 'Blocked';
}

export interface PhishingGuide {
  title: string;
  icon: ReactNode;
  content: string[];
}

export interface ScanHistory extends ScanResult {
  id: string;
}