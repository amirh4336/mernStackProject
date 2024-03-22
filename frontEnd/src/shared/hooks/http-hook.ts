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
      const httpAbortCtrll = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrll)
      try {
        const res = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal
        });

        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (error: any) {
        setError(error.message || "Something went wrong, please try again");
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
