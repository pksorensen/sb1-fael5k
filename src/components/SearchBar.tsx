'use client';

import { Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

interface Suggestion {
  tekst: string;
  forslagstekst: string;
  caretpos: number;
  data: {
    id: string;
    adresseringstekst: string;
  };
}

export default function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value.trim() || value.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q: value,
          type: 'adresse',
          caretpos: value.length.toString(),
          supplerendebynavn: 'true',
          stormodtagerpostnumre: 'true',
          multilinje: 'true',
          fuzzy: ''
        });

        const response = await fetch(`https://dawa.aws.dk/autocomplete?${params}`);
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 150);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    router.push(`/address/${encodedAddress}`);
    setValue('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSearch(suggestions[selectedIndex].forslagstekst);
        } else if (value.trim()) {
          handleSearch(value.trim());
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    handleSearch(suggestion.forslagstekst);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.trim() && setShowSuggestions(true)}
          placeholder="Enter a Danish address..."
          className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   transition-all duration-200 pr-12 bg-white shadow-sm"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto z-50">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.data.id}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-3 hover:bg-blue-50 
                       transition-colors duration-150 border-b border-gray-100 
                       last:border-0 ${selectedIndex === index ? 'bg-blue-50' : ''}`}
            >
              <p className="text-gray-800">{suggestion.forslagstekst}</p>
              {suggestion.data.adresseringstekst && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {suggestion.data.adresseringstekst}
                </p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}