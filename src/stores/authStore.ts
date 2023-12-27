import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: ''
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: window.localStorage }]
  }
});
