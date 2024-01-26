import React from 'react';
import './Dropdown.css';

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    value: string;
    options: Option[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
}

const Dropdown = ({ value, options, onChange, placeholder }: DropdownProps) => {
    return (
        <select value={value} onChange={onChange}>
            {placeholder && (
                <option value="" disabled hidden>
                    {placeholder}
                </option>
            )}
            {options.map((option: Option, index: number) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
