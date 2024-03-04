import { Detail } from "@/app/components/syllabus-detail/detail";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Detail> = { component: Detail };
export default meta;

type Story = StoryObj<typeof Detail>;

export const Default: Story = {
  args: {},
};
