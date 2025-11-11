import { useEffect } from "react";

export const createDataLoader = <TData, TParams extends unknown[]>(
  useStore: () => { loading: boolean; error: string | null; data: TData },
  loadFn: (...params: TParams) => void | Promise<void>,
) => {
  return (...params: TParams) => {
    const { loading, error, data } = useStore();

    useEffect(() => {
      loadFn(...params);
    }, [...params, loadFn]);

    return { data, loading, error };
  };
};

export const useAsyncEffect = (
  effect: () => Promise<void>,
  deps: React.DependencyList,
) => {
  useEffect(() => {
    void effect();
  }, deps);
};
