import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Mail, Lock, User } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, sendRegisterOTP, otpSent } = useUserStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    await sendRegisterOTP(username);
    setOtpRequested(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, password, email, otp);
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md" hoverEffect={false}>
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
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Join MemeVerse</h1>
            <p className="text-gray-600 mt-2">Create an account to start sharing memes</p>
          </div>

          <form onSubmit={otpRequested ? handleSubmit : handleRequestOTP}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <Input
                label="Username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                icon={<User size={18} />}
                required
                disabled={otpRequested}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                icon={<Mail size={18} />}
                required
                disabled={otpRequested}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                icon={<Lock size={18} />}
                required
                disabled={otpRequested}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                icon={<Lock size={18} />}
                error={passwordError}
                required
                disabled={otpRequested}
              />
              {otpRequested && (
                <Input
                  label="OTP"
                  type="text"
                  placeholder="Enter OTP sent to you"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  fullWidth
                  required
                />
              )}

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                I agree to the{' '}
                <Link to="/terms" className="text-purple-600">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-purple-600">
                  Privacy Policy
                </Link>
              </label>
              </div>

              <Button type="submit" fullWidth isLoading={isLoading}>
                {otpRequested ? 'Create Account' : 'Request OTP'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-500 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
