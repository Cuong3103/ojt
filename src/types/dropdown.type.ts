export type Option = {
  label: string;
  value: string;
};

export type DropdownProps = {
  value: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};
