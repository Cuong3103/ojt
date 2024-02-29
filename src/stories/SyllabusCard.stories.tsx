import { SyllabusCard } from "@/app/components/syllabus-card/syllabus-card";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SyllabusCard> = { component: SyllabusCard };
export default meta;

type Story = StoryObj<typeof SyllabusCard>;

export const Default: Story = {
  args: {},
};
