import { useState, useEffect } from 'react';

export interface IUseAsyncImageLoaderResult {
  image: string | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export interface IUseAsyncImageLoaderProps {
  uri: string;
}

export type IUseAsyncImageLoader = (props: IUseAsyncImageLoaderProps) => IUseAsyncImageLoaderResult;

export const useAsyncImageLoader: IUseAsyncImageLoader = ({ uri }) => {
  const [data, setData] = useState<IUseAsyncImageLoaderResult>({
    image: null,
    isLoading: true,
    errorMessage: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(uri, {
      signal: controller.signal,
    })
      .then((res) => res.blob())
      .then((blob) => setData((prevState) => ({ ...prevState, image: URL.createObjectURL(blob) })))
      .catch((error) => setData((prevState) => ({ ...prevState, errorMessage: error.message })))
      .finally(() => {
        setData((prevState) => ({ ...prevState, isLoading: false }));
      });

    return () => controller.abort();
  }, [uri]);

  return data;
};
