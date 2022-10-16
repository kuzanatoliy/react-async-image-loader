import React from 'react';

import { AsyncImage } from '../../src/AsyncImage';

interface AsyncImageDecoratorProps {
  alt: string;
  uri: string;
}

const Image = (props) => <img {...props} />;

const AsyncImageDecorator = ({ alt, uri }: AsyncImageDecoratorProps) => (
  <AsyncImage
    Image={Image}
    uri={uri}
    mapStateToProps={({ image }, { alt }) => ({ src: image, alt })}
    componentProps={{ alt }}
  />
);

const Template = ({ isSuccess, alt }) =>
  isSuccess ? (
    <AsyncImageDecorator uri='/assets/image.jpg' alt={alt} />
  ) : (
    <AsyncImageDecorator uri='/assets/face.jpg' alt={alt} />
  );

export const AsyncImageTemplate = Template.bind({});

export default {
  title: 'image',
  component: AsyncImageTemplate,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isSuccess: {
      name: 'is sucess loading',
      defaultValue: true,
      description: 'display image instead of loading result',
      control: {
        type: 'boolean',
      },
    },
    alt: {
      name: 'alt',
      defaultValue: 'Test image',
      description: 'alt attribute value',
      control: {
        type: 'text',
      },
    },
  },
};
