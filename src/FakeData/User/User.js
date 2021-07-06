import React, { Component } from "react";
import { MarginTop } from "../../styled/fakeData/Users";

class User extends Component {
  state = {
    user: {
      address: {
        city: "",
      },
      company: {
        name: "",
      },
    },
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const data = await fetch(`http://jsonplaceholder.typicode.com/users/${id}`);
    const user = await data.json();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container">
        <MarginTop>
          <p>userId : {user.id}</p>
          <p>userName : {user.name}</p>
          <p>userEmail : {user.email}</p>
          <p>userPhone : {user.phone}</p>
          <p>userCity : {user.address.city}</p>
          <p>userCompany : {user.company.name}</p>
        </MarginTop>
      </div>
    );
  }
}
export default User;
