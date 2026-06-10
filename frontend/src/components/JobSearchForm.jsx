import React, { useState } from 'react';
import { Upload, MapPin, Loader } from 'lucide-react';
import { searchJobs } from '../api/jobs';

const JobSearchForm = ({ onSearchComplete, onSearchStart }) => {
  const [resume, setResume] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      setError('');
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !location) {
      setError('Please upload a resume and enter a location');
      return;
    }
    setLoading(true);
    setError('');
    onSearchStart?.();
    try {
      const data = await searchJobs(resume, location);
      onSearchComplete?.(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to search jobs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-3">Upload Your Resume</label>
        <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:opacity-80 transition" onClick={() => document.getElementById('resume-input').click()}>
          <input id="resume-input" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
          {resume ? (
            <div className="flex items-center justify-center gap-3">
              <Upload size={24} style={{ color: 'var(--accent-primary)' }} />
              <p style={{ color: 'var(--text-primary)' }} className="font-medium">{resume.name}</p>
            </div>
          ) : (
            <div>
              <Upload size={32} style={{ color: 'var(--accent-primary)' }} className="mx-auto mb-3" />
              <p style={{ color: 'var(--text-primary)' }} className="font-medium">Click to upload or drag and drop</p>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm">PDF files only (Max 10MB)</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-3">Job Location</label>
        <div className="relative">
          <MapPin size={20} style={{ color: 'var(--text-secondary)' }} className="absolute left-4 top-3.5" />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Bangalore, India" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none" />
        </div>
      </div>

      {error && <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--error)', color: 'var(--error)' }} className="p-4 rounded-lg border text-sm">{error}</div>}

      <button type="submit" disabled={loading} style={{ backgroundColor: 'var(--accent-primary)', color: '#ffffff' }} className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50">
        {loading ? (<><Loader size={20} className="animate-spin" />Searching...</>) : 'Search Jobs'}
      </button>
    </form>
  );
};

export default JobSearchForm;
