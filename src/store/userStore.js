import { create } from 'zustand';

// Mock user data and credentials
const mockUser = {
  id: 'user1',
  username: 'MemeEnthusiast',
  password: 'password123',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  bio: 'Just here for the memes and good vibes ✌️',
  createdAt: '2023-01-15T10:30:00Z',
  followers: 0,
  following: 0,
  memes: []
};

// Store users in localStorage for persistence
const USERS_KEY = 'memeverse_users';
const AUTH_KEY = 'memeverse_auth';
function getUsers() {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) return JSON.parse(stored);
  return [mockUser];
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
// OTP helpers
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
function saveOTP(username, otp) {
  localStorage.setItem('otp_' + username, otp);
}
function getOTP(username) {
  return localStorage.getItem('otp_' + username);
}
function clearOTP(username) {
  localStorage.removeItem('otp_' + username);
}

export const useUserStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem(AUTH_KEY)) || null,
  isAuthenticated: !!localStorage.getItem(AUTH_KEY),
  isLoading: false,
  error: null,
  otp: '',
  otpSent: false,
  
  sendLoginOTP: async (username) => {
    set({ isLoading: true, error: null, otpSent: false });
    setTimeout(() => {
      const otp = generateOTP();
      saveOTP(username, otp);
      set({ isLoading: false, otp, otpSent: true });
      alert('Your login OTP is: ' + otp);
    }, 500);
  },
  login: async (username, password, otpInput) => {
    set({ isLoading: true, error: null });
    try {
      setTimeout(() => {
        const users = getUsers();
        const foundUser = users.find(
          (u) => u.username === username && u.password === password
        );
        const otp = getOTP(username);
        if (!otp || otp !== otpInput) {
          set({ error: 'Invalid or missing OTP', isLoading: false });
          return;
        }
        clearOTP(username);
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          set({
            currentUser: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false
          });
          localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
        } else {
          set({
            error: 'Invalid username or password',
            isLoading: false
          });
        }
      }, 1000);
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
    }
  },
  
  logout: () => {
    set({ 
      currentUser: null,
      isAuthenticated: false 
    });
    localStorage.removeItem(AUTH_KEY);
  },
  
  sendRegisterOTP: async (username) => {
    set({ isLoading: true, error: null, otpSent: false });
    setTimeout(() => {
      const otp = generateOTP();
      saveOTP(username, otp);
      set({ isLoading: false, otp, otpSent: true });
      alert('Your signup OTP is: ' + otp);
    }, 500);
  },
  register: async (username, password, email, otpInput) => {
    set({ isLoading: true, error: null });
    try {
      setTimeout(() => {
        if (username && password && email) {
          const users = getUsers();
          const exists = users.some((u) => u.username === username);
          if (exists) {
            set({
              error: 'Username already taken',
              isLoading: false
            });
            return;
          }
          const otp = getOTP(username);
          if (!otp || otp !== otpInput) {
            set({ error: 'Invalid or missing OTP', isLoading: false });
            return;
          }
          clearOTP(username);
          const newUser = {
            id: `user${Date.now()}`,
            username,
            password,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            bio: '',
            createdAt: new Date().toISOString(),
            followers: 0,
            following: 0,
            memes: []
          };
          users.push(newUser);
          saveUsers(users);
          const { password: pw, ...userWithoutPassword } = newUser;
          set({
            currentUser: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false
          });
          localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
        } else {
          set({
            error: 'All fields are required',
            isLoading: false
          });
        }
      }, 1000);
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
    }
  },
  
  updateProfile: async (updates) => {
    set({ isLoading: true, error: null });
    try {
      setTimeout(() => {
        // Update user in localStorage
        const users = getUsers();
        const idx = users.findIndex((u) => u.id === updates.id);
        let updatedUser = null;
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...updates };
          saveUsers(users);
          const { password, ...userWithoutPassword } = users[idx];
          updatedUser = userWithoutPassword;
          localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
        }
        set({
          currentUser: updatedUser,
          isLoading: false
        });
      }, 800);
    } catch (error) {
      set({ error: 'Failed to update profile', isLoading: false });
    }
  }
}));
