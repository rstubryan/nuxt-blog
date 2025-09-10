import { useHttpRequest } from "@/composables/services/use-http-request";
import { navigateTo, useCookie } from "nuxt/app";
import type { UserProps } from "./type";

export function useLoginMutation() {
  const { post } = useHttpRequest();

  const login = async (values: { email: string; password: string }) => {
    try {
      const result = await post<{
        user?: UserProps;
      }>("/login", values);

      const response = typeof result === "function" ? await result() : result;

      if (response?.content?.user) {
        const userCookie = useCookie("user");
        userCookie.value = JSON.stringify(response.content.user);
        navigateTo("/dashboard");
      } else {
        console.error("Login failed: User data not found in response.");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return { login };
}
