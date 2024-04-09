import { Meta, StoryObj } from '@storybook/react';
import Sakura from './Sakura';

const meta: Meta<typeof Sakura> = {
  title: 'Sakura',
  component: Sakura,
};

type Story = StoryObj<typeof Sakura>;
export default meta;

export const Preview: Story = {
  args: {
    total: 200,
  },
  render: ({ children }) => {
    return (
      <div style={{ width: '100%', height: '100dvh' }}>
        <Sakura />
      </div>
    );
  },
};
