import { useEffect, useState } from "react";

interface QueryResponse<T> {
  data: T | any[];
  loading: boolean;
  error: any;
  refetch: (query?: any) => Promise<void>;
  setData: any;
}

const useQuery = <T>(promise: (query?: any) => Promise<{ data: T }>, dependencies: any[] = []): QueryResponse<T> => {
  const [data, setData] = useState<T | []>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  const fetchData = async (query?: string) => {
    setLoading(true);
    try {
      const res = await promise(query);
      setData(res?.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData,
  };
};

export default useQuery;
