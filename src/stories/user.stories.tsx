import UserListPage from "@/app/(dashboard)/(users)/users/page";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserListPage> = {
  title: "Page/user",
  component: UserListPage,
};
export default meta;

type Story = StoryObj<typeof UserListPage>;

export const Default: Story = {
  args: {},
};
