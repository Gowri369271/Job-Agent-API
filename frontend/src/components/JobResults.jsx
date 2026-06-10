import React from 'react';
import JobCard from './JobCard';
import { AlertCircle, CheckCircle } from 'lucide-react';

const JobResults = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-4 border-opacity-30 rounded-full animate-spin" style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }}></div>
        <p style={{ color: 'var(--text-secondary)' }} className="mt-4">Analyzing resume and finding matching jobs...</p>
      </div>
    );
  }

  if (!results) return null;

  if (results.count === 0) {
    return (
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border rounded-lg p-8 text-center">
        <AlertCircle size={48} style={{ color: 'var(--warning)' }} className="mx-auto mb-4" />
        <h3 style={{ color: 'var(--text-primary)' }} className="text-lg font-semibold mb-2">No Jobs Found</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your location or resume details</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CheckCircle size={24} style={{ color: 'var(--success)' }} />
        <div>
          <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold">Predicted Role: <span style={{ color: 'var(--accent-primary)' }}>{results.predicted_role}</span></h2>
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm">Found {results.count} matching jobs</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.jobs.map((job, index) => (<JobCard key={index} job={job} />))}
      </div>
    </div>
  );
};

export default JobResults;
