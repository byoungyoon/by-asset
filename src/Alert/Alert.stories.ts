import { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
  argTypes: {
    type: {
      options: ["success", "info", "warning", "error"],
      control: { type: "radio" },
    },
    onClose: {
      options: ["existence", "nonexistent"],
      mapping: {
        existence: () => {},
        nonexistent: undefined,
      },
      control: { type: "radio" },
    },
    title: {
      control: { type: "text" },
    },
    content: {
      control: { type: "text" },
    },
  },
  args: {
    onClose: undefined,
    title: "storybook title example",
    content: "storybook content example",
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const success: Story = {
  args: {
    type: "success",
  },
};

export const info: Story = {
  args: {
    type: "info",
  },
};

export const warning: Story = {
  args: {
    type: "warning",
  },
};

export const error: Story = {
  args: {
    type: "error",
  },
};
