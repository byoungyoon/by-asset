import { Meta, StoryObj } from '@storybook/react';
import Tree from './Tree';

const meta: Meta<typeof Tree> = {
  title: 'Tree',
  component: Tree,
};

type Story = StoryObj<typeof Tree>;

export default meta;

export const Preview: Story = {
  args: {
    color: 'ffc5d0',
  },
};
