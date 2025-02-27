import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, X, Tag } from 'lucide-react';
import { useMemeStore } from '../store/memeStore';
import { useUserStore } from '../store/userStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const UploadPage = () => {
  const navigate = useNavigate();
  const { uploadMeme, isLoading } = useMemeStore();
  const { isAuthenticated, currentUser } = useUserStore();
  
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  });
  
  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('You must be logged in to upload memes');
      navigate('/login');
      return;
    }
    
    if (!title) {
      toast.error('Please add a title');
      return;
    }
    
    if (!previewUrl) {
      toast.error('Please upload an image');
      return;
    }
    
    try {
      await uploadMeme({
        title,
        imageUrl: previewUrl,
        creator: currentUser?.username || 'Anonymous',
        tags: tags.length > 0 ? tags : ['meme']
      });
      
      toast.success('Meme uploaded successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to upload meme');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <div className="flex items-center mb-8">
        <Upload size={28} className="text-purple-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Upload a Meme</h1>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Title"
                type="text"
                placeholder="Give your meme a catchy title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewUrl(null);
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <Image size={48} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">
                      {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
                    </p>
                    <p className="text-xs mt-1">
                      Supports JPG, PNG, GIF (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex items-center mb-2">
                <Input
                  type="text"
                  placeholder="Add tags (e.g., funny, cats)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-grow"
                  icon={<Tag size={16} />}
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="ml-2"
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm"
                  >
                    #{tag}
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!title || !previewUrl}
              >
                Upload Meme
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
