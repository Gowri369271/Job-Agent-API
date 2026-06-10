import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import JobSearchForm from '../components/JobSearchForm';
import JobResults from '../components/JobResults';

const Home = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} className="min-h-screen">
      <Header />
      {!searchResults ? (
        <>
          <Hero />
          <div className="py-16 lg:py-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border rounded-xl p-8 lg:p-10">
                <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold mb-2">Start Your Job Search</h2>
                <p style={{ color: 'var(--text-secondary)' }} className="mb-8">Upload your resume and tell us where you want to work</p>
                <JobSearchForm onSearchComplete={(data) => { setSearchResults(data); setIsSearching(false); }} onSearchStart={() => setIsSearching(true)} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => setSearchResults(null)} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent-primary)', borderColor: 'var(--border-color)' }} className="px-4 py-2 border rounded-lg hover:opacity-80 transition mb-8">
              ← New Search
            </button>
            <JobResults results={searchResults} loading={isSearching} />
          </div>
        </div>
      )}

      <footer style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }} className="border-t mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 JobAgent. All rights reserved. | Jobs from Indeed India</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
