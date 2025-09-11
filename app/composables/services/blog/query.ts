import { useHttpRequest } from "../base/use-http-request";
import type { BlogProps } from "./type";
import type { PaginatedContent } from "../base/type";

export function useBlogQuery() {
  const { get } = useHttpRequest();

  const fetchPosts = async (params: Record<string, any> = {}) => {
    return await get<PaginatedContent<BlogProps>>("/posts", params);
  };

  const fetchPostById = async (postId: number) => {
    return await get<BlogProps>(`/posts/${postId}`);
  };

  const fetchCategories = async (params: Record<string, any> = {}) => {
    return await get<any[]>("/categories", params);
  };

  const fetchCategoryById = async (categoryId: number) => {
    return await get<any>(`/categories/${categoryId}`);
  };

  return {
    fetchPosts,
    fetchPostById,
    fetchCategories,
    fetchCategoryById,
  };
}
