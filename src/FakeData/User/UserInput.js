import React from "react";

import { Form } from "react-bootstrap";

const UserInput = ({ label, type, name, onChange, value }) => {
  return (
    <Form.Group>
      <Form.Label className="mb-1">{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default UserInput;
