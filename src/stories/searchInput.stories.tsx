import { InputSearch } from "@/app/components/input-box/search-input";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputSearch> = { component: InputSearch };
export default meta;

type Story = StoryObj<typeof InputSearch>;

export const Default: Story = {
  args: {},
};
