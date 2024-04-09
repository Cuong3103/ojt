import React, { useState } from "react";

const useMutation = (promise: (payload: any) => Promise<any>) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const execute = async (
    payload: any,
    options?: {
      onSuccess?: (data: any) => void;
      onFail?: (error: Error) => void;
    }
  ) => {
    setLoading(true);
    try {
      const res = await promise(payload);
      setData(res?.data || []);
      options?.onSuccess?.(res?.data);
    } catch (error) {
      setError(error as Error);
      options?.onFail?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    data,
    loading,
    error,
  };
};

export default useMutation;
