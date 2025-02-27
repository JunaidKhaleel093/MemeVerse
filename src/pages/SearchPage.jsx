import React, { useState, useEffect } from 'react';
import { Search, Tag, X } from 'lucide-react';
import { useMemeStore } from '../store/memeStore';
import MemeGrid from '../components/meme/MemeGrid';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';

const SearchPage = () => {
  const { memes, filteredMemes, isLoading, searchQuery, activeTag, searchMemes, filterByTag, fetchMemes } = useMemeStore();
  const [query, setQuery] = useState(searchQuery);
  
  useEffect(() => {
    if (memes.length === 0) {
      fetchMemes();
    }
  }, [fetchMemes, memes.length]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    searchMemes(query);
  };
  
  // Extract all unique tags from memes
  const allTags = Array.from(new Set(memes.flatMap(meme => meme.tags))).sort();
  
  if (isLoading && memes.length === 0) {
    return <Loader fullScreen text="Loading memes..." />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <div className="flex items-center mb-8">
        <Search size={28} className="text-purple-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Search Memes</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="mb-6">
          <Input
            type="text"
            placeholder="Search by title or tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            icon={<Search size={18} />}
          />
        </form>
        
        <div>
          <div className="flex items-center mb-3">
            <Tag size={18} className="text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Popular Tags</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {activeTag && (
              <button
                className="flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                onClick={() => filterByTag(null)}
              >
                #{activeTag}
                <X size={14} className="ml-1" />
              </button>
            )}
            
            {allTags.map((tag) => (
              tag !== activeTag && (
                <button
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  onClick={() => filterByTag(tag)}
                >
                  #{tag}
                </button>
              )
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredMemes.length} {filteredMemes.length === 1 ? 'result' : 'results'} found
          {searchQuery && ` for "${searchQuery}"`}
          {activeTag && ` with tag #${activeTag}`}
        </p>
      </div>
      
      <MemeGrid memes={filteredMemes} columns={3} />
    </div>
  );
};

export default SearchPage;
