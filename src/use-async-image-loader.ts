import { useState, useEffect } from 'react';

export interface IUseAsyncImageLoaderResult {
  image: string | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export type IUseAsyncImageLoader = (uri: string) => IUseAsyncImageLoaderResult;

export const useAsyncImageLoader: IUseAsyncImageLoader = (uri: string) => {
  const [data, setData] = useState<IUseAsyncImageLoaderResult>({
    image: null,
    isLoading: true,
    errorMessage: null,
  });

  useEffect(() => {
    fetch(uri)
      .then((res) => res.blob())
      .then((blob) => setData({ ...data, image: URL.createObjectURL(blob) }))
      .catch((error) => setData({ ...data, errorMessage: error.message }))
      .finally(() => {
        setData({ ...data, isLoading: false });
      });
  }, []);

  return data;
};
