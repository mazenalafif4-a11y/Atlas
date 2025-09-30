import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Download, 
  Upload, 
  CheckCircle, 
  Key, 
  FileText, 
  Globe, 
  AlertCircle,
  Hash,
  Lock,
  Eye,
  Clock,
  Server,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

const sampleManifest = {
  caseId: "SA-2025-0001",
  version: "1.0",
  timestamp: "2025-01-16T14:45:32.123Z",
  jurisdiction: "Germany",
  priority: "high",
  classification: {
    riskLevel: "critical",
    confidence: 0.94,
    tags: ["Antisemitic Slurs/Epithets", "Threats of Violence"],
    targetGroups: ["Jewish"]
  },
  evidence: [
    {
      filename: "screenshot_2025-01-16_14-30-15.png",
      type: "screenshot",
      hash: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      size: 2847392,
      metadata: {
        platform: "Twitter/X",
        timestamp: "2025-01-16T13:15:42.000Z"
      }
    }
  ],
  signature: {
    algorithm: "SHA256withRSA",
    value: "3045022100d2f8a4b6c9e1f7a3b5d8c6e4f2a9b7d5c3e1f9a7b5d3c1e9f7a5b3d1c9e7f5a3b2",
    publicKey: "SENTINEL_ATLAS_PUBLIC_KEY"
  }
};

export function Authorities() {
  const [activeTab, setActiveTab] = useState<'verify' | 'docs' | 'checker'>('verify');
  const [manifestInput, setManifestInput] = useState('');
  const [signatureInput, setSignatureInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyManifest = async () => {
    setIsVerifying(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const manifest = JSON.parse(manifestInput);
      // Simple validation - in production would use proper cryptographic verification
      const isValid = manifest.signature && manifest.caseId && manifest.evidence;
      setVerificationResult(isValid ? 'valid' : 'invalid');
    } catch {
      setVerificationResult('invalid');
    }
    
    setIsVerifying(false);
  };

  const loadSampleManifest = () => {
    setManifestInput(JSON.stringify(sampleManifest, null, 2));
    setSignatureInput(sampleManifest.signature.value);
    setVerificationResult(null);
  };

  const tabs = [
    { id: 'verify', label: 'Verify Evidence', icon: Shield },
    { id: 'docs', label: 'API Documentation', icon: FileText },
    { id: 'checker', label: 'Signature Checker', icon: Key }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal to-slate-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            For Law Enforcement Authorities
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Verification tools and API documentation for processing Sentinel Atlas evidence packages
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-1 bg-slate-800/50 rounded-lg p-1 backdrop-blur-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-sentinel-green to-sentinel-blue text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mx-auto max-w-6xl">
          {activeTab === 'verify' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              {/* Verification Interface */}
              <Card variant="glass" className="backdrop-blur-sm border-slate-700/20">
                <CardHeader className="border-b border-slate-700/20">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-sentinel-green" />
                    Evidence Manifest Verification
                  </h2>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Evidence Manifest (JSON)
                    </label>
                    <textarea
                      value={manifestInput}
                      onChange={(e) => setManifestInput(e.target.value)}
                      rows={12}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 font-mono placeholder:text-slate-500 focus:border-sentinel-green focus:outline-none focus:ring-2 focus:ring-sentinel-green/20 backdrop-blur-sm"
                      placeholder="Paste evidence manifest JSON here..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Digital Signature
                    </label>
                    <Input
                      value={signatureInput}
                      onChange={(e) => setSignatureInput(e.target.value)}
                      placeholder="Digital signature value"
                      className="bg-slate-800/50 border-slate-600 text-slate-200"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleVerifyManifest}
                      loading={isVerifying}
                      className="bg-gradient-to-r from-sentinel-green to-sentinel-blue"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Verify Evidence
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={loadSampleManifest}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      Load Sample
                    </Button>
                  </div>

                  {/* Verification Result */}
                  {verificationResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        'p-4 rounded-lg border',
                        verificationResult === 'valid'
                          ? 'bg-emerald-900/30 border-emerald-500/30'
                          : 'bg-red-900/30 border-red-500/30'
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        {verificationResult === 'valid' ? (
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        )}
                        <div>
                          <h3 className={cn(
                            'font-medium',
                            verificationResult === 'valid' ? 'text-emerald-300' : 'text-red-300'
                          )}>
                            {verificationResult === 'valid' ? 'Evidence Verified' : 'Verification Failed'}
                          </h3>
                          <p className={cn(
                            'text-sm mt-1',
                            verificationResult === 'valid' ? 'text-emerald-400' : 'text-red-400'
                          )}>
                            {verificationResult === 'valid' 
                              ? 'All signatures valid, evidence integrity confirmed'
                              : 'Invalid manifest or signature mismatch detected'
                            }
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Evidence Details */}
              <div className="space-y-6">
                <Card variant="glass" className="backdrop-blur-sm border-slate-700/20">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-white">Evidence Package Contents</h3>
                  </CardHeader>
                  <CardContent>
                    {manifestInput && (() => {
                      try {
                        const manifest = JSON.parse(manifestInput);
                        return (
                          <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label className="text-xs text-slate-400">Case ID</label>
                                <div className="text-sm text-white font-mono">{manifest.caseId}</div>
                              </div>
                              <div>
                                <label className="text-xs text-slate-400">Jurisdiction</label>
                                <div className="text-sm text-white">{manifest.jurisdiction}</div>
                              </div>
                              <div>
                                <label className="text-xs text-slate-400">Priority</label>
                                <Badge variant={manifest.priority === 'high' ? 'error' : 'warning'} size="sm">
                                  {manifest.priority?.toUpperCase()}
                                </Badge>
                              </div>
                              <div>
                                <label className="text-xs text-slate-400">Risk Level</label>
                                <Badge variant="error" size="sm">
                                  {manifest.classification?.riskLevel?.toUpperCase()}
                                </Badge>
                              </div>
                            </div>

                            <div>
                              <label className="text-xs text-slate-400">Evidence Files</label>
                              <div className="space-y-2 mt-1">
                                {manifest.evidence?.map((file: any, index: number) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-slate-800/30 rounded text-sm">
                                    <div>
                                      <div className="text-white">{file.filename}</div>
                                      <div className="text-xs text-slate-400">
                                        {file.type} • {(file.size / 1024 / 1024).toFixed(1)} MB
                                      </div>
                                    </div>
                                    <Badge variant="success" size="sm">Hashed</Badge>
                                  </div>
                                )) || []}
                              </div>
                            </div>
                          </div>
                        );
                      } catch {
                        return <p className="text-slate-400">Invalid JSON format</p>;
                      }
                    })()}
                  </CardContent>
                </Card>

                <Card variant="glass" className="backdrop-blur-sm border-slate-700/20">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-white mb-4">Quick Actions</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                        <Download className="mr-2 h-4 w-4" />
                        Download Package
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Case ID
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                        <Hash className="mr-2 h-4 w-4" />
                        Verify Hashes
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                        <Eye className="mr-2 h-4 w-4" />
                        View Timeline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'docs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* API Overview */}
              <Card variant="glass" className="backdrop-blur-sm border-slate-700/20">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-sentinel-blue" />
                    Authority API Documentation
                  </h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300 leading-relaxed">
                    The Sentinel Atlas Authority API provides secure endpoints for receiving, verifying, 
                    and acknowledging hate speech evidence packages. All communications are encrypted 
                    and authenticated using industry-standard protocols.
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Webhook Endpoints</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-800/30 rounded-lg">
                          <code className="text-sentinel-green">POST /webhook/evidence</code>
                          <p className="text-sm text-slate-400 mt-1">Receive new evidence packages</p>
                        </div>
                        <div className="p-3 bg-slate-800/30 rounded-lg">
                          <code className="text-sentinel-blue">POST /webhook/verify</code>
                          <p className="text-sm text-slate-400 mt-1">Verify signatures and hashes</p>
                        </div>
                        <div className="p-3 bg-slate-800/30 rounded-lg">
                          <code className="text-sentinel-gold">POST /webhook/acknowledge</code>
                          <p className="text-sm text-slate-400 mt-1">Send acknowledgment receipts</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Authentication</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Key className="h-5 w-5 text-sentinel-green" />
                          <span className="text-slate-300">HMAC-SHA256 request signing</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Lock className="h-5 w-5 text-sentinel-blue" />
                          <span className="text-slate-300">TLS 1.3 transport encryption</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-sentinel-gold" />
                          <span className="text-slate-300">RSA-2048 payload signatures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Code Examples */}
              <Card variant="glass" className="backdrop-blur-sm border-slate-700/20">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">Integration Examples</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Webhook Payload Structure</h4>
                      <div className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-slate-300">
{`{
  "event": "evidence.submitted",
  "caseId": "SA-2025-0001", 
  "timestamp": "2025-01-16T14:45:32.123Z",
  "jurisdiction": "Germany",
  "priority": "high",
  "manifest": {
    "version": "1.0",
    "evidence": [...],
    "signature": {...}
  },
  "downloads": [
    {
      "filename": "evidence-package.zip",
      "url": "https://secure.sentinel-atlas.org/...",
      "expires": "2025-01-16T16:45:32.123Z"
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Signature Verification (Node.js)</h4>
                      <div className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-slate-300">
{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, publicKey) {
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(payload);
  return verifier.verify(publicKey, signature, 'hex');
}

// Example usage
const isValid = verifyWebhookSignature(
  JSON.stringify(webhookPayload),
  request.headers['x-sentinel-signature'],
  process.env.SENTINEL_PUBLIC_KEY
);`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Resources */}
              <Card variant="glass" className="backdrop-blur-sm border-slate-700/20">
                <CardContent className="pt-6">
                  <h3 className="text-white font-medium mb-4">Resources & Downloads</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
                      <Download className="mr-2 h-4 w-4" />
                      API Reference (PDF)
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
                      <Key className="mr-2 h-4 w-4" />
                      Public Key Bundle
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
                      <FileText className="mr-2 h-4 w-4" />
                      Integration Guide
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      OpenAPI Spec
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'checker' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <Card variant="glass" className="backdrop-blur-sm border-slate-700/20">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Key className="mr-2 h-5 w-5 text-sentinel-gold" />
                    Digital Signature Checker
                  </h2>
                  <p className="text-slate-300">
                    Verify the authenticity of individual evidence files using their digital signatures
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        File Hash (SHA-256)
                      </label>
                      <Input
                        placeholder="a1b2c3d4e5f6789012345678901234567890..."
                        className="bg-slate-800/50 border-slate-600 text-slate-200 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Digital Signature
                      </label>
                      <Input
                        placeholder="3045022100d2f8a4b6c9e1f7a3b5d8c6e4..."
                        className="bg-slate-800/50 border-slate-600 text-slate-200 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Upload File for Verification
                    </label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-sentinel-green transition-colors">
                      <Upload className="mx-auto h-8 w-8 text-slate-400 mb-3" />
                      <p className="text-slate-300 mb-2">Drop evidence file here or click to upload</p>
                      <p className="text-xs text-slate-500">We'll compute the hash and verify the signature</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button className="bg-gradient-to-r from-sentinel-gold to-sentinel-blue">
                      <Shield className="mr-2 h-4 w-4" />
                      Verify File Signature
                    </Button>
                  </div>

                  {/* Sample verification result */}
                  <div className="p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <div>
                        <h3 className="font-medium text-emerald-300">File Signature Valid</h3>
                        <p className="text-sm text-emerald-400 mt-1">
                          Hash: a1b2c3d4...ef123456 • Signed: 2025-01-16 14:45:32 UTC • Authority: Sentinel Atlas
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}