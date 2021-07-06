import React from "react";
import { Button } from "react-bootstrap";
import { MdDelete, MdRateReview } from "react-icons/md";

const UsersBody = ({ data: users, handleDelete, UserView }) => {
  return (
    <tbody>
      {users.map(
        ({ id, name, username, email, phone, address, company }, index) => (
          <tr key={id || index}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{address.city}</td>
            <td>{company.name}</td>
            <td>
              <Button
                className="btn btn-primary mr-3"
                onClick={() => UserView(id)}
              >
                <MdRateReview />
              </Button>
              <Button
                className="btn-danger ml-3"
                onClick={() => handleDelete(id)}
              >
                <MdDelete />
              </Button>
            </td>
          </tr>
        )
      )}
    </tbody>
  );
};

export default UsersBody;
