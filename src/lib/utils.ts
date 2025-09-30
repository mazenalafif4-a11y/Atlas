import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from 'crypto-js';

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

export function generateManifest(caseData: any): string {
  const manifest = {
    caseId: caseData.id,
    timestamp: new Date().toISOString(),
    evidence: caseData.evidence.map((item: any) => ({
      filename: item.filename,
      hash: item.hash,
      size: item.size,
      type: item.type
    })),
    metadata: {
      platform: caseData.platform,
      url: caseData.url,
      jurisdiction: caseData.jurisdiction,
      tags: caseData.tags
    }
  };
  
  return JSON.stringify(manifest, null, 2);
}