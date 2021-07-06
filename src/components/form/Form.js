import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
import { BiCube } from "react-icons/bi";
import FormInput from "./Form-Input.js";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import "./form.css";
class Form extends Component {
  state = {
    load: {
      driver: "",
      rate: "",
      number: "",
      weight: "",
      file: "",
      distance: "",
    },
    errors: {},
  };

  schema = {
    driver: Joi.string().required().min(5).label("Driver"),
    rate: Joi.number().required().min(3).label("Rate"),
    number: Joi.number().required().min(4).label("Number"),
    weight: Joi.string().required().min(6).label("Weight"),
    file: Joi.string().required().min(5).label("File"),
    distance: Joi.string().required().min(0).label("Distance"),
  };

  validateProparty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  validate = () => {
    const { error } = Joi.validate(this.state.load, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = { ...this.state.error };

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    const msg = this.validateProparty(target);

    const errors = { ...this.state.errors };

    if (msg) errors[name] = msg;
    else delete errors[name];

    this.setState((prevState) => ({
      load: { ...prevState.load, [name]: value },
      errors,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    if (errors) this.setState({ errors });
    else this.props.history.replace("/form/delivery");
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const {
      load: { driver, rate, number, weight, file, distance },
      errors,
    } = this.state;
    return (
      <div className="wrapper">
        <div className="container">
          <div className="load">
            <div className="load__inner">
              <div className="load__title">Load details</div>
              <form action="" className="load__form" onSubmit={handleSubmit}>
                <FormInput
                  name="driver"
                  label="Select driver"
                  id="selectDriver"
                  type="select"
                  value={driver}
                  error={errors.driver}
                  handleChange={handleChange}
                />

                <FormInput
                  name="rate"
                  label="Load rate"
                  id="loadRate"
                  value={rate}
                  type="number"
                  error={errors.rate}
                  handleChange={handleChange}
                />
                <FormInput
                  name="number"
                  label="Load Number"
                  id="loadNumber"
                  value={number}
                  error={errors.number}
                  type="number"
                  handleChange={handleChange}
                />
                <FormInput
                  id="loadWeight"
                  label="Weight"
                  value={weight}
                  name="weight"
                  error={errors.weight}
                  type="text"
                  handleChange={handleChange}
                />

                <FormInput
                  id="loadFile"
                  label="File"
                  name="file"
                  type="text"
                  error={errors.file}
                  value={file}
                  handleChange={handleChange}
                />

                <FormInput
                  id="loadDistance"
                  label="Distance"
                  name="distance"
                  type="text"
                  value={distance}
                  error={errors.distance}
                  handleChange={handleChange}
                />

                <div className="form__control load__btn">
                  <button>
                    <span className="load__btn-link">Add Load</span>
                    <BiCube className="load__btn-icon left" />
                  </button>
                </div>
              </form>
              <button className="load__btn-times">
                <FaTimes className="load__btn-icon" />
                <Link to="/" className="load__btn-link">
                  Back
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Form;
