import React, { useState } from 'react';
import { Search, FileText, Clock, CheckCircle, AlertTriangle, Download, Eye, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

const mockCase = {
  id: 'SA-2025-0001',
  title: 'Antisemitic threats on social media platform',
  status: 'under_review',
  createdAt: '2025-01-16T10:30:00Z',
  updatedAt: '2025-01-16T14:45:00Z',
  platform: 'Twitter/X',
  jurisdiction: 'Germany',
  priority: 'high',
  timeline: [
    {
      id: 1,
      action: 'Case created',
      timestamp: '2025-01-16T10:30:00Z',
      details: 'Evidence submitted and case ID assigned'
    },
    {
      id: 2, 
      action: 'Evidence processed',
      timestamp: '2025-01-16T11:15:00Z',
      details: 'URL snapshot captured, content hashed, metadata extracted'
    },
    {
      id: 3,
      action: 'Content classified', 
      timestamp: '2025-01-16T12:00:00Z',
      details: 'High priority hate speech detected, multiple violation categories identified'
    },
    {
      id: 4,
      action: 'Authority routing initiated',
      timestamp: '2025-01-16T14:45:00Z',
      details: 'Case routed to German Federal Criminal Police Office (BKA)'
    }
  ]
};

const statusConfig = {
  submitted: { 
    label: 'Submitted', 
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    icon: FileText 
  },
  processing: { 
    label: 'Processing', 
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    icon: Clock 
  },
  under_review: { 
    label: 'Under Review', 
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    icon: Eye 
  },
  routed: { 
    label: 'Routed to Authority', 
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    icon: Shield 
  },
  closed: { 
    label: 'Closed', 
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    icon: CheckCircle 
  }
};

export function Status() {
  const [caseId, setCaseId] = useState('');
  const [searchedCase, setSearchedCase] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!caseId.trim()) {
      setError('Please enter a case ID');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (caseId.toUpperCase() === 'SA-2025-0001') {
      setSearchedCase(mockCase);
    } else {
      setError('Case not found. Please check the case ID and try again.');
      setSearchedCase(null);
    }
    
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Case Status Lookup
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Enter your case ID to check the status of your evidence submission
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter case ID (e.g., SA-2025-0001)"
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  error={error}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} loading={isLoading}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo hint */}
        {!searchedCase && (
          <Card className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">Demo Mode</h3>
                  <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                    Try searching for case ID <code className="px-1 py-0.5 bg-blue-200 rounded text-xs dark:bg-blue-800">SA-2025-0001</code> to see a sample case status.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Case Details */}
        {searchedCase && (
          <div className="space-y-6">
            {/* Case Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Case {searchedCase.id}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {React.createElement(statusConfig[searchedCase.status as keyof typeof statusConfig].icon, { 
                      className: "h-4 w-4" 
                    })}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[searchedCase.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[searchedCase.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white mb-3">Case Information</h3>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-slate-500 dark:text-slate-400">Title:</dt>
                        <dd className="font-medium text-slate-900 dark:text-white">{searchedCase.title}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 dark:text-slate-400">Platform:</dt>
                        <dd className="text-slate-900 dark:text-white">{searchedCase.platform}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 dark:text-slate-400">Jurisdiction:</dt>
                        <dd className="text-slate-900 dark:text-white">{searchedCase.jurisdiction}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 dark:text-slate-400">Priority:</dt>
                        <dd className={`font-medium capitalize ${getPriorityColor(searchedCase.priority)}`}>
                          {searchedCase.priority}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white mb-3">Timeline</h3>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-slate-500 dark:text-slate-400">Created:</dt>
                        <dd className="text-slate-900 dark:text-white">{formatDate(searchedCase.createdAt)}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 dark:text-slate-400">Last Updated:</dt>
                        <dd className="text-slate-900 dark:text-white">{formatDate(searchedCase.updatedAt)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View Manifest
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Case Timeline */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Case Timeline
                </h2>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  <div className="space-y-6">
                    {searchedCase.timeline.map((event: any, index: number) => (
                      <div key={event.id} className="relative flex items-start space-x-4">
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                          <div className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-slate-900 dark:text-white">
                              {event.action}
                            </h3>
                            <time className="text-sm text-slate-500 dark:text-slate-400">
                              {formatDate(event.timestamp)}
                            </time>
                          </div>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            {event.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            {searchedCase.status === 'under_review' && (
              <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="mt-0.5 h-5 w-5 text-amber-600" />
                    <div>
                      <h3 className="font-medium text-amber-900 dark:text-amber-100">Next Steps</h3>
                      <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                        Your case is currently under review by our trust & safety team. We're preparing the evidence package 
                        for submission to the German Federal Criminal Police Office (BKA). You'll receive an update within 24 hours.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="font-medium text-slate-900 dark:text-white mb-3">Need Help?</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white text-sm">Can't find your case?</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Make sure you're using the complete case ID including the "SA-" prefix.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white text-sm">Anonymous submissions</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Anonymous cases show limited information for privacy protection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}