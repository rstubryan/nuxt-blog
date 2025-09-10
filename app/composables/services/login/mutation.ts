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
