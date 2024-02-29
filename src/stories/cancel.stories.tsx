import { Cancel } from "@/app/components/button/cancel";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Cancel> = { title: "Button/Cancel", component: Cancel };
export default meta;

type Story = StoryObj<typeof Cancel>;

export const Default: Story = {
    args: {},
};
