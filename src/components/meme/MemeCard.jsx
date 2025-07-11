import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, Clock } from 'lucide-react';
import Card from '../ui/Card';
import { useMemeStore } from '../../store/memeStore';
import { formatDistanceToNow } from 'date-fns';
import { useUserStore } from '../../store/userStore';


const MemeCard = ({ meme }) => {
  const { likeMeme, unlikeMeme } = useMemeStore();
  const { currentUser } = useUserStore();
  const users = JSON.parse(localStorage.getItem('memeverse_users')) || [];
  const creatorUser = users.find(u => u.username === meme.creator);

  const handleLikeToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    meme.isLiked ? unlikeMeme(meme.id) : likeMeme(meme.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Share meme: ${meme.title}`);
  };


  return (
    <Card className="h-full cursor-pointer group transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-gray-300">
      <div className="p-4">
        {/* Creator Info */}
        <div className="flex items-center space-x-2 mb-3">
          <Link to={creatorUser ? `/profile/${creatorUser.username}` : '#'} className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition">
            {creatorUser && creatorUser.avatar ? (
              <img src={creatorUser.avatar} alt={creatorUser.username} className="w-10 h-10 object-cover rounded-full" />
            ) : (
              <span className="text-gray-500 uppercase font-bold text-lg">{meme.creator?.charAt(0) || 'U'}</span>
            )}
          </Link>
          <div>
            <Link to={creatorUser ? `/profile/${creatorUser.username}` : '#'} className="font-medium text-gray-900 hover:text-blue-600 transition">
              {meme.creator || 'Unknown'}
            </Link>
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              <span>{meme.createdAt ? formatDistanceToNow(new Date(meme.createdAt)) : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Meme Image */}
        <Link to={`/meme/${meme.id}`} className="block relative rounded-lg overflow-hidden">
          <motion.img
            src={meme.imageUrl || '/placeholder.png'}
            alt={meme.title || 'Meme Image'}
            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition"></div>
        </Link>

        {/* Meme Title */}
        <h3 className="font-semibold text-lg text-gray-900 mt-3 group-hover:text-blue-600 transition duration-200">
          {meme.title || 'Untitled Meme'}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-3">
          {meme.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium transition-all duration-200 group-hover:bg-gray-300"
            >
              #{tag}
            </span>
          )) || <span className="text-gray-400 text-xs">No tags</span>}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <motion.button
              className={`flex items-center space-x-1 ${
                meme.isLiked ? 'text-red-500' : 'text-gray-500'
              } hover:scale-110 transition`}
              whileTap={{ scale: 0.9 }}
              onClick={handleLikeToggle}
            >
              <Heart size={18} className={meme.isLiked ? 'fill-red-500' : ''} />
              <span className="text-sm">{meme.likes || 0}</span>
            </motion.button>
            {currentUser?.username === meme.creator && (
              <button
                className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert('Edit meme functionality coming soon!');
                }}
              >
                Edit
              </button>
            )}
          </div>
          <motion.button
            className="text-gray-500 hover:text-gray-700 transition-opacity duration-300 opacity-80 hover:opacity-100"
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
          >
            <Share2 size={18} />
          </motion.button>
        </div>
      </div>
    </Card>
  );
};

export default MemeCard;
