import { DatePicker } from "@/app/components/date-picker/date-picker";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DatePicker> = { component: DatePicker };
export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {},
};
