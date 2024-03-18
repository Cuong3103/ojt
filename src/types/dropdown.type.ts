import { ChangeEvent, ReactNode } from "react";

export type Option = {
  label: string;
  value?: string;
  icon?: ReactNode;
  showModal?: boolean;
};

export type DropdownProps = {
  id: string;
  value: string;
  options: Option[];
  error?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};
