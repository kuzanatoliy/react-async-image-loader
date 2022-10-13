import { buildRenderHook } from '@kuzanatoliorg/testing-library-react-utils';

import { useAsyncImageLoader } from './use-async-image-loader';

console.log(buildRenderHook);
console.log(useAsyncImageLoader);

// const SUCESS_URI = 'SUCESS_URI';
const ERROR_URI = 'ERROR_URI';
const ERROR_MESSAGE = 'ERROR_MESSAGE';

global.fetch = jest.fn().mockImplementation(({ uri }) => {
  if (uri === ERROR_URI) {
    return Promise.reject({ message: ERROR_MESSAGE });
  }
  return Promise.resolve({ blob: Promise.resolve(new Blob()) });
});

describe('use-async-image-loader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderHook = buildRenderHook(useAsyncImageLoader, { uri: 'test' });

  it('test', () => {
    renderHook();
    expect(true).toBeTruthy();
  });
});
