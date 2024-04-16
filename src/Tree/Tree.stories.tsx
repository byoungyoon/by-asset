import { Meta, StoryObj } from '@storybook/react';
import Tree from './Tree';
import { useState } from 'react';

const meta: Meta<typeof Tree> = {
  title: 'Tree',
  component: Tree,
  argTypes: {
    reset: {
      table: {
        disable: true,
      },
    },
    target: {
      table: {
        disable: true,
      },
    },
  },
};

type Story = StoryObj<typeof Tree>;

export default meta;

export const Preview: Story = {
  args: {
    color: '#ffc5d0',
    target: 'test',
    isResize: true,
    defaultValue: 2,
  },

  render: (args) => {
    const [count, setCount] = useState(0);
    const onClick = () => {
      setCount(count + 1);
    };

    return (
      <>
        <div id="test" style={{ width: '100%', height: '100dvh' }}>
          <Tree
            color={args.color}
            target={args.target}
            reset={count}
            isResize={args.isResize}
            defaultValue={args.defaultValue}
          />
        </div>
        <button type="button" onClick={onClick}>
          reset
        </button>
      </>
    );
  },
};
