import axiosLib from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const axios = axiosLib.create({
    baseURL: config.public.baseApiUrl,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
    },
  });

  axios.defaults.withCredentials = true;

  axios.interceptors.request.use(async (requestConfig) => {
    if ((requestConfig.method as string).toLowerCase() !== "get") {
      await axios.get("/csrf-cookie");
      const xsrfToken = useCookie("XSRF-TOKEN").value;
      if (xsrfToken) {
        requestConfig.headers["X-XSRF-TOKEN"] = xsrfToken;
      }
    }

    return requestConfig;
  });

  nuxtApp.provide("axios", axios);
});
