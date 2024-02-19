import Pagination from "@/app/components/pagination";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Pagination> = { component: Pagination };
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    page: 1,
  },
};
