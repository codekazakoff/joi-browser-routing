import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./user.css";
import UserInput from "./UserInput";
class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const {
      onChange,
      onSubmit,
      user: { name, username, email, phone, address, company },
    } = this.props;
    return (
      <div className="container user">
        <div className="row">
          <div className="col-6 offset-3">
            <Form onSubmit={onSubmit}>
              <UserInput
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
              />

              <UserInput
                label="Username"
                type="text"
                name="username"
                value={username}
                onChange={onChange}
              />

              <UserInput
                onChange={onChange}
                label="Email"
                type="text"
                name="email"
                value={email}
              />

              <UserInput
                label="Phone"
                type="tel"
                name="phone"
                value={phone}
                onChange={onChange}
              />

              <UserInput
                onChange={onChange}
                label="City"
                type="text"
                name="address"
                value={address["city"]}
              />

              <UserInput
                onChange={onChange}
                label="Company Name"
                type="text"
                name="company"
                value={company["name"]}
              />

              <Button type="submit" className="mt-3 float-end">
                Add Data
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
