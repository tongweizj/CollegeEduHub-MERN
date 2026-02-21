import React from 'react';
import { Form, Col } from 'react-bootstrap';

const FormInput = ({ label, name, type = "text", value, onChange, placeholder, required = false, md }) => {
  const inputElement = (
    <Form.Group className="mb-3" controlId={`form-${name}`}>
      <Form.Label className="small fw-bold">{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </Form.Group>
  );

  // 如果传了 md 属性，则包装在 Col 中，否则直接返回
  return md ? <Col md={md}>{inputElement}</Col> : inputElement;
};

export default FormInput;