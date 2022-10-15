import React from 'react';

import { useAsyncImageLoader, IUseAsyncImageLoaderResult } from './use-async-image-loader';

export const AsyncImage = <TImageProps extends {} = {}, TExtends extends {} = {}>({
  uri,
  Image,
  mapStateToProps,
  componentProps,
}: {
  uri: string;
  Image: (props: TImageProps) => JSX.Element;
  mapStateToProps: (state: IUseAsyncImageLoaderResult, props: TExtends) => TImageProps;
  componentProps: TExtends;
}) => {
  const state = useAsyncImageLoader({ uri });

  return <Image {...mapStateToProps(state, componentProps)} />;
};
