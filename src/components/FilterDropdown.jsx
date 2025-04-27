import React from 'react';

export default function FilterDropdown({ users, selectedUser, onChange }) {
  return (
    <select value={selectedUser} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Users</option>
      {users.map((user) => (
        <option key={user} value={user}>
          User {user}
        </option>
      ))}
    </select>
  );
}