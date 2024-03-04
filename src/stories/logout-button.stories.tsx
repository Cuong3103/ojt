import { LogoutButton } from "@/app/components/button/logout-button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LogoutButton> = {
  title: "Button/logout",
  component: LogoutButton,
};
export default meta;

type Story = StoryObj<typeof LogoutButton>;

export const Default: Story = {
  args: {},
};
