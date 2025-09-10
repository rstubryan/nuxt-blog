import { useRuntimeConfig } from "#app";

type ApiResponse<T> = {
  status: string;
  message: string;
  content: T;
  errors: any[];
};

export function useHttpRequest() {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseApiUrl;

  const get = async <T>(
    url: string,
    params: Record<string, any> = {},
    options: { lazy?: boolean; clientOnly?: boolean } = {},
  ): Promise<ApiResponse<T> | (() => Promise<ApiResponse<T>>) | null> => {
    if (options.clientOnly && !import.meta.client) {
      return null;
    }

    if (options.lazy) {
      return () =>
        $fetch<ApiResponse<T>>(`${baseUrl}${url}`, {
          method: "GET",
          params,
          credentials: "include",
        });
    }

    return await $fetch<ApiResponse<T>>(`${baseUrl}${url}`, {
      method: "GET",
      params,
      credentials: "include",
    });
  };

  const post = async <T>(
    url: string,
    body: Record<string, any>,
    options: { lazy?: boolean; clientOnly?: boolean } = {},
  ): Promise<ApiResponse<T> | (() => Promise<ApiResponse<T>>)> => {
    if (options.clientOnly && !import.meta.client) {
      return null as unknown as ApiResponse<T>;
    }

    if (options.lazy) {
      return () =>
        $fetch<ApiResponse<T>>(`${baseUrl}${url}`, {
          method: "POST",
          body,
          credentials: "include",
        });
    }

    return await $fetch<ApiResponse<T>>(`${baseUrl}${url}`, {
      method: "POST",
      body,
      credentials: "include",
    });
  };

  const put = async <T>(
    url: string,
    body: Record<string, any>,
    options: { lazy?: boolean; clientOnly?: boolean } = {},
  ): Promise<ApiResponse<T> | (() => Promise<ApiResponse<T>>)> => {
    if (options.clientOnly && !import.meta.client) {
      return null as unknown as ApiResponse<T>;
    }

    if (options.lazy) {
      return () =>
        $fetch<ApiResponse<T>>(`${baseUrl}${url}`, {
          method: "PUT",
          body,
          credentials: "include",
        });
    }

    return await $fetch<ApiResponse<T>>(`${baseUrl}${url}`, {
      method: "PUT",
      body,
      credentials: "include",
    });
  };

  const del = async <T>(
    url: string,
    options: { lazy?: boolean; clientOnly?: boolean } = {},
  ): Promise<ApiResponse<T> | (() => Promise<ApiResponse<T>>)> => {
    if (options.clientOnly && !import.meta.client) {
      return null as unknown as ApiResponse<T>;
    }

    if (options.lazy) {
      return () =>
        $fetch<ApiResponse<T>>(`${baseUrl}${url}`, {
          method: "DELETE",
          credentials: "include",
        });
    }

    return await $fetch<ApiResponse<T>>(`${baseUrl}${url}`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  return { get, post, put, del };
}
