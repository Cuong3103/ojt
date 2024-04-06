import { ChangeEvent, ReactNode } from "react";

export type Option = {
  label: string;
  value?: string | number;
  icon?: ReactNode;
  showModal?: boolean;
  subOption?: any;
  onClick?: () => void;
};

export type DropdownProps = {
  id: string;
  value: string | number;
  options: Option[];
  error?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};
