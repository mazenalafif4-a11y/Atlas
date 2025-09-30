import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Upload, 
  FileCheck, 
  Send, 
  Globe, 
  Lock, 
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  Scale
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Report hate content.{' '}
                <span className="bg-gradient-to-r from-emerald-500 via-red-500 via-amber-400 via-blue-800 to-slate-400 bg-clip-text text-transparent">
                  Fast. Secure. Verifiable.
                </span>
              </h1>
              <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 leading-8">
                For Druze and Jewish communities worldwide. Submit a link or upload evidence; 
                we package it for the right authority with cryptographic verification.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link to="/submit">
                    <Upload className="mr-2 h-5 w-5" />
                    Submit Evidence
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/how-it-works">
                    How It Works
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-r from-red-500/20 to-amber-500/20 blur-3xl"></div>
      </section>

      {/* How It Works - 3 Step Process */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Three Steps to Justice
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Our streamlined process ensures your evidence reaches the right authorities securely
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                icon: Upload,
                title: 'Submit Evidence',
                description: 'Share public links or upload files. Our system automatically captures metadata, screenshots, and creates immutable hashes.',
                features: ['URL analysis', 'File verification', 'Metadata extraction']
              },
              {
                step: '02', 
                icon: FileCheck,
                title: 'Secure Processing',
                description: 'Evidence is classified, packaged with cryptographic signatures, and routed to the appropriate jurisdiction.',
                features: ['Hate speech classification', 'Digital signatures', 'Jurisdiction mapping']
              },
              {
                step: '03',
                icon: Send,
                title: 'Authority Delivery',
                description: 'Signed reports are delivered to law enforcement with verification tools and chain of custody documentation.',
                features: ['Secure transmission', 'Delivery confirmation', 'Audit trails']
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card variant="glass" className="h-full p-8 text-center hover:shadow-xl transition-shadow">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-red-500 via-amber-400 via-blue-800 to-slate-400">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="mb-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                    STEP {item.step}
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mb-6 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
                        <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Features */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Built for Trust & Verification
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Enterprise-grade security meets human rights advocacy
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Lock,
                title: 'Evidence Hashing',
                description: 'SHA-256 cryptographic hashes ensure content integrity and detect tampering'
              },
              {
                icon: Shield,
                title: 'Signed Reports', 
                description: 'Digital signatures provide legal-grade verification for all evidence packages'
              },
              {
                icon: Globe,
                title: 'Jurisdiction Routing',
                description: 'Automatic routing to appropriate authorities based on content origin and laws'
              },
              {
                icon: Scale,
                title: 'GDPR Compliant',
                description: 'Full compliance with privacy regulations and configurable data retention'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow">
                  <CardContent>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-blue-500/10">
                      <feature.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Focus */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Supporting Druze & Jewish Communities
              </h2>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Sentinel Atlas was built specifically to address the unique challenges faced by 
                Druze and Jewish communities worldwide. Our platform understands the specific 
                forms of hate speech, historical context, and cultural sensitivities involved.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Specialized taxonomy for anti-Druze and antisemitic content',
                  'Multi-language support including Arabic and Hebrew with RTL text',
                  'Community-centric reporting workflows',
                  'Anonymous reporting options for safety',
                  'Direct connections to relevant law enforcement agencies'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                    <span className="text-slate-600 dark:text-slate-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card variant="glass" className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Users className="h-8 w-8 text-emerald-600" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Community Stats</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Global reach and impact</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">50+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">24/7</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">15+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Platforms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">99.9%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Ready to Report Hate Content?
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Join thousands of community members fighting hate speech with verified evidence
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link to="/submit">
                <Upload className="mr-2 h-5 w-5" />
                Submit Evidence Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/status" className="text-white border-white hover:bg-white/10">
                <Zap className="mr-2 h-4 w-4" />
                Check Case Status
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}