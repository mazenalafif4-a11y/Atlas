import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from 'crypto-js';
import type { Case, CaseManifest, Evidence } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCaseId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `SA-${year}-${randomNum}`;
}

export function hashContent(content: string): string {
  return CryptoJS.SHA256(content).toString();
}

export async function hashFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Remove tracking parameters
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'gclid'];
    trackingParams.forEach(param => parsed.searchParams.delete(param));
    return parsed.toString();
  } catch {
    return url;
  }
}

export function detectPlatform(url: string): string {
  const domain = extractDomain(url).toLowerCase();
  
  if (domain.includes('twitter.com') || domain.includes('x.com')) return 'Twitter/X';
  if (domain.includes('facebook.com') || domain.includes('fb.com')) return 'Facebook';
  if (domain.includes('instagram.com')) return 'Instagram';
  if (domain.includes('tiktok.com')) return 'TikTok';
  if (domain.includes('youtube.com') || domain.includes('youtu.be')) return 'YouTube';
  if (domain.includes('t.me') || domain.includes('telegram.org')) return 'Telegram';
  if (domain.includes('wa.me') || domain.includes('whatsapp.com')) return 'WhatsApp';
  if (domain.includes('reddit.com')) return 'Reddit';
  if (domain.includes('threads.net')) return 'Threads';
  if (domain.includes('vk.com')) return 'VK';
  if (domain.includes('snapchat.com')) return 'Snapchat';
  
  return 'Website/Blog';
}

export function generateManifest(caseData: Case): CaseManifest {
  const manifest: CaseManifest = {
    caseId: caseData.id,
    version: '1.0',
    timestamp: new Date().toISOString(),
    jurisdiction: caseData.jurisdiction,
    priority: caseData.priority,
    classification: {
      riskLevel: caseData.riskLevel || 'medium',
      confidence: caseData.classificationScore || 0.8,
      tags: caseData.tags,
      targetGroups: extractTargetGroups(caseData.tags)
    },
    incident: {
      platform: caseData.platform,
      url: caseData.url,
      dateObserved: caseData.dateObserved.toISOString(),
      location: caseData.location,
      description: caseData.description
    },
    evidence: caseData.evidence.map(item => ({
      filename: item.filename,
      type: item.type,
      hash: item.hash,
      size: item.size,
      url: item.url,
      metadata: item.metadata
    })),
    reporter: {
      anonymous: caseData.anonymous,
      contact: caseData.reporterContact
    },
    processing: {
      steps: ['intake', 'validation', 'classification', 'packaging'],
      completedAt: new Date().toISOString(),
      verificationUrl: `${window.location.origin}/verify/${caseData.id}`
    },
    signature: {
      algorithm: 'SHA256withRSA',
      value: generateSignature(caseData),
      publicKey: getPublicKey()
    }
  };
  
  return manifest;
}

function extractTargetGroups(tags: string[]): string[] {
  const groups: string[] = [];
  
  if (tags.some(tag => tag.includes('Antisemitic') || tag.includes('Holocaust') || tag.includes('Blood Libel'))) {
    groups.push('Jewish');
  }
  
  if (tags.some(tag => tag.includes('Anti-Druze'))) {
    groups.push('Druze');
  }
  
  return groups;
}

function generateSignature(caseData: Case): string {
  // In production, this would use proper RSA signing with a private key
  const content = JSON.stringify({
    caseId: caseData.id,
    hash: caseData.hash,
    timestamp: caseData.createdAt.toISOString()
  });
  return CryptoJS.SHA256(content + 'SENTINEL_ATLAS_SECRET').toString();
}

function getPublicKey(): string {
  // In production, this would return the actual public key
  return 'SENTINEL_ATLAS_PUBLIC_KEY_PLACEHOLDER';
}

export function verifyManifest(manifest: CaseManifest): boolean {
  // In production, this would verify the RSA signature
  return manifest.signature.value.length > 0;
}

export function calculateRiskLevel(tags: string[], description: string): 'low' | 'medium' | 'high' | 'critical' {
  const highRiskTags = ['Threats of Violence', 'Incitement to Violence', 'Doxxing/Personal Info'];
  const mediumRiskTags = ['Harassment Campaign', 'Dehumanization'];
  
  const hasHighRisk = tags.some(tag => highRiskTags.includes(tag));
  const hasMediumRisk = tags.some(tag => mediumRiskTags.includes(tag));
  
  const hasUrgentKeywords = /\b(kill|murder|bomb|attack|shoot|stab|eliminate)\b/i.test(description);
  
  if (hasHighRisk || hasUrgentKeywords) return 'critical';
  if (hasMediumRisk || tags.length >= 3) return 'high';
  if (tags.length >= 1) return 'medium';
  
  return 'low';
}

export function formatDateTime(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
    ...options
  }).format(dateObj);
}

export function formatDateTimeShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffHours < 1) {
    return 'Just now';
  } else if (diffHours < 24) {
    return `${Math.floor(diffHours)}h ago`;
  } else if (diffDays < 7) {
    return `${Math.floor(diffDays)}d ago`;
  } else {
    return dateObj.toLocaleDateString();
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function getJurisdictionFromUrl(url: string): string {
  const domain = extractDomain(url).toLowerCase();
  
  // Common country-specific domains
  if (domain.endsWith('.de')) return 'Germany';
  if (domain.endsWith('.il')) return 'Israel';
  if (domain.endsWith('.uk') || domain.endsWith('.co.uk')) return 'United Kingdom';
  if (domain.endsWith('.fr')) return 'France';
  if (domain.endsWith('.ca')) return 'Canada';
  if (domain.endsWith('.au')) return 'Australia';
  
  // Platform-specific geo detection (simplified)
  if (domain.includes('facebook.com') || domain.includes('instagram.com')) {
    // Would need geo-IP or content analysis in production
    return 'Germany'; // Default to Germany for EU GDPR compliance
  }
  
  return 'Germany'; // Default jurisdiction
}

export async function captureUrlMetadata(url: string): Promise<Record<string, any>> {
  // In production, this would be handled server-side
  // Simulate metadata extraction
  return {
    title: 'Sample Post Title',
    author: '@sample_user',
    timestamp: new Date().toISOString(),
    platform: detectPlatform(url),
    engagement: {
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50)
    }
  };
}