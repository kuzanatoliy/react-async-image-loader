import React from 'react';
import Avatar from '@mui/material/Avatar';

export default {
  title: 'mui-avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
};

const Template = () => (
  <Avatar alt='TN' src='/assets/image.jpg' sx={{ width: 100, height: 100, fontSize: 40 }}>
    TN
  </Avatar>
);

export const MuiAvatar = Template.bind({});
