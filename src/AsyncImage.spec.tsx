import React from 'react';
import { buildRender } from '@kuzanatoliorg/testing-library-react-utils';

import { AsyncImage } from './AsyncImage';

jest.mock('./use-async-image-loader', () => ({
  useAsyncImageLoader: jest.fn().mockReturnValue({
    image: 'test_image',
  }),
}));

describe('AsyncImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const ImageSpy = jest
    .fn()
    .mockImplementation(({ src, alt }: { src?: string; alt: string }) => <img src={src} alt={alt}></img>);

  const mapStateToPropsSpy = jest.fn().mockImplementation(({ image }, { alt }) => ({ src: image || undefined, alt }));

  const render = buildRender(AsyncImage, {
    uri: 'test_uri',
    Image: ImageSpy,
    componentProps: { alt: 'test_alt' },
    mapStateToProps: mapStateToPropsSpy,
  });

  it('component should be render', () => {
    render();
    expect(ImageSpy).toBeCalled();
    expect(mapStateToPropsSpy).toBeCalled();
  });
});
