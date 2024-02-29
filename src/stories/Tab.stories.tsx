import { Tab } from "@/app/components/syllabus-tab/tab";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tab> = { component: Tab };
export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
    args: {},
};