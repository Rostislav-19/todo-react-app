import React from 'react';

export default function SortDropdown({ options, selectedOption, onChange }) {
  return (
    <select value={selectedOption} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
