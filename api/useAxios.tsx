import type { AxiosProgressEvent } from "axios";
import axios from "axios"; // keep for requests that should NOT use auth/withCredentials
import { useCallback, useMemo } from "react";
import api from "./api"; // our configured axios instance with interceptor

const safeRequest = async (func: () => Promise<any>) => {
  try {
    const response = await func();
    return response;
  } catch (error: any) {
    console.error(
      "Error in safeRequest:",
      error?.response?.data?.message || error?.message
    );
    throw error;
  }
};

const useAxios = () => {
  const COMMON_HEADERS = useMemo(
    () => ({
      "Content-Type": "application/json",
    }),
    []
  );

  const FORM_DATA_HEADERS = useMemo(
    () => ({
      "Content-Type": "multipart/form-data",
    }),
    []
  );

  interface GetDataParams {
    [key: string]: string | number | boolean | undefined;
  }

  interface PutDataOptions {
    [key: string]: unknown;
  }

  interface DeleteDataOptions {
    [key: string]: unknown;
  }

  interface PutFileOptions {
    headers?: Record<string, string>;
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  }

  type IdsType = string | number | (string | number)[] | null;

  const getData = useCallback(
    async (
      url: string,
      id: string | number | (string | number)[] | null = null,
      params?: GetDataParams
    ): Promise<unknown> =>
      safeRequest(async () => {
        // Build path relative to api baseURL
        let path = url;

        if (id) {
          path = Array.isArray(id)
            ? `${path}/${id.join("/")}`
            : `${path}/${id}`;
        }
        console.log('path', path);

        if (params && typeof params === "object") {
          const queryString = new URLSearchParams(
            params as Record<string, string>
          ).toString();
          path = `${path}?${queryString}`;
        }

        const response = await api.get(path, {
          headers: COMMON_HEADERS,
          // withCredentials comes from api defaults
        });

        return response.data;
      }),
    [COMMON_HEADERS]
  );

  const postData = useCallback(
    async (url: string, data: object = {}) =>
      safeRequest(async () => {
        const isFormData = data instanceof FormData;
        const response = await api.post(url, data, {
          headers: isFormData ? FORM_DATA_HEADERS : COMMON_HEADERS,
        });
        return response.data;
      }),
    [COMMON_HEADERS, FORM_DATA_HEADERS]
  );

  const putData = useCallback(
    async (url: string, ids: IdsType = null, data: PutDataOptions = {}) =>
      safeRequest(async () => {
        const idsPath = Array.isArray(ids)
          ? ids.join("/")
          : ids
          ? String(ids)
          : "";
        const finalPath = idsPath ? `${url}/${idsPath}` : url;

        const response = await api.put(finalPath, data, {
        //   headers: COMMON_HEADERS,
        });

        return response.data;
      }),
    [COMMON_HEADERS]
  );

  const patchData = useCallback(
    async (url: string, data: object = {}) =>
      safeRequest(async () => {
        const isFormData = data instanceof FormData;
        const response = await api.patch(url, data, {
          headers: isFormData ? FORM_DATA_HEADERS : COMMON_HEADERS,
        });

        return response.data;
      }),
    [COMMON_HEADERS, FORM_DATA_HEADERS]
  );

  const deleteData = useCallback(
    async (
      url: string,
      id: string | number | (string | number)[] | null = "",
      data: DeleteDataOptions = {}
    ): Promise<unknown> =>
      safeRequest(async () => {
        const path = id
          ? `${url}/${Array.isArray(id) ? id.join("/") : id}`
          : url;

        const response = await api.delete(path, {
          data,
          headers: COMMON_HEADERS,
        });
        return response.data;
      }),
    [COMMON_HEADERS]
  );

  // Typically PUT file uploads go to pre-signed URLs (no cookies/interceptor needed)
  // Keep using bare axios here unless you specifically want auth cookies
  const putFile = useCallback(
    async (url: string, file: File | Blob, options: PutFileOptions = {}) => {
      return safeRequest(async () => {
        try {
          const response = await axios.put(url, file, {
            headers: options.headers || {},
            onUploadProgress: options.onUploadProgress,
          });
          return response;
        } catch (error) {
          throw new Error(`Error with PUT request: ${String(error)}`);
        }
      });
    },
    []
  );

  return {
    deleteData,
    getData,
    patchData,
    postData,
    putData,
    putFile,
  };
};

export default useAxios;