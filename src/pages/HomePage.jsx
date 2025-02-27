import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Clock } from 'lucide-react';
import { useMemeStore } from '../store/memeStore';
import MemeGrid from '../components/meme/MemeGrid';
import Loader from '../components/ui/Loader';

const HomePage = () => {
  const { memes, trendingMemes, isLoading, fetchMemes } = useMemeStore();
  
  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);
  
  if (isLoading && memes.length === 0) {
    return <Loader fullScreen text="Loading memes..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-14 bg-gradient-to-r from-[#bebebe] via-[#dcdcdc] to-[#f8f8ff]">
      
     {/* Hero Section with Background Video */}
<motion.div 
  className="relative rounded-xl text-white p-8 mb-12 overflow-hidden"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Background Video */}
  <video 
    autoPlay 
    loop 
    muted 
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src="https://giffiles.alphacoders.com/223/thumb-440-223139.mp4" type="video/mp4" />
    </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50 rounded-xl"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Flame size={64} className="mx-auto mb-4" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome to MemeVerse - Where Anime & Memes Collide!
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl opacity-90 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Enter the otaku meme realm where shonen battles, slice-of-life laughs, and anime legends unite!
          </motion.p>
        </div>
      </motion.div>
      
      {/* Trending Memes Section */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <TrendingUp size={24} className="text-red-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
        </div>
        <MemeGrid memes={trendingMemes} columns={3} />
      </section>
      
      {/* Recent Memes Section */}
      <section>
        <div className="flex items-center mb-6">
          <Clock size={24} className="text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Recent Uploads</h2>
        </div>
        <MemeGrid memes={memes} columns={3} variant="default" />
      </section>
    </div>
  );
};

export default HomePage;
