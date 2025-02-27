import { create } from 'zustand';

// Mock user data
const mockUser = {
  id: 'user1',
  username: 'MemeEnthusiast',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  bio: 'Just here for the memes and good vibes ✌️',
  createdAt: '2023-01-15T10:30:00Z',
  followers: 256,
  following: 128,
  memes: []
};

export const useUserStore = create((set) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      setTimeout(() => {
        if (username && password) {
          set({ 
            currentUser: mockUser,
            isAuthenticated: true,
            isLoading: false 
          });
        } else {
          set({ 
            error: 'Invalid credentials',
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
  },
  
  register: async (username, password, email) => {
    set({ isLoading: true, error: null });
    try {
      setTimeout(() => {
        if (username && password && email) {
          const newUser = {
            ...mockUser,
            id: `user${Date.now()}`,
            username,
            createdAt: new Date().toISOString()
          };
          
          set({ 
            currentUser: newUser,
            isAuthenticated: true,
            isLoading: false 
          });
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
        set((state) => ({
          currentUser: state.currentUser 
            ? { ...state.currentUser, ...updates } 
            : null,
          isLoading: false
        }));
      }, 800);
    } catch (error) {
      set({ error: 'Failed to update profile', isLoading: false });
    }
  }
}));
