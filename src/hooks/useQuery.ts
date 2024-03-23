import { useEffect, useState } from "react";

const useQuery = <T>(
  promise: (query: string) => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T[]>([]);
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
    // Fetch data initially and on dependency changes
    fetchData(); // Initial query value, you may need to adjust it
  }, dependencies); // useEffect dependency array

  return {
    data,
    loading,
    error,
    refetch: fetchData, // Expose fetchData function for manual refetching
  };
};

export default useQuery;
