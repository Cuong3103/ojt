import { Dropdown } from "@/app/components/dropdown/dropdown";
import { DropdownProps } from "@/types/dropdown.type";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Dropdown> = { component: Dropdown };
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = (args: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(args.value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    args.onChange && args.onChange(event);
  };
  return <Dropdown {...args} value={selectedValue} onChange={handleChange} />;
};

Default.args = {
  value: '',
  options: [ 
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ],
  placeholder: 'Select an option',
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected value:", event.target.value);
  },
};
