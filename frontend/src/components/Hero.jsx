import React from 'react';
import { Sparkles, Target, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)' }} className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
          <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium">AI-Powered Job Matching</span>
        </div>
        <h1 style={{ color: 'var(--text-primary)' }} className="text-4xl lg:text-5xl font-bold mt-6 mb-4">Find Your Perfect Role with AI</h1>
        <p style={{ color: 'var(--text-secondary)' }} className="text-lg max-w-2xl mx-auto mb-8">Upload your resume, let our AI analyze your skills, and discover job opportunities perfectly matched to your profile.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[{ icon: Target, title: 'Smart Matching', desc: 'AI analyzes your resume to predict your ideal role' }, { icon: Zap, title: 'Real-Time Jobs', desc: 'Live job listings from Indeed India' }, { icon: Sparkles, title: 'Personalized', desc: 'Recommendations based on your skills' }].map((f, i) => (
            <div key={i} style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }} className="border rounded-lg p-6">
              <f.icon size={32} style={{ color: 'var(--accent-primary)' }} className="mx-auto mb-4" />
              <h3 style={{ color: 'var(--text-primary)' }} className="font-semibold mb-2">{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
