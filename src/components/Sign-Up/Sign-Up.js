import React, { Component } from "react";
import Input from "../Sign-In/Input";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Joi from "joi-browser";
export default class Sign_Up extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sign_Up: {
        username: "",
        phone: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  }

  schema = {
    username: Joi.string().required().min(3).label("Name"),
    phone: Joi.number().required().label("Phone").min(4),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  validate = () => {
    const { error } = Joi.validate(this.state.sign_Up, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    const msg = this.validateProperty(target);

    const errors = { ...this.state.errors };

    if (msg) errors[name] = msg;
    else delete errors[name];

    this.setState({
      sign_Up: { ...this.state.sign_Up, [name]: value },
      errors,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    if (errors) this.setState({ errors });
    else this.props.history.replace("/");

    console.log(errors);
    const newData = this.state.sign_Up;

    console.log(newData);
  };

  nextSignIn = () => {
    this.props.history.replace("/sign-in");
  };
  render() {
    const { handleSubmit, handleChange, nextSignIn } = this;
    const {
      sign_Up: { email, username, phone, password },
      errors,
    } = this.state;
    return (
      <div className="wrapper">
        <form
          className="form"
          onSubmit={handleSubmit}
          style={{ marginTop: "80px" }}
        >
          <div className="form__title">Sign Up</div>

          <Input
            type="text"
            label="Name"
            name="username"
            value={username}
            error={errors.username}
            onChange={handleChange}
            icon={<AiOutlineUser />}
          />

          <Input
            type="phone"
            label="Phone"
            name="phone"
            value={phone}
            error={errors.phone}
            onChange={handleChange}
            icon={<FiPhoneCall />}
          />

          <Input
            type="email"
            label="Email"
            name="email"
            value={email}
            error={errors.email}
            onChange={handleChange}
            icon={<AiOutlineMail />}
          />

          <Input
            type="password"
            label="Password"
            name="password"
            value={password}
            error={errors.password}
            onChange={handleChange}
            icon={<AiOutlineLock />}
          />

          <div className="form__control">
            <button className="form__button-sign-in">
              <span to="/sign-in" className="link-sign-in">
                Sign Up
              </span>
            </button>
          </div>

          <div className="form__control-footer">
            <div className="form__control-footer-title">
              Do not have an account ?
              <span className="link" to="/sign-up" onClick={nextSignIn}>
                SignIn now
              </span>
            </div>
            <div className="form__control-footer-text">
              <span to="/privacy-policy" className="link">
                Privacy Policy
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
