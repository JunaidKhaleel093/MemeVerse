import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Mail, Lock } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useUserStore();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    
    // If no error, redirect to home
    if (!error) {
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <Flame size={48} className="text-purple-600 mx-auto" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Welcome back to MemeVerse</h1>
            <p className="text-gray-600 mt-2">Sign in to continue to your account</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <Input
                label="Username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                icon={<Mail size={18} />}
                required
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                icon={<Lock size={18} />}
                required
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-purple-600 hover:text-purple-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-600 hover:text-purple-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
