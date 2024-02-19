import { Footer } from "@/app/components/footer/footer";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Footer> = { component: Footer };
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};
