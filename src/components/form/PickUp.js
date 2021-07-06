import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import FormInput from "./Form-Input.js";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
class PickUp extends Component {
  state = {
    delivery: {
      address: "",
      date: "",
      time: "",
      description: "",
      status: "",
    },
    errors: {},
  };

  schema = {
    address: Joi.string().required().label("Address"),
    date: Joi.string().required().label("Date"),
    time: Joi.string().required().label("Time"),
    description: Joi.string().required().label("Description"),
    status: Joi.string().required().label("Status"),
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    console.log(error?.details[0].message);

    return error ? error?.details[0].message : null;
  };

  validate = () => {
    const { error } = Joi.validate(this.state.delivery, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = { ...this.state.errors };

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    const msg = this.validateProperty(target);

    const errors = {};

    if (msg) errors[name] = msg;
    else delete errors[name];

    this.setState((prevState) => ({
      delivery: { ...prevState.delivery, [name]: value },
      errors,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    if (errors) this.setState({ errors });
    else this.props.history.replace("/");
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const {
      delivery: { address, date, time, description, status },
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
                  name="address"
                  label="Address"
                  id="address"
                  type="text"
                  value={address}
                  error={errors.address}
                  handleChange={handleChange}
                />

                <FormInput
                  name="date"
                  label="Date"
                  id="date"
                  value={date}
                  type="date"
                  error={errors.date}
                  handleChange={handleChange}
                />
                <FormInput
                  name="time"
                  label="Time"
                  id="time"
                  value={time}
                  error={errors.time}
                  type="time"
                  handleChange={handleChange}
                />
                <FormInput
                  id="description"
                  label="Description"
                  value={description}
                  name="description"
                  error={errors.description}
                  type="text"
                  handleChange={handleChange}
                />

                <FormInput
                  id="status"
                  label="Status"
                  value={status}
                  name="status"
                  error={errors.status}
                  type="select"
                  handleChange={handleChange}
                />

                <div className="form__control load__btn">
                  <button>
                    <span className="load__btn-link">Next</span>
                    <BsChevronRight className="load__btn-icon left" />
                  </button>
                </div>
              </form>
              <button className="load__btn-times">
                <FaTimes className="load__btn-icon" />
                <Link
                  to="/form/delivery"
                  className="load__btn-link"
                  // onClick={this.props.history.replace("/form/delivery")}
                >
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
export default PickUp;
