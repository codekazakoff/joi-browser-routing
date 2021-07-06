import React from "react";

const FormInput = ({ label, name, type, id, handleChange, value, error }) => {
  return (
    <div className="form__control">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select name={name} id={id} type={type} onChange={handleChange}>
          <option value="select">Pending</option>
          <option value="select1">select1</option>
          <option value="select2">select2</option>
          <option value="select3">select3</option>
          <option value="select4">select4</option>
        </select>
      ) : (
        <input
          type={type}
          placeholder={label}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
        />
      )}
      {error && <span className="errors">{error}</span>}
    </div>
  );
};

export default FormInput;
