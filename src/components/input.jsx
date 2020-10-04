import React from "react";

const Input = ({
  value,
  onChange,
  error,
  placeholder,
  name,
  label,
  ...rest
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={name}
        placeholder={placeholder}
        className='form-control'
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
