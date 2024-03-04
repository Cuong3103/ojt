import { RadioButton } from "@/app/components/button/radio-button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RadioButton> = {
  title: "Button/radio_button",
  component: RadioButton,
};
export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    options: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
    ],
  },
};
