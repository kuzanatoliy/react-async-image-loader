import { buildRenderHook } from '@kuzanatoliorg/testing-library-react-utils';

import { useAsyncImageLoader } from './use-async-image-loader';

describe('use-async-image-loader', () => {
  const fetchTemp = global.fetch;
  const createObjectURLTemp = URL.createObjectURL;

  const SUCESS_URI = 'SUCESS_URI';
  const ERROR_URI = 'ERROR_URI';
  const ERROR_MESSAGE = 'ERROR_MESSAGE';

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((uri) => {
      if (uri === ERROR_URI) {
        return Promise.reject({ message: ERROR_MESSAGE });
      }
      return Promise.resolve({
        blob: () => {
          return Promise.resolve(uri);
        },
      });
    });

    URL.createObjectURL = jest.fn().mockImplementation((value) => value.toString());
  });

  afterAll(() => {
    global.fetch = fetchTemp;
    URL.createObjectURL = createObjectURLTemp;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderHook = buildRenderHook(useAsyncImageLoader, { uri: 'test' });

  it.each`
    uri           | error            | image
    ${SUCESS_URI} | ${null}          | ${SUCESS_URI}
    ${ERROR_URI}  | ${ERROR_MESSAGE} | ${null}
  `('should run with uri = $uri', async ({ uri, error, image }) => {
    const { waitForNextUpdate, result } = renderHook({ uri });
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.image).toBeNull();
    await waitForNextUpdate();
    expect(result.current.errorMessage).toBe(error);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.image).toBe(image);
  });

  it('should unmount', () => {
    const { unmount } = renderHook();
    unmount();
    expect(URL.createObjectURL).not.toBeCalled();
  });
});
