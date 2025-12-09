'use client';

import { useState } from 'react';
import { LANGUAGES, POPULAR_SUBJECTS } from '@/lib/constants';

/**
 * Filter panel component for book filtering
 * @param {Object} props - Component props
 * @param {Function} props.onFilterChange - Filter change callback
 * @param {Object} props.activeFilters - Currently active filters
 * @returns {JSX.Element} Filter panel component
 */
export default function FilterPanel({ onFilterChange, activeFilters = {} }) {
  const [selectedLanguages, setSelectedLanguages] = useState(activeFilters.languages || []);
  const [selectedSubjects, setSelectedSubjects] = useState(activeFilters.subjects || []);
  const [showAdvanced, setShowAdvanced] = useState(false);

  /**
   * Toggles language selection
   * @param {string} langCode - Language code
   */
  const toggleLanguage = (langCode) => {
    const newLanguages = selectedLanguages.includes(langCode)
      ? selectedLanguages.filter(lang => lang !== langCode)
      : [...selectedLanguages, langCode];
    
    setSelectedLanguages(newLanguages);
    onFilterChange({ languages: newLanguages });
  };

  /**
   * Toggles subject selection
   * @param {string} subject - Subject name
   */
  const toggleSubject = (subject) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter(sub => sub !== subject)
      : [...selectedSubjects, subject];
    
    setSelectedSubjects(newSubjects);
    onFilterChange({ subjects: newSubjects });
  };

  /**
   * Clears all filters
   */
  const clearFilters = () => {
    setSelectedLanguages([]);
    setSelectedSubjects([]);
    onFilterChange({ languages: [], subjects: [] });
  };

  /**
   * Handles sort change
   * @param {Event} e - Select change event
   */
  const handleSortChange = (e) => {
    onFilterChange({ sort: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 md:mb-0">Filters</h3>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
          </button>
          
          {(selectedLanguages.length > 0 || selectedSubjects.length > 0) && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Sort options */}
      <div className="mb-4">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
          Sort by
        </label>
        <select
          id="sort"
          onChange={handleSortChange}
          defaultValue={activeFilters.sort || 'popular'}
          className="w-full md:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="popular">Most Popular</option>
          <option value="title">Title A-Z</option>
          <option value="newest">Newest First</option>
          <option value="downloads">Most Downloads</option>
        </select>
      </div>

      {/* Languages filter */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Languages</h4>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => toggleLanguage(lang.code)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedLanguages.includes(lang.code)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Popular subjects */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Popular Subjects</h4>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SUBJECTS.slice(0, 8).map((subject) => (
            <button
              key={subject}
              onClick={() => toggleSubject(subject)}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedSubjects.includes(subject)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced filters (collapsible) */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium text-gray-700 mb-2">Advanced Filters</h4>
          
          {/* More subjects */}
          <div className="mb-4">
            <h5 className="text-sm text-gray-600 mb-2">More Subjects</h5>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SUBJECTS.slice(8).map((subject) => (
                <button
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={`px-3 py-1 rounded-lg text-xs ${
                    selectedSubjects.includes(subject)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Copyright filter */}
          <div className="mb-4">
            <h5 className="text-sm text-gray-600 mb-2">Copyright Status</h5>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="copyright"
                  value="all"
                  defaultChecked
                  onChange={() => onFilterChange({ copyright: null })}
                  className="mr-2"
                />
                <span className="text-sm">All</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="copyright"
                  value="copyrighted"
                  onChange={() => onFilterChange({ copyright: true })}
                  className="mr-2"
                />
                <span className="text-sm">Copyrighted</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="copyright"
                  value="public"
                  onChange={() => onFilterChange({ copyright: false })}
                  className="mr-2"
                />
                <span className="text-sm">Public Domain</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}