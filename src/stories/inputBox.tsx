import { InputBox } from "../app/components/input-box/input-box";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputBox> = { component: InputBox };
export default meta;

type Story = StoryObj<typeof InputBox>;

export const Default: Story = {
  args: { label: "Username" },
};
