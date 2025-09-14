import { toast } from "vue-sonner";
import type { BlogProps } from "./type";
import type { ApiResponseProps } from "../base/type";

export function useBlogMutation() {
  const { $axios } = useNuxtApp();

  const createBlog = async (values: {
    title: string;
    content: string;
    author: string;
    category_id: string | number;
  }) => {
    try {
      const response = await $axios.post<ApiResponseProps<BlogProps>>(
        "/posts",
        values,
      );
      if (response.data.status === "success") {
        toast("Blog created successfully", {
          description: response.data.message,
        });
        return { success: true, data: response.data };
      } else {
        toast(response.data.message || "Failed to create blog.", {
          description: "Please check your input and try again.",
        });
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      toast(err?.response?.data?.message || "Failed to create blog.", {
        description: "Please check your input and try again.",
      });
      return { success: false, error: err?.response?.data?.message };
    }
  };

  return { createBlog };
}
