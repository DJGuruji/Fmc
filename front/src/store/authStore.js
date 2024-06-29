import {create} from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  login: (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', data.token);
    set({ user: data, token: data.token });
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  updateProfile: (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    set({ user: data });
  },
}));
