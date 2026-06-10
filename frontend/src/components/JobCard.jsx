import React from 'react';
import { ExternalLink, MapPin, DollarSign, Building } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border rounded-lg p-6 hover:shadow-lg transition hover:translate-y-[-2px]">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <h3 style={{ color: 'var(--text-primary)' }} className="font-bold text-lg">{job.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Building size={16} style={{ color: 'var(--text-secondary)' }} />
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">{job.company}</p>
          </div>
        </div>
        <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }} className="p-2 hover:opacity-70 transition">
          <ExternalLink size={20} />
        </a>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ color: 'var(--text-secondary)' }} className="text-sm">{job.location}</span>
        </div>
        {job.salary && job.salary !== 'Not Specified' && (
          <div className="flex items-center gap-3">
            <DollarSign size={16} style={{ color: 'var(--success)' }} />
            <span style={{ color: 'var(--text-secondary)' }} className="text-sm">{job.salary}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <span style={{ color: 'var(--text-tertiary)' }} className="text-xs font-medium">{job.source}</span>
        <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'var(--accent-primary)', color: '#ffffff' }} className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
          View Job
        </a>
      </div>
    </div>
  );
};

export default JobCard;
