import React from "react";

const Select = ({ options, value, onChange, label, name, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        id={name}
        onChange={onChange}
        className='form-control'
      >
        {options.map((option) => (
          <option key={option.id} value={options.job}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
