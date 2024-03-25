import { useEffect, useState } from "react";

const useQuery = <T>(
  promise: (query: string) => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  const fetchData = async (query: string) => {
    setLoading(true);
    try {
      const res = await promise(query);
      setData(res?.data || []);
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
  };
};

export default useQuery;
