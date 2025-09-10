import { useHttpRequest } from "@/composables/services/use-http-request";
import { navigateTo, useCookie } from "nuxt/app";
import { toast } from "vue-sonner";
import type { UserProps } from "./type";

export function useLoginMutation() {
  const { post } = useHttpRequest();

  const login = async (values: { email: string; password: string }) => {
    try {
      const result = await post<{
        user?: UserProps;
      }>("/login", values);

      const response = typeof result === "function" ? await result() : result;

      if (response?.status === "success" && response?.content?.user) {
        const userCookie = useCookie("user");
        userCookie.value = JSON.stringify(response.content.user);

        toast(response.message, {
          description: `Welcome, ${response.content.user.name}!`,
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
  const { post } = useHttpRequest();

  const logout = async () => {
    try {
      const result = await post<null>("/logout", {});

      const response = typeof result === "function" ? await result() : result;

      if (response?.status === "success") {
        const userCookie = useCookie("user");
        const accessTokenCookie = useCookie("access_token");
        userCookie.value = null;
        accessTokenCookie.value = null;

        toast(response.message, {
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
