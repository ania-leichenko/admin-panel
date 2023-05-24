import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import "./Registration.css";
import db from "../../firebaseConfig";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  function onChangeFirstName(e) {
    setFirstName(e.target.value);
  }

  function onChangeLastName(e) {
    setLastName(e.target.value);
  }

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePhoneNumber(e) {
    setPhone(e.target.value);
  }

  function onChangeDateOfBirth(e) {
    setDateOfBirth(e.target.value);
  }

  function onClickAddBtn(e) {
    e.preventDefault();

    const validationErrors = {};

    if (!firstName) {
      validationErrors.firstName = "First Name is required";
    }

    if (!lastName) {
      validationErrors.lastName = "Last Name is required";
    }

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!phone) {
      validationErrors.phone = "Phone Number is required";
    } else if (!isValidPhone(phone)) {
      validationErrors.phone = "Invalid phone number";
    }

    if (!dateOfBirth) {
      validationErrors.dateOfBirth = "Date of Birth is required";
    } else if (!isValidDateOfBirth(dateOfBirth)) {
      validationErrors.dateOfBirth = "Invalid date format";
    }

    if (Object.keys(validationErrors).length === 0) {
      db.collection("users")
        .add({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          dateOfBirth: dateOfBirth,
        })
        .then((docRef) => {
          console.log("Data successfully written:", docRef.id);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setDateOfBirth("");

          navigate("/");
        })
        .catch((error) => {
          console.error("Error writing data:", error);
        });
    } else {
      setErrors(validationErrors);
    }
  }

  function isValidEmail(email) {
    return email.includes("@");
  }

  function isValidPhone(phone) {
    return !isNaN(phone);
  }

  function isValidDateOfBirth(dateOfBirth) {
    return !isNaN(Date.parse(dateOfBirth));
  }

  return (
    <Container className="container">
      <Row className="justify-content-md-center">
        <Col sm></Col>
        <Col sm>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={onChangeFirstName}
                type="text"
                placeholder="Write your first name"
                value={firstName}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={onChangeLastName}
                type="text"
                placeholder="Write your last name"
                value={lastName}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={onChangeEmail}
                value={email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">+380</InputGroup.Text>
              <Form.Control
                type="tel"
                placeholder="Write your phone number"
                onChange={onChangePhoneNumber}
                value={phone}
                pattern="[0-9]*"
                required
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your date of birth"
                onChange={onChangeDateOfBirth}
                value={dateOfBirth}
                pattern="[0-9]*"
                required
                isInvalid={!!errors.dateOfBirth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col md={{ span: 10, offset: 10 }}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={onClickAddBtn}
                  className="add-btn"
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col sm></Col>
      </Row>
    </Container>
  );
}

export default Registration;
