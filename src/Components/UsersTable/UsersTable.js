import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Outlet, Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import db from "../../firebaseConfig";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./UsersTable.css";
import { fetchUsers } from "./usersData";

function UsersTable({ sortedUsers, searchTerm }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 11;

  useEffect(() => {
    fetchUsers()
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const filteredUsers = sortedUsers.filter((user) =>
    user.email.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (e, userId, field) => {
    const updatedUsers = sortedUsers.map((user) => {
      if (user.id === userId) {
        return { ...user, [field]: e.target.value };
      }
      return user;
    });
    setUsers(updatedUsers);
    db.collection("users")
      .doc(userId)
      .update({ [field]: e.target.value })
      .then(() => {
        console.log("The data was successfully updated in the database.");
      })
      .catch((error) => {
        console.error("Error while updating data:", error);
      });
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Link to="/add-user" className="add-new-user">
                <FiUserPlus />
                Add a user
              </Link>
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => {
            const userIndex = indexOfFirstUser + index + 1;

            return (
              <tr key={index}>
                <td>{userIndex}</td>
                <td>
                  <Form.Control
                    value={user.firstName}
                    onChange={(e) => handleInputChange(e, user.id, "firstName")}
                  />
                </td>
                <td>
                  <Form.Control
                    value={user.lastName}
                    onChange={(e) => handleInputChange(e, user.id, "lastName")}
                  />
                </td>
                <td>
                  <Form.Control
                    value={user.email}
                    onChange={(e) => handleInputChange(e, user.id, "email")}
                  />
                </td>
                <td>
                  <Form.Control
                    value={"+380" + user.phone}
                    onChange={(e) => handleInputChange(e, user.id, "phone")}
                  />
                </td>
                <td>
                  <Form.Control
                    value={user.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange(e, user.id, "dateOfBirth")
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Container className="d-flex justify-content-center">
        <Row>
          <Col>
            <Pagination>
              {Array.from({ length: totalPages }).map((item, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>

      <Outlet />
    </div>
  );
}

export default UsersTable;
