import React from "react";

const Input = ({ label, type, name, value, onChange, error, icon }) => {
  return (
    <div className="form__control">
      <label htmlFor="email">{label}</label>
      <div className="form__input-group">
        <button className="form__button-btn">{icon}</button>
        <input
          id={type}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`enter your ${type}`}
        />
      </div>
      {error && <span className="errors">{error}</span>}
    </div>
  );
};

export default Input;
