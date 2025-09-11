import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null as string | null,
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
    },
    clearAccessToken() {
      this.accessToken = null;
    },
  },
});
