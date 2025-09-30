export interface Case {
  id: string;
  title: string;
  platform: string;
  url?: string;
  dateObserved: Date;
  description: string;
  location?: string;
  tags: string[];
  status: 'submitted' | 'processing' | 'under_review' | 'routed' | 'closed';
  reporterContact?: string;
  anonymous: boolean;
  evidence: Evidence[];
  createdAt: Date;
  updatedAt: Date;
  jurisdiction?: string;
  priority: 'low' | 'medium' | 'high';
  hash: string;
  signature?: string;
}

export interface Evidence {
  id: string;
  filename: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'url_snapshot';
  size: number;
  hash: string;
  url?: string;
  metadata?: Record<string, any>;
  processed: boolean;
  createdAt: Date;
}

export interface Authority {
  id: string;
  country: string;
  name: string;
  contactEmail: string;
  webhookUrl?: string;
  publicKey?: string;
  active: boolean;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'reviewer' | 'supervisor';
  createdAt: Date;
}

export const SUPPORTED_PLATFORMS = [
  'Twitter/X',
  'Facebook',
  'Instagram', 
  'TikTok',
  'YouTube',
  'Telegram',
  'WhatsApp',
  'Reddit',
  'Threads',
  'VK',
  'Snapchat',
  'Website/Blog',
  'News Site',
  'Other'
] as const;

export const EVIDENCE_TAGS = [
  'Slurs/Epithets',
  'Threats of Violence', 
  'Incitement to Violence',
  'Vandalism/Destruction',
  'Doxxing/Personal Info',
  'Holocaust Denial',
  'Blood Libel',
  'Conspiracy Theories',
  'Hate Symbol/Imagery',
  'Harassment Campaign',
  'Other'
] as const;

export type Platform = typeof SUPPORTED_PLATFORMS[number];
export type EvidenceTag = typeof EVIDENCE_TAGS[number];