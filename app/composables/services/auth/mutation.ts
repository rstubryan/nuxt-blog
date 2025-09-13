import { useCookie, navigateTo } from "nuxt/app";
import { toast } from "vue-sonner";
import { useAuthStore } from "@/composables/stores/auth";
import type { UserProps } from "./type";

export function useLoginMutation() {
  const { $axios } = useNuxtApp();
  const authStore = useAuthStore();

  const login = async (values: { email: string; password: string }) => {
    try {
      const response = await $axios.post<{
        status: string;
        message: string;
        content: { user?: UserProps };
      }>("/login", values);

      if (response.data.status === "success" && response.data.content?.user) {
        const userCookie = useCookie("user");
        userCookie.value = JSON.stringify(response.data.content.user);

        authStore.setUser(response.data.content.user);

        toast(response.data.message, {
          description: `Welcome, ${response.data.content.user.name}!`,
        });

        setTimeout(() => {
          navigateTo("/dashboard");
        }, 2000);
      }
    } catch (err: any) {
      toast(err?.response?.data?.message || "An unexpected error occurred.", {
        description: "Please try again later.",
      });
      console.error(err);
    }
  };

  return { login };
}

export function useLogoutMutation() {
  const { $axios } = useNuxtApp();
  const authStore = useAuthStore();

  const logout = async () => {
    try {
      const response = await $axios.post<{
        status: string;
        message: string;
      }>("/logout");

      if (response.data.status === "success") {
        const userCookie = useCookie("user");
        userCookie.value = null;

        authStore.clearUser();

        toast(response.data.message, {
          description: "You have been logged out successfully.",
        });

        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      }
    } catch (err: any) {
      toast(err?.response?.data?.message || "An unexpected error occurred.", {
        description: "Please try again later.",
      });
      console.error(err);
    }
  };

  return { logout };
}
