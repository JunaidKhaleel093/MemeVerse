import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit, Image, LogOut } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useMemeStore } from '../store/memeStore';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import MemeGrid from '../components/meme/MemeGrid';
import { useNavigate, useParams } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { username: paramUsername } = useParams();
  const { currentUser, isAuthenticated, logout, updateProfile } = useUserStore();
  const { memes } = useMemeStore();
  const users = JSON.parse(localStorage.getItem('memeverse_users')) || [];
  const viewingUser = paramUsername
    ? users.find(u => u.username === paramUsername)
    : currentUser;

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(viewingUser?.username || '');
  const [bio, setBio] = useState(viewingUser?.bio || '');
  const [avatar, setAvatar] = useState(viewingUser?.avatar || '');
  const [avatarInput, setAvatarInput] = useState('');
  // For file upload
  const handleAvatarFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const userMemes = memes.filter(meme =>
    viewingUser && meme.creator === viewingUser.username
  );

  if (!viewingUser) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto p-8 text-center" hoverEffect={false}>
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h2>
          <p className="text-gray-600 mb-6">
            The user profile you are looking for does not exist.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated && !paramUsername) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto p-8 text-center" hoverEffect={false}>
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Logged In</h2>
          <p className="text-gray-600 mb-6">
            Please log in to view your profile and manage your memes.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button variant="outline" className="" onClick={() => navigate('/register')}>Sign Up</Button>
          </div>
        </Card>
      </div>
    );
  }

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    await updateProfile({
      ...currentUser,
      username,
      bio,
      avatar: avatar || currentUser.avatar
    });
    setIsEditing(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 m-5">
      <div className="max-w-5xl mx-auto">
        <Card className="mb-8" hoverEffect={false}>
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="mb-4 md:mb-0 md:mr-8">
                {/* Only allow editing if viewing own profile */}
                {(!paramUsername || (currentUser && viewingUser && currentUser.username === viewingUser.username)) ? (
                  isEditing ? (
                    <>
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="Profile Preview"
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border mb-2 mx-auto"
                        />
                      ) : (
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 uppercase text-4xl font-bold mb-2 mx-auto">
                          {viewingUser?.username.charAt(0)}
                        </div>
                      )}
                      <div className="mt-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFile}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={avatarInput}
                            onChange={(e) => setAvatarInput(e.target.value)}
                            placeholder="Paste image URL or leave blank"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => {
                              setAvatar(avatarInput);
                              setAvatarInput('');
                            }}
                          >Set</Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    viewingUser?.avatar ? (
                      <img
                        src={viewingUser.avatar}
                        alt="Profile"
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 uppercase text-4xl font-bold">
                        {viewingUser?.username.charAt(0)}
                      </div>
                    )
                  )
                ) : (
                  viewingUser?.avatar ? (
                    <img
                      src={viewingUser.avatar}
                      alt="Profile"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 uppercase text-4xl font-bold">
                      {viewingUser?.username.charAt(0)}
                    </div>
                  )
                )}
              </div>
              
              <div className="flex-grow text-center md:text-left">
                {/* Only allow editing if viewing own profile */}
                {(!paramUsername || (currentUser && viewingUser && currentUser.username === viewingUser.username)) ? (
                  isEditing ? (
                    <div className="space-y-4">
                      <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center md:justify-between mb-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                          {viewingUser?.username}
                        </h1>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit size={16} />}
                          className="hidden md:flex"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </Button>
                      </div>
                      <p className="text-gray-600 mb-6">{viewingUser?.bio || 'No bio yet'}</p>
                      <div className="flex justify-center md:justify-start space-x-6 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{userMemes.length}</p>
                          <p className="text-sm text-gray-500">Memes</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{viewingUser?.followers}</p>
                          <p className="text-sm text-gray-500">Followers</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{viewingUser?.following}</p>
                          <p className="text-sm text-gray-500">Following</p>
                        </div>
                      </div>
                      <div className="md:hidden flex justify-center mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Edit size={16} />}
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </>
                  )
                ) : (
                  <>
                    <div className="flex items-center justify-center md:justify-between mb-4">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {viewingUser?.username}
                      </h1>
                    </div>
                    <p className="text-gray-600 mb-6">{viewingUser?.bio || 'No bio yet'}</p>
                    <div className="flex justify-center md:justify-start space-x-6 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{userMemes.length}</p>
                        <p className="text-sm text-gray-500">Memes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{viewingUser?.followers}</p>
                        <p className="text-sm text-gray-500">Followers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{viewingUser?.following}</p>
                        <p className="text-sm text-gray-500">Following</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Only show logout/account info if viewing own profile */}
            {(!paramUsername || (currentUser && viewingUser && currentUser.username === viewingUser.username)) && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Account</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<LogOut size={16} />}
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    Logout
                  </Button>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Member since {new Date(viewingUser?.createdAt || '').toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </Card>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{paramUsername ? `${viewingUser?.username}'s Memes` : 'Your Memes'}</h2>
            {/* Only show upload button if viewing own profile */}
            {(!paramUsername || (currentUser && viewingUser && currentUser.username === viewingUser.username)) && (
              <Button icon={<Image size={18} />} onClick={() => navigate('/upload')}>
                Upload New Meme
              </Button>
            )}
          </div>
          
          {userMemes.length > 0 ? (
            <MemeGrid memes={userMemes} columns={3} />
          ) : (
            <Card className="p-12 text-center" hoverEffect={false}>
              <Image size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No memes yet</h3>
              <p className="text-gray-600 mb-6">
                {paramUsername ? `${viewingUser?.username} hasn't uploaded any memes yet.` : "You haven't uploaded any memes yet. Start sharing your humor with the world!"}
              </p>
              {!paramUsername && <Button onClick={() => navigate('/upload')}>Upload Your First Meme</Button>}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
