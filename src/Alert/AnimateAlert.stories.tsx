import { useRef } from "react";
import { loremIpsum } from "lorem-ipsum";
import { Meta, StoryObj } from "@storybook/react";
import AnimateAlert, { AddAlert } from "./AnimateAlert";

const meta: Meta<typeof AnimateAlert> = {
  title: "Alert",
  component: AnimateAlert,
};

export default meta;
type Story = StoryObj<typeof AnimateAlert>;

const TestAnimate = () => {
  const ref = useRef<null | AddAlert>(null);

  const onClick = () => {
    const random = Number((Math.random() * 3).toFixed());
    let type: string = "";
    switch (random) {
      case 0:
        type = "success";
        break;
      case 1:
        type = "info";
        break;
      case 2:
        type = "warning";
        break;
      case 3:
        type = "error";
        break;
      default:
        break;
    }

    ref.current?.(type, loremIpsum());
  };

  return (
    <>
      <button id="button-alert" type="button" onClick={onClick}>
        open alert
      </button>
      <AnimateAlert
        children={(add: AddAlert) => {
          ref.current = add;
        }}
      />
    </>
  );
};

export const animate: Story = {
  render: () => {
    return <TestAnimate />;
  },
};
