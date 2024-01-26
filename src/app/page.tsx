"use client"
import { useState } from "react";
import SyllabusCard from "./components/SyllabusCard/SyllabusCard";

export default function Home() {
  const [option, setOption] = useState('');

  const handleOptionChange = (event: any) => {
    setOption(event.target.value);
  };

  return (
    <div>
      <SyllabusCard />


    </div>
  );
}
