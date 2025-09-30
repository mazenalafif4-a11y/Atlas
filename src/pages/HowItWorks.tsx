import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileCheck, 
  Send, 
  Shield, 
  Lock, 
  Hash, 
  CheckCircle,
  Globe,
  Eye,
  Clock,
  Zap,
  Server,
  Key,
  FileText,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Timeline } from '../components/ui/Timeline';

const processSteps = [
  {
    id: '1',
    title: 'Evidence Submission',
    description: 'Automated content capture and cryptographic hashing begins immediately upon submission',
    timestamp: new Date(),
    status: 'completed' as const,
    icon: <Upload className="h-4 w-4" />
  },
  {
    id: '2',
    title: 'Content Processing',
    description: 'URL metadata extraction, screenshot capture, OCR, and speech-to-text transcription',
    timestamp: new Date(Date.now() - 300000),
    status: 'completed' as const,
    icon: <FileCheck className="h-4 w-4" />
  },
  {
    id: '3',
    title: 'Classification & Risk Assessment',
    description: 'Hate speech detection, target group identification, and priority scoring',
    timestamp: new Date(Date.now() - 600000),
    status: 'completed' as const,
    icon: <Eye className="h-4 w-4" />
  },
  {
    id: '4',
    title: 'Manifest Generation',
    description: 'Cryptographically signed evidence package creation with verification endpoints',
    timestamp: new Date(Date.now() - 900000),
    status: 'current' as const,
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: '5',
    title: 'Authority Routing',
    description: 'Jurisdiction-aware delivery to appropriate law enforcement agencies',
    timestamp: new Date(Date.now() - 1200000),
    status: 'pending' as const,
    icon: <Send className="h-4 w-4" />
  }
];

const securityFeatures = [
  {
    icon: Hash,
    title: 'SHA-256 Evidence Hashing',
    description: 'Every piece of evidence receives a cryptographic fingerprint that detects any tampering or modification.',
    details: [
      'File integrity verification',
      'Immutable evidence trail', 
      'Court-admissible proof of authenticity'
    ]
  },
  {
    icon: Key,
    title: 'Digital Signatures',
    description: 'Evidence packages are cryptographically signed using RSA-2048 keys for legal verification.',
    details: [
      'Non-repudiation guarantees',
      'Authority verification tools',
      'Blockchain-anchored timestamps'
    ]
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit and at rest using AES-256 with perfect forward secrecy.',
    details: [
      'TLS 1.3 transport security',
      'Zero-knowledge architecture',
      'Secure key management (HSM)'
    ]
  },
  {
    icon: Globe,
    title: 'Jurisdiction Routing',
    description: 'Smart routing to appropriate authorities based on content origin and applicable laws.',
    details: [
      'GDPR compliance framework',
      'Multi-jurisdiction support',
      'Automated authority notification'
    ]
  }
];

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-slate-100 bg-noise">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            How Sentinel Atlas Works
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            A secure, automated pipeline that transforms hate speech evidence into 
            legally-verifiable packages for law enforcement agencies worldwide.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-sentinel-green" />
              <span>Evidence hashing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-sentinel-blue" />
              <span>Digital signatures</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-sentinel-gold" />
              <span>Jurisdiction routing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-sentinel-green" />
              <span>GDPR compliant</span>
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Evidence Processing Pipeline
            </h2>
            <p className="text-lg text-slate-600">
              From submission to authority delivery in under 10 minutes
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Process Timeline */}
            <Card variant="glass" className="p-6 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-sentinel-blue" />
                  Live Processing Status
                </h3>
              </CardHeader>
              <CardContent>
                <Timeline events={processSteps} />
              </CardContent>
            </Card>

            {/* Step Details */}
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Submit Evidence',
                  icon: Upload,
                  description: 'Share public links or upload files (images, videos, audio, documents). Our system immediately begins processing.',
                  features: [
                    'Real-time URL content capture',
                    'Multi-platform support (15+ platforms)',
                    'Client-side file hashing (SHA-256)',
                    'Malware scanning and validation'
                  ],
                  timing: '< 30 seconds'
                },
                {
                  step: '02', 
                  title: 'Process & Extract',
                  icon: FileCheck,
                  description: 'Automated content analysis extracts metadata, generates transcripts, and captures immutable snapshots.',
                  features: [
                    'OCR text extraction from images',
                    'Speech-to-text transcription', 
                    'Metadata extraction (timestamps, authors)',
                    'Screenshot and HTML snapshots'
                  ],
                  timing: '2-5 minutes'
                },
                {
                  step: '03',
                  title: 'Classify & Route',
                  icon: Send,
                  description: 'AI-powered classification determines severity and routes to the appropriate authority with signed manifests.',
                  features: [
                    'Hate speech classification',
                    'Risk level assessment (Low/Med/High/Critical)',
                    'Jurisdiction determination',
                    'Cryptographic signing & delivery'
                  ],
                  timing: '1-3 minutes'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-sentinel-green to-sentinel-blue">
                            <step.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-slate-900">
                              Step {step.step}: {step.title}
                            </h3>
                            <Badge variant="info" size="sm">{step.timing}</Badge>
                          </div>
                          <p className="text-slate-600 mb-3">{step.description}</p>
                          <ul className="space-y-1">
                            {step.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-slate-500">
                                <CheckCircle className="mr-2 h-3 w-3 text-sentinel-green flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Trust */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Security & Verification
            </h2>
            <p className="text-lg text-slate-600">
              Enterprise-grade security with court-admissible evidence standards
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all hover:shadow-glass">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-sentinel-green/10 to-sentinel-blue/10">
                        <feature.icon className="h-6 w-6 text-sentinel-blue" />
                      </div>
                    </div>
                    <h3 className="mb-3 font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-xs text-slate-500 flex items-center justify-center">
                          <div className="h-1 w-1 rounded-full bg-sentinel-gold mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Authority Integration */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Authority Integration
            </h2>
            <p className="text-lg text-slate-600">
              Direct integration with law enforcement agencies across jurisdictions
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card variant="glass" className="backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Server className="mx-auto h-8 w-8 text-sentinel-green mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Secure Delivery</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Evidence packages delivered via encrypted channels with delivery confirmation
                </p>
                <div className="space-y-2 text-xs text-slate-500">
                  <div>• HTTPS/TLS 1.3 transport</div>
                  <div>• PGP-encrypted email</div>
                  <div>• Secure webhook endpoints</div>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass" className="backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <FileText className="mx-auto h-8 w-8 text-sentinel-blue mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Verification Tools</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Authorities can instantly verify evidence authenticity and chain of custody
                </p>
                <div className="space-y-2 text-xs text-slate-500">
                  <div>• Signature verification API</div>
                  <div>• Hash integrity checking</div>
                  <div>• Timestamp validation</div>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass" className="backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Zap className="mx-auto h-8 w-8 text-sentinel-gold mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Automated ACK</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Real-time acknowledgment and case reference number assignment
                </p>
                <div className="space-y-2 text-xs text-slate-500">
                  <div>• Instant delivery receipts</div>
                  <div>• Reference number tracking</div>
                  <div>• Status update webhooks</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Specifications */}
        <Card variant="glass" className="backdrop-blur-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900 flex items-center">
              <Hash className="mr-2 h-5 w-5" />
              Technical Specifications
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="font-medium text-slate-900 mb-3">Cryptographic Standards</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• SHA-256 content hashing</li>
                  <li>• RSA-2048 digital signatures</li>
                  <li>• AES-256 encryption at rest</li>
                  <li>• ECDSA blockchain anchoring</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-3">Compliance & Privacy</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• GDPR Article 6(1)(f) lawful basis</li>
                  <li>• ISO 27001 security controls</li>
                  <li>• SOC 2 Type II certified</li>
                  <li>• Data residency options (EU/US/IL)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-3">Platform Support</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• 15+ social media platforms</li>
                  <li>• Website content capture</li>
                  <li>• Multi-format file support</li>
                  <li>• Real-time processing (< 10min)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}