import { ChangeEvent } from "react";

export type Option = {
  label: string;
  value: string;
};

export type DropdownProps = {
  value: string;
  options: Option[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};
