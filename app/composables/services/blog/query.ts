import type { BlogProps } from "./type";
import type { ApiResponseProps } from "../base/type";

export function useBlogQuery() {
  const { $axios } = useNuxtApp();

  const fetchPosts = async (params: Record<string, any> = {}) => {
    const response = await $axios.get<ApiResponseProps<BlogProps>>("/posts", {
      params,
    });
    return response.data;
  };

  const fetchPostById = async (postId: number) => {
    const response = await $axios.get<BlogProps>(`/posts/${postId}`);
    return response.data;
  };

  const fetchCategories = async (params: Record<string, any> = {}) => {
    const response = await $axios.get<any[]>("/categories", { params });
    return response.data;
  };

  const fetchCategoryById = async (categoryId: number) => {
    const response = await $axios.get<any>(`/categories/${categoryId}`);
    return response.data;
  };

  return {
    fetchPosts,
    fetchPostById,
    fetchCategories,
    fetchCategoryById,
  };
}
