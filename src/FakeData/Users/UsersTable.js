import React, { Component } from "react";
import UsersHeader from "./UsersHeader";
import UsersBody from "./UsersBody";
import { Table } from "react-bootstrap";

class UsersTable extends Component {
  UserView = (id) => {
    this.props.history.push(`/user/${id}`);
  };

  render() {
    const { users, handleDelete } = this.props;
    return (
      <Table bordered hover className="container container__top text-center">
        <UsersHeader />
        <UsersBody
          data={users}
          UserView={this.UserView}
          handleDelete={handleDelete}
        />
      </Table>
    );
  }
}

export default UsersTable;
