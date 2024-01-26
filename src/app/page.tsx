"use client"

import Dropdown from "./components/Dropdown/Dropdown";
import { useState } from "react";

export default function Home() {
  const [option, setOption] = useState('');

  const handleOptionChange = (event: any) => {
    setOption(event.target.value);
  };

  return (
    <div>
      <Dropdown
        options={[
          { label: 'Option 0', value: 'Option 0' },
          { label: 'Option 1', value: 'Option 1' },
          { label: 'Option 2', value: 'Option 2' },
          { label: 'Option 3', value: 'Option 3' },
        ]}
        value={option}
        onChange={handleOptionChange}
        placeholder="Select an option"
      />
      <p>You choose {option}!</p>


    </div>
  );
}
