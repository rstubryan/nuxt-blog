import { defineStore } from "pinia";
import type { UserProps } from "../services/auth/type";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as UserProps | null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(user: UserProps) {
      this.user = user;
      this.isAuthenticated = true;
    },
    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
