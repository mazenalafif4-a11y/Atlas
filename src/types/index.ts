export interface Case {
  id: string;
  title: string;
  platform: string;
  url?: string;
  dateObserved: Date;
  timeObserved: string;
  description: string;
  location?: string;
  tags: string[];
  status: 'submitted' | 'processing' | 'classified' | 'under_review' | 'routed' | 'acknowledged' | 'closed';
  reporterContact?: string;
  anonymous: boolean;
  evidence: Evidence[];
  createdAt: Date;
  updatedAt: Date;
  jurisdiction?: string;
  priority: 'low' | 'medium' | 'high';
  hash: string;
  signature?: string;
  manifestUrl?: string;
  pdfReportUrl?: string;
  authorityResponse?: AuthorityResponse;
  timeline: CaseEvent[];
  classificationScore?: number;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export interface Evidence {
  id: string;
  filename: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'url_snapshot' | 'screenshot';
  size: number;
  hash: string;
  url?: string;
  metadata?: EvidenceMetadata;
  processed: boolean;
  createdAt: Date;
  thumbnailUrl?: string;
  transcriptText?: string;
  ocrText?: string;
  contentLanguage?: string;
}

export interface EvidenceMetadata {
  platform?: string;
  author?: string;
  authorHandle?: string;
  postId?: string;
  timestamp?: string;
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // for video/audio
  resolution?: string;
  codec?: string;
}

export interface CaseEvent {
  id: string;
  caseId: string;
  action: string;
  details?: string;
  timestamp: Date;
  actor?: string;
  metadata?: Record<string, any>;
}

export interface Authority {
  id: string;
  country: string;
  name: string;
  contactEmail: string;
  webhookUrl?: string;
  publicKey?: string;
  active: boolean;
  deliveryMethods: ('email' | 'webhook' | 'portal')[];
  jurisdictions: string[];
}

export interface AuthorityResponse {
  id: string;
  authorityId: string;
  status: 'pending' | 'acknowledged' | 'processed' | 'closed';
  referenceNumber?: string;
  message?: string;
  timestamp: Date;
  signature?: string;
}

export interface CaseManifest {
  caseId: string;
  version: '1.0';
  timestamp: string;
  jurisdiction?: string;
  priority: 'low' | 'medium' | 'high';
  classification: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    tags: string[];
    targetGroups: string[];
  };
  incident: {
    platform: string;
    url?: string;
    dateObserved: string;
    location?: string;
    description: string;
  };
  evidence: Array<{
    filename: string;
    type: string;
    hash: string;
    size: number;
    url?: string;
    metadata?: Record<string, any>;
  }>;
  reporter: {
    anonymous: boolean;
    contact?: string;
  };
  processing: {
    steps: string[];
    completedAt: string;
    verificationUrl: string;
  };
  signature: {
    algorithm: 'SHA256withRSA';
    value: string;
    publicKey: string;
  };
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'reviewer' | 'supervisor' | 'exporter';
  permissions: string[];
  createdAt: Date;
  lastLogin?: Date;
  mfaEnabled: boolean;
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
  'Antisemitic Slurs/Epithets',
  'Anti-Druze Slurs/Epithets',
  'Threats of Violence', 
  'Incitement to Violence',
  'Vandalism/Destruction',
  'Doxxing/Personal Info',
  'Holocaust Denial',
  'Blood Libel',
  'Conspiracy Theories',
  'Hate Symbol/Imagery',
  'Harassment Campaign',
  'Dehumanization',
  'Other Hate Speech'
] as const;

export const JURISDICTIONS = [
  'Germany',
  'Israel',
  'United States',
  'United Kingdom',
  'France',
  'Canada',
  'Australia',
  'Netherlands',
  'Austria',
  'Belgium',
  'Other'
] as const;

export type Platform = typeof SUPPORTED_PLATFORMS[number];
export type EvidenceTag = typeof EVIDENCE_TAGS[number];
export type Jurisdiction = typeof JURISDICTIONS[number];