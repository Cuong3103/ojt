import {Chip}  from "@/app/components/chip/chip";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Chip> = { component: Chip };
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {},
};
