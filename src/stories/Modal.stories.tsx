import { Modal } from "@/app/components/modal/modal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Modal> = { component: Modal };
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: "New Content",
  },
};
