import axios, { type AxiosRequestConfig, type AxiosResponse }  from 'axios';
import { toast } from 'react-toastify';

interface ApiCallOptions<TRequest = any, TParams = any> {
  method: AxiosRequestConfig['method'];
  url: string;
  data?: TRequest;
  params?: TParams;
  headers?: AxiosRequestConfig['headers'];
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  disableToast?: boolean;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  [key: string]: any; // allow extra data
}

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiCall = async <TResponse = any, TRequest = any, TParams = any>(
  options: ApiCallOptions<TRequest, TParams>
): Promise<TResponse> => {
  const {
    method,
    url,
    data,
    params,
    headers,
    showSuccessToast = true,
    showErrorToast = true,
    disableToast = false,
  } = options;

  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers,
    };

    const response: AxiosResponse<ApiResponse<TResponse>> = await api(config);

    const backendMessage = response.data?.message;

    if (!disableToast && showSuccessToast && backendMessage) {
      toast.success(backendMessage);
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error?.message || 'Something went wrong';

    if (!disableToast && showErrorToast) {
      toast.error(errorMessage);
    }

    throw error;
  }
};
