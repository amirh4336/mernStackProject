import { useState, useCallback, useRef ,useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const  activeHttpRequests = useRef<any>([])

  const sendRequest = useCallback(
    async ({
      url,
      method = "GET",
      body = null,
      headers = {},
    }: {
      url: string;
      method: string;
      body: BodyInit | null | undefined;
      headers: HeadersInit | undefined;
    }) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrl)
      try {
        const res = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });

        const responseData = await res.json();

        activeHttpRequests.current = activeHttpRequests.current.filter((reqCtrl: any) => reqCtrl !== httpAbortCtrl)
        if (!res.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (error: any) {
        setError(error.message || "Something went wrong, please try again");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(undefined);
  }

  useEffect(() => {

    return () => {
      activeHttpRequests.current.forEach((abortCtrl : any )=> abortCtrl.abort())
    }
  }, [])
  

  return { isLoading, error, sendRequest , clearError };
};
