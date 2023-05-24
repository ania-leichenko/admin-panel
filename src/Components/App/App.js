import "./App.css";
import UsersTable from "../UsersTable/UsersTable";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { fetchUsers } from "../UsersTable/usersData";
import { BsSearch } from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchUsers()
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => {
        console.error("Error while getting data:", error);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    return user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
  });

  return (
    <div>
      <Form.Group controlId="searchEmail" className="searchEmail">
        <Form.Label className="form-label">Search by Email:</Form.Label>
        <InputGroup className="w-50">
          <InputGroup.Text id="basic-addon1">
            <BsSearch></BsSearch>
          </InputGroup.Text>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Form.Group>
      <UsersTable sortedUsers={sortedUsers} searchTerm={searchTerm} />
    </div>
  );

}

export default App;
