import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
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
  FileIcon,
  Globe,
  Calendar,
  Tag,
  MapPin,
  User,
  Lock
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { SUPPORTED_PLATFORMS, EVIDENCE_TAGS, type Platform, type EvidenceTag } from '../types';
import { generateCaseId, hashContent, formatFileSize, isValidUrl, extractDomain } from '../lib/utils';

const submitSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title too long'),
  platform: z.enum(SUPPORTED_PLATFORMS),
  url: z.string().optional().refine((val) => !val || isValidUrl(val), 'Please enter a valid URL'),
  dateObserved: z.string().min(1, 'Date is required'),
  timeObserved: z.string().min(1, 'Time is required'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description too long'),
  location: z.string().optional(),
  tags: z.array(z.enum(EVIDENCE_TAGS)).min(1, 'Please select at least one tag'),
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
}

export function Submit() {
  const [step, setStep] = useState<'form' | 'upload' | 'review' | 'success'>('form');
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [caseId, setCaseId] = useState('');
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

  const handleFileSelect = async (files: FileList) => {
    setIsUploading(true);
    const newFiles: EvidenceFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      const hash = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashString = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      let preview: string | undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      newFiles.push({
        id: crypto.randomUUID(),
        file,
        hash: hashString,
        preview
      });
    }

    setEvidenceFiles(prev => [...prev, ...newFiles]);
    setIsUploading(false);
  };

  const removeFile = (id: string) => {
    setEvidenceFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    return FileIcon;
  };

  const onSubmit = async (data: SubmitForm) => {
    const newCaseId = generateCaseId();
    setCaseId(newCaseId);
    
    // Simulate submission process
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    setStep('success');
  };

  const handleTagToggle = (tag: EvidenceTag) => {
    const currentTags = watchedValues.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    setValue('tags', newTags);
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Evidence Submitted Successfully
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Your case has been created and assigned ID: <strong className="font-mono">{caseId}</strong>
          </p>
          <div className="space-y-4">
            <Button size="lg">
              Download Receipt (PDF)
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = `/status?id=${caseId}`}>
              Track Case Status
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Submit Evidence
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Report hate speech content with cryptographic verification
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-4">
            {['Details', 'Evidence', 'Review'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  index === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">{stepName}</span>
                {index < 2 && <div className="ml-4 h-0.5 w-8 bg-slate-200 dark:bg-slate-700"></div>}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <h2 className="flex items-center text-lg font-semibold text-slate-900 dark:text-white">
                <FileText className="mr-2 h-5 w-5" />
                Incident Details
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                label="Incident Title"
                {...register('title')}
                error={errors.title?.message}
                placeholder="Brief description of the incident"
              />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Platform
                  </label>
                  <select
                    {...register('platform')}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select platform</option>
                    {SUPPORTED_PLATFORMS.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                  {errors.platform && <p className="mt-1 text-sm text-red-600">{errors.platform.message}</p>}
                </div>

                <Input
                  label="Public Link (Optional)"
                  {...register('url')}
                  error={errors.url?.message}
                  placeholder="https://example.com/post/123"
                  icon={<LinkIcon className="h-4 w-4" />}
                />
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
                  label="Time Observed (UTC)"
                  type="time"
                  {...register('timeObserved')}
                  error={errors.timeObserved?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="Detailed description of the hate speech content (up to 2000 characters)"
                />
                <div className="mt-1 flex justify-between">
                  {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                  <p className="text-sm text-slate-500">{watchedValues.description?.length || 0}/2000</p>
                </div>
              </div>

              <Input
                label="Location (Optional)"
                {...register('location')}
                placeholder="City, Country"
                icon={<MapPin className="h-4 w-4" />}
              />
            </CardContent>
          </Card>

          {/* Evidence Classification */}
          <Card>
            <CardHeader>
              <h2 className="flex items-center text-lg font-semibold text-slate-900 dark:text-white">
                <Tag className="mr-2 h-5 w-5" />
                Content Classification
              </h2>
            </CardHeader>
            <CardContent>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Evidence Tags (Select all that apply)
              </label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {EVIDENCE_TAGS.map(tag => (
                  <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={watchedValues.tags?.includes(tag) || false}
                      onChange={() => handleTagToggle(tag)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{tag}</span>
                  </label>
                ))}
              </div>
              {errors.tags && <p className="mt-2 text-sm text-red-600">{errors.tags.message}</p>}
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <h2 className="flex items-center text-lg font-semibold text-slate-900 dark:text-white">
                <Upload className="mr-2 h-5 w-5" />
                Evidence Files (Optional)
              </h2>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer dark:border-slate-600"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-slate-500">
                  Images, videos, audio, PDF (Max 2GB per file)
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

              {evidenceFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-medium text-slate-900 dark:text-white">Uploaded Files</h3>
                  {evidenceFiles.map(file => {
                    const Icon = getFileIcon(file.file.type);
                    return (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg dark:bg-slate-800">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-slate-500" />
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{file.file.name}</p>
                            <p className="text-sm text-slate-500">
                              {formatFileSize(file.file.size)} • Hash: {file.hash.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reporter Information */}
          <Card>
            <CardHeader>
              <h2 className="flex items-center text-lg font-semibold text-slate-900 dark:text-white">
                <User className="mr-2 h-5 w-5" />
                Reporter Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('anonymous')}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Report anonymously
                </label>
              </div>

              {!watchedValues.anonymous && (
                <Input
                  label="Contact Email (Optional)"
                  type="email"
                  {...register('reporterContact')}
                  error={errors.reporterContact?.message}
                  placeholder="your@email.com"
                  helperText="Only used for case updates. Never shared with authorities without consent."
                />
              )}
            </CardContent>
          </Card>

          {/* Consent */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="mt-1 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    I confirm this submission is accurate to my knowledge and consent to its secure transfer to the relevant authorities.
                  </label>
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
              loading={isUploading}
              className="min-w-[200px]"
            >
              <Shield className="mr-2 h-5 w-5" />
              {isUploading ? 'Processing...' : 'Submit Evidence'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}