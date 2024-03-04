import { ChangeEvent } from "react";

export type Option = {
  label: string;
  value: string;
};

export type DropdownProps = {
  id: string;
  value: string;
  options: Option[];
  error?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};
