import { Button } from "@/app/components/button/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = { title: "Button/button", component: Button };
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { title: "Save" },
};
