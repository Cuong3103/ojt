import { AddUserModal } from "../app/components/add-user-modal/add-user-modal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AddUserModal> = {
  component: AddUserModal,
};
export default meta;

type Story = StoryObj<typeof AddUserModal>;

export const Default: Story = {
  args: {},
};
