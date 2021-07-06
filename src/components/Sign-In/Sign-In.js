import React, { Component } from "react";
import Input from "./Input";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import "./sign-in.css";

export default class Sign_In extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signIn: {
        email: "",
        password: "",
      },
      errors: {},
    };
  }
  schema = {
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
    const { error } = Joi.validate(this.state.signIn, this.schema, {
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

    this.setState((prevS) => ({
      signIn: { ...prevS.signIn, [name]: value },
      errors,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    if (errors) this.setState({ errors });
    else this.props.history.replace("/");
  };
  nextSignUp = () => {
    this.props.history.replace("/sign-up");
  };

  render() {
    const { handleChange, handleSubmit, nextSignUp } = this;
    const { signIn, errors } = this.state;
    const { email, password } = signIn;
    return (
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__title">Sign In</div>

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
                Sign In
              </span>
            </button>
          </div>

          <div className="form__control-footer">
            <div className="form__control-footer-title">
              Do not have an account ?
              <Link className="link" to="/sign-up" onClick={nextSignUp}>
                SignUp now
              </Link>
            </div>
            <div className="form__control-footer-text">
              <Link to="/privacy-policy" className="link">
                Privacy Policy
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
