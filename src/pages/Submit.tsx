import React, { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Image, 
  Video, 
  Music, 
  File as FileIcon, 
  Globe, 
  Calendar, 
  Tag, 
  MapPin, 
  User, 
  Lock,
  Download,
  Eye,
  Hash,
  Clock,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { 
  SUPPORTED_PLATFORMS, 
  EVIDENCE_TAGS, 
  JURISDICTIONS,
  type Platform, 
  type EvidenceTag,
  type Jurisdiction 
} from '../types';
import { 
  generateCaseId, 
  hashFile, 
  formatFileSize, 
  isValidUrl, 
  extractDomain,
  detectPlatform,
  normalizeUrl,
  getJurisdictionFromUrl,
  captureUrlMetadata,
  calculateRiskLevel,
  generateManifest
} from '../lib/utils';

const submitSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title too long'),
  platform: z.enum(SUPPORTED_PLATFORMS),
  url: z.string().optional().refine((val) => !val || isValidUrl(val), 'Please enter a valid URL'),
  dateObserved: z.string().min(1, 'Date is required'),
  timeObserved: z.string().min(1, 'Time is required'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description too long'),
  location: z.string().optional(),
  tags: z.array(z.enum(EVIDENCE_TAGS)).min(1, 'Please select at least one tag'),
  jurisdiction: z.enum(JURISDICTIONS).optional(),
  reporterContact: z.string().email('Invalid email').optional().or(z.literal('')),
  anonymous: z.boolean(),
  consent: z.boolean().refine((val) => val, 'You must provide consent to proceed'),
});

type SubmitForm = z.infer<typeof submitSchema>;

interface EvidenceFile {
  id: string;
  file: File;
  hash: string;
  preview?: string;
  processing: boolean;
  metadata?: Record<string, any>;
}

interface URLMetadata {
  title?: string;
  author?: string;
  timestamp?: string;
  platform?: string;
  engagement?: Record<string, number>;
}

export function Submit() {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
  const [urlMetadata, setUrlMetadata] = useState<URLMetadata | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [caseId, setCaseId] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<SubmitForm>({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      dateObserved: new Date().toISOString().split('T')[0],
      timeObserved: new Date().toTimeString().split(' ')[0].slice(0, 5),
      anonymous: false,
      tags: [],
      consent: false
    }
  });

  const watchedValues = watch();
  const riskLevel = calculateRiskLevel(watchedValues.tags || [], watchedValues.description || '');

  // Auto-detect platform and jurisdiction from URL
  React.useEffect(() => {
    if (watchedValues.url && isValidUrl(watchedValues.url)) {
      const platform = detectPlatform(watchedValues.url);
      const jurisdiction = getJurisdictionFromUrl(watchedValues.url);
      
      setValue('platform', platform as Platform);
      setValue('jurisdiction', jurisdiction as Jurisdiction);
      
      // Fetch metadata (simulated)
      captureUrlMetadata(watchedValues.url).then(setUrlMetadata);
    }
  }, [watchedValues.url, setValue]);

  const handleFileSelect = useCallback(async (files: FileList) => {
    const newFiles: EvidenceFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = crypto.randomUUID();
      
      // Add file to state immediately with processing flag
      const fileEntry: EvidenceFile = {
        id: fileId,
        file,
        hash: '',
        processing: true,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      };
      
      newFiles.push(fileEntry);
    }

    setEvidenceFiles(prev => [...prev, ...newFiles]);

    // Process files asynchronously
    for (const fileEntry of newFiles) {
      try {
        const hash = await hashFile(fileEntry.file);
        
        setEvidenceFiles(prev => prev.map(f => 
          f.id === fileEntry.id 
            ? { ...f, hash, processing: false }
            : f
        ));
      } catch (error) {
        console.error('Error processing file:', error);
        setEvidenceFiles(prev => prev.filter(f => f.id !== fileEntry.id));
      }
    }
  }, []);

  const removeFile = useCallback((id: string) => {
    setEvidenceFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    return FileIcon;
  };

  const simulateProcessing = async () => {
    const steps = [
      { name: 'Validating submission', duration: 1000 },
      { name: 'Capturing URL metadata', duration: 1500 },
      { name: 'Processing evidence files', duration: 2000 },
      { name: 'Generating case manifest', duration: 1000 },
      { name: 'Creating cryptographic signature', duration: 800 },
      { name: 'Routing to authority', duration: 1200 }
    ];

    let currentProgress = 0;
    
    for (const step of steps) {
      setProcessingStep(step.name);
      await new Promise(resolve => setTimeout(resolve, step.duration));
      currentProgress += (100 / steps.length);
      setProgress(currentProgress);
    }
  };

  const onSubmit = async (data: SubmitForm) => {
    const newCaseId = generateCaseId();
    setCaseId(newCaseId);
    setStep('processing');
    setIsProcessing(true);
    setProgress(0);

    try {
      await simulateProcessing();
      setStep('success');
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error state
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTagToggle = (tag: EvidenceTag) => {
    const currentTags = watchedValues.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    setValue('tags', newTags);
  };

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal to-slate-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <Card variant="glass" className="p-8 text-center backdrop-blur-sm border border-slate-700/20">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-sentinel-green to-sentinel-blue animate-pulse-gentle">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              Processing Evidence
            </h2>
            
            <p className="text-slate-300 mb-6">
              Case ID: <span className="font-mono text-sentinel-gold">{caseId}</span>
            </p>

            <ProgressBar 
              value={progress} 
              className="mb-4"
              size="lg"
              showLabel
              label="Processing"
            />

            <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
              <Clock className="h-4 w-4 animate-spin" />
              <span>{processingStep}</span>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal to-slate-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl text-center"
        >
          <Card variant="glass" className="p-8 backdrop-blur-sm border border-slate-700/20">
            <div className="mb-8 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-sentinel-green to-sentinel-blue">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Evidence Submitted Successfully
            </h1>
            
            <p className="text-lg text-slate-300 mb-2">
              Your case has been created and assigned ID:
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-lg px-4 py-2 mb-8">
              <Hash className="h-5 w-5 text-sentinel-gold" />
              <span className="font-mono text-xl text-sentinel-gold">{caseId}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <Card className="p-4 bg-slate-800/30 border-slate-600">
                <div className="flex items-center space-x-3 text-white">
                  <Shield className="h-5 w-5 text-sentinel-green" />
                  <div className="text-left">
                    <div className="font-medium">Evidence Secured</div>
                    <div className="text-sm text-slate-400">SHA-256 hashed & signed</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-slate-800/30 border-slate-600">
                <div className="flex items-center space-x-3 text-white">
                  <Zap className="h-5 w-5 text-sentinel-blue" />
                  <div className="text-left">
                    <div className="font-medium">Authority Routed</div>
                    <div className="text-sm text-slate-400">{watchedValues.jurisdiction || 'Germany'}</div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Button size="lg" className="w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" />
                Download Evidence Package (PDF)
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-white border-slate-600 hover:bg-slate-800/50"
                onClick={() => window.location.href = `/status?id=${caseId}`}
              >
                <Eye className="mr-2 h-4 w-4" />
                Track Case Status
              </Button>
            </div>

            <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-600">
              <p className="text-sm text-slate-400">
                Your evidence package has been cryptographically signed and routed to the appropriate authority. 
                You will receive updates at key milestones if you provided contact information.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-slate-100 bg-noise">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Submit Evidence
            </h1>
            <p className="mt-2 text-slate-600">
              Report hate speech content with cryptographic verification and authority-grade packaging
            </p>
          </div>

          {/* Risk Level Indicator */}
          {(watchedValues.tags?.length || 0) > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className="border border-red-200 bg-red-50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <h3 className="font-medium text-red-900">Risk Assessment</h3>
                        <p className="text-sm text-red-700">
                          Classification: <span className="font-semibold capitalize">{riskLevel}</span> priority
                        </p>
                      </div>
                    </div>
                    <Badge variant="error" size="md">
                      {riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <Card variant="glass" className="backdrop-blur-sm">
              <CardHeader className="border-b border-slate-200/50">
                <h2 className="flex items-center text-lg font-semibold text-slate-900">
                  <FileText className="mr-2 h-5 w-5" />
                  Incident Details
                </h2>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <Input
                  label="Incident Title"
                  {...register('title')}
                  error={errors.title?.message}
                  placeholder="Brief, factual description of the incident"
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Platform
                    </label>
                    <select
                      {...register('platform')}
                      className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm focus:border-sentinel-green focus:outline-none focus:ring-2 focus:ring-sentinel-green/20 backdrop-blur-sm"
                    >
                      <option value="">Select platform</option>
                      {SUPPORTED_PLATFORMS.map(platform => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                    {errors.platform && <p className="mt-1 text-sm text-red-600">{errors.platform.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Jurisdiction
                    </label>
                    <select
                      {...register('jurisdiction')}
                      className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm focus:border-sentinel-green focus:outline-none focus:ring-2 focus:ring-sentinel-green/20 backdrop-blur-sm"
                    >
                      <option value="">Auto-detect</option>
                      {JURISDICTIONS.map(jurisdiction => (
                        <option key={jurisdiction} value={jurisdiction}>{jurisdiction}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Input
                    label="Public Link (Optional)"
                    {...register('url')}
                    error={errors.url?.message}
                    placeholder="https://example.com/post/123"
                    icon={<LinkIcon className="h-4 w-4" />}
                  />
                  
                  {urlMetadata && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-start space-x-3">
                        <Globe className="h-4 w-4 text-slate-500 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-900 truncate">
                            {urlMetadata.title || 'Content Preview'}
                          </div>
                          <div className="text-xs text-slate-500">
                            {urlMetadata.author && `By ${urlMetadata.author} • `}
                            {urlMetadata.platform} • {extractDomain(watchedValues.url || '')}
                          </div>
                        </div>
                        <Badge variant="info" size="sm">Detected</Badge>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="Date Observed"
                    type="date"
                    {...register('dateObserved')}
                    error={errors.dateObserved?.message}
                    icon={<Calendar className="h-4 w-4" />}
                  />

                  <Input
                    label="Time Observed (Local)"
                    type="time"
                    {...register('timeObserved')}
                    error={errors.timeObserved?.message}
                    helperText="Will be converted to UTC for records"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={5}
                    className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-sentinel-green focus:outline-none focus:ring-2 focus:ring-sentinel-green/20 backdrop-blur-sm resize-none"
                    placeholder="Provide a detailed, factual description of the hate speech content and context (up to 2000 characters)"
                  />
                  <div className="mt-1 flex justify-between">
                    {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                    <p className={`text-sm transition-colors ${
                      (watchedValues.description?.length || 0) > 1800 ? 'text-red-500' : 'text-slate-500'
                    }`}>
                      {watchedValues.description?.length || 0}/2000
                    </p>
                  </div>
                </div>

                <Input
                  label="Location (Optional)"
                  {...register('location')}
                  placeholder="City, Country (if relevant to the incident)"
                  icon={<MapPin className="h-4 w-4" />}
                  helperText="Only include if location context is important for the case"
                />
              </CardContent>
            </Card>

            {/* Evidence Classification */}
            <Card variant="glass" className="backdrop-blur-sm">
              <CardHeader className="border-b border-slate-200/50">
                <h2 className="flex items-center text-lg font-semibold text-slate-900">
                  <Tag className="mr-2 h-5 w-5" />
                  Content Classification
                </h2>
              </CardHeader>
              <CardContent className="pt-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Evidence Tags (Select all that apply)
                </label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {EVIDENCE_TAGS.map(tag => (
                    <label 
                      key={tag} 
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                        watchedValues.tags?.includes(tag)
                          ? 'bg-gradient-to-r from-sentinel-green/5 to-sentinel-blue/5 border-sentinel-green'
                          : 'bg-white/60 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={watchedValues.tags?.includes(tag) || false}
                        onChange={() => handleTagToggle(tag)}
                        className="rounded border-slate-300 text-sentinel-green focus:ring-sentinel-green/20"
                      />
                      <span className="text-sm text-slate-700 font-medium">{tag}</span>
                    </label>
                  ))}
                </div>
                {errors.tags && <p className="mt-3 text-sm text-red-600">{errors.tags.message}</p>}
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card variant="glass" className="backdrop-blur-sm">
              <CardHeader className="border-b border-slate-200/50">
                <h2 className="flex items-center text-lg font-semibold text-slate-900">
                  <Upload className="mr-2 h-5 w-5" />
                  Evidence Files (Optional)
                </h2>
              </CardHeader>
              <CardContent className="pt-6">
                <div 
                  className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-sentinel-green hover:bg-sentinel-green/5 transition-all cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-sentinel-green transition-colors mb-4" />
                  <p className="text-slate-600 mb-2 group-hover:text-slate-900 transition-colors">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-slate-500">
                    Images, videos, audio, PDF • Max 2GB per file • SHA-256 hashed
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,audio/*,.pdf"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                </div>

                <AnimatePresence>
                  {evidenceFiles.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 space-y-3"
                    >
                      <h3 className="font-medium text-slate-900 flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        Evidence Files ({evidenceFiles.length})
                      </h3>
                      
                      {evidenceFiles.map(file => {
                        const Icon = getFileIcon(file.file.type);
                        return (
                          <motion.div 
                            key={file.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-slate-200 backdrop-blur-sm"
                          >
                            <div className="flex items-center space-x-4">
                              <Icon className="h-6 w-6 text-slate-500" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-900 truncate">{file.file.name}</p>
                                <div className="flex items-center space-x-4 text-sm text-slate-500">
                                  <span>{formatFileSize(file.file.size)}</span>
                                  {file.processing ? (
                                    <div className="flex items-center space-x-1">
                                      <div className="h-2 w-2 rounded-full bg-sentinel-gold animate-pulse-gentle" />
                                      <span>Processing...</span>
                                    </div>
                                  ) : file.hash ? (
                                    <div className="flex items-center space-x-1">
                                      <Hash className="h-3 w-3" />
                                      <span className="font-mono">{file.hash.slice(0, 8)}...</span>
                                      <Badge variant="success" size="sm">Verified</Badge>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Reporter Information */}
            <Card variant="glass" className="backdrop-blur-sm">
              <CardHeader className="border-b border-slate-200/50">
                <h2 className="flex items-center text-lg font-semibold text-slate-900">
                  <User className="mr-2 h-5 w-5" />
                  Reporter Information
                </h2>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <Lock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register('anonymous')}
                        className="rounded border-slate-300 text-sentinel-green focus:ring-sentinel-green/20"
                      />
                      <label className="text-sm font-medium text-amber-900">
                        Report anonymously
                      </label>
                    </div>
                    <p className="text-xs text-amber-700 mt-1">
                      Anonymous reports provide additional privacy protection but limit follow-up capabilities
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {!watchedValues.anonymous && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Input
                        label="Contact Email (Optional)"
                        type="email"
                        {...register('reporterContact')}
                        error={errors.reporterContact?.message}
                        placeholder="your@email.com"
                        helperText="Only used for case updates. Never shared with authorities without explicit consent."
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Consent */}
            <Card variant="glass" className="backdrop-blur-sm border-slate-300">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className="mt-1 rounded border-slate-300 text-sentinel-green focus:ring-sentinel-green/20"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-slate-700 block">
                      I confirm this submission is accurate to my knowledge and consent to its secure, 
                      cryptographically-signed transfer to the relevant law enforcement authorities.
                    </label>
                    <p className="text-xs text-slate-500 mt-2">
                      By submitting, you agree to our evidence handling protocols and jurisdiction-specific routing procedures.
                    </p>
                    {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                size="lg" 
                className="min-w-[280px] bg-gradient-to-r from-sentinel-green via-sentinel-blue to-sentinel-blue text-white hover:opacity-90 transition-opacity"
                disabled={evidenceFiles.some(f => f.processing)}
              >
                <Shield className="mr-2 h-5 w-5" />
                Submit Evidence Package
              </Button>
            </div>

            {/* Processing Note */}
            {evidenceFiles.some(f => f.processing) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-slate-500"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-sentinel-gold animate-pulse-gentle" />
                  <span>Files are being processed and hashed before submission</span>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}