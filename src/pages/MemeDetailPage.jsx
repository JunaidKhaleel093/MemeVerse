import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, ArrowLeft, Send, User } from 'lucide-react';
import { useMemeStore } from '../store/memeStore';
import { useUserStore } from '../store/userStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import { formatDistanceToNow } from '../utils/dateUtils';

const MemeDetailPage = () => {
  const { id } = useParams();
  const { currentMeme, isLoading, fetchMemeById, likeMeme, unlikeMeme, addComment } = useMemeStore();
  const { isAuthenticated, currentUser } = useUserStore();
  const [commentText, setCommentText] = useState('');
  
  const handleLikeToggle = () => {
    if (!currentMeme) return;

    if (currentMeme.isLiked) {
      unlikeMeme(currentMeme.id);
    } else {
      likeMeme(currentMeme.id);
    }
  };

  const handleShare = () => {
    alert(`Share meme: ${currentMeme?.title}`);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!currentMeme || !commentText.trim() || !isAuthenticated) return;

    addComment(currentMeme.id, {
      user: currentUser?.username || 'Anonymous',
      text: commentText.trim(),
    });

    setCommentText('');
  };

  if (isLoading || !currentMeme) {
    return <Loader fullScreen text="Loading meme..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
        <ArrowLeft size={20} className="mr-1" />
        <span>Back to Home</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{currentMeme.title}</h1>

              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 uppercase font-bold">
                  {currentMeme.creator.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{currentMeme.creator}</p>
                  <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(currentMeme.createdAt))}</p>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden mb-6">
                <img src={currentMeme.imageUrl} alt={currentMeme.title} className="w-full h-auto" />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {currentMeme.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/search?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-b py-4">
                <motion.button
                  className={`flex items-center space-x-2 ${currentMeme.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLikeToggle}
                >
                  <Heart size={20} className={currentMeme.isLiked ? 'fill-red-500' : ''} />
                  <span>{currentMeme.likes} likes</span>
                </motion.button>

                <div className="flex items-center space-x-2 text-gray-500">
                  <MessageCircle size={20} />
                  <span>{currentMeme.comments.length} comments</span>
                </div>

                <motion.button
                  className="text-gray-500 flex items-center space-x-2"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                >
                  <Share2 size={20} />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Comments</h2>

              {isAuthenticated ? (
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 uppercase font-bold flex-shrink-0">
                      {currentUser?.username.charAt(0) || 'A'}
                    </div>
                    <div className="flex-grow">
                      <Input
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        fullWidth
                      />
                      <div className="flex justify-end mt-2">
                        <Button type="submit" size="sm" disabled={!commentText.trim()} icon={<Send size={16} />}>
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                  <p className="text-gray-600 mb-2">Sign in to leave a comment</p>
                  <Link to="/login">
                    <Button size="sm" variant="outline">
                      Login
                    </Button>
                  </Link>
                </div>
              )}

<div className="space-y-4 pointer-events-none">
  {currentMeme.comments.length > 0 ? (
    currentMeme.comments.map((comment) => (
      <div key={comment.id} className="border-b border-gray-100 pb-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 uppercase font-bold flex-shrink-0">
            {comment.user.charAt(0)}
          </div>
          <div>
            <div className="flex items-center mb-1">
              <span className="font-medium text-gray-900 mr-2">{comment.user}</span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt))}
              </span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center py-6">
      <User size={32} className="mx-auto text-gray-300 mb-2" />
      <p className="text-gray-500">No comments yet</p>
      <p className="text-sm text-gray-400">Be the first to comment!</p>
    </div>
  )}
</div>

            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemeDetailPage;
