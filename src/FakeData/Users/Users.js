import React, { Component } from "react";
import Loader from "react-loader-spinner";
import UserForm from "../User/UserForm";
import { toast } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import Joi from "joi-browser";
import UsersTable from "./UsersTable";
import { UsersLoader } from "../../styled/fakeData/Users";
import "bootstrap/dist/css/bootstrap.css";
import "./users.css";
import User from "../User/User";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {
        name: "",
        username: "",
        email: "",
        phone: "",
        address: {
          city: "",
        },
        company: {
          name: "",
        },
      },
      errors: {},
    };
  }

  async componentDidMount() {
    const data = await fetch("http://jsonplaceholder.typicode.com/users");
    const users = await data.json();
    this.setState({ users });
  }

  schema = {
    name: Joi.string().required().label("Name"),
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().email().label("Email"),
    phone: Joi.number().required().label("Number"),
    address: Joi.required().label("City"),
    company: Joi.required().label("Company Name"),
  };

  validate = () => {
    const { error } = Joi.validate(this.state.user, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "address") {
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          [name]: {
            city: value,
          },
        },
      }));
    } else if (name === "company") {
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          [name]: {
            name: value,
          },
        },
      }));
    } else {
      this.setState((prevState) => ({
        user: { ...prevState.user, [name]: value },
      }));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    console.log(errors);

    if (errors)
      toast.error("Malumot qushish uchun Inputlarni to'ldirishingiz shart!");
    else {
      this.setState((prevState) => ({
        users: [
          ...prevState.users,
          { ...prevState.user, id: prevState.users.length + 1 },
        ],
      }));
      toast.success("Malumot qushish mufaqatiyatli yakunlandi");
    }
  };

  handleDelete = (id) => {
    const users = this.state.users.filter((item) => item.id !== id);
    this.setState({ users });
    toast.info(`Id = ${id} ga teng malumotingiz o'chirildi`);
  };

  render() {
    const { users, user } = this.state;
    const { handleSubmit, handleChange, handleDelete } = this;
    if (users.length === 0)
      return (
        <UsersLoader>
          <Loader type="Audio" color="#00BFFF" height={100} width={100} />
        </UsersLoader>
      );
    return (
      <Switch>
        <Route
          path="/users"
          render={(props) => (
            <UsersTable {...props} users={users} handleDelete={handleDelete} />
          )}
        />
        <Route
          path="/add"
          render={(props) => (
            <UserForm
              {...props}
              user={user}
              onSubmit={handleSubmit}
              onChange={handleChange}
            />
          )}
        />
        <Route path="/user/:id" component={User} />
      </Switch>
    );
  }
}

export default Users;
