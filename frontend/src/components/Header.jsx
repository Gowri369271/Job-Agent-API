import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useState } from 'react';

const Header = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div style={{ backgroundColor: 'var(--accent-primary)' }} className="w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <h1 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold hidden sm:block">JobAgent</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-70 transition">Home</a>
            <a href="#features" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-70 transition">Features</a>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }} className="p-2 rounded-lg hover:opacity-80 transition">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2" style={{ color: 'var(--text-primary)' }}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
