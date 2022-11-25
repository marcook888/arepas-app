import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../css/NavBar.css";
import logo from "../imagenes/arepa.png";
import Cookies from "universal-cookie";

import { Link } from "react-router-dom";
const cookies = new Cookies();


class NavigationBar extends Component {
  cerrarSesion = () => {
    cookies.set("id", { path: "/" });
    cookies.remove("Email", { path: "/" });
    cookies.remove("Password", { path: "/" });
    cookies.remove("FirstName", { path: "/" });
    cookies.remove("LastName", { path: "/" });
    cookies.remove("BirthofDate", { path: "/" });
    cookies.remove("RegisterDate", { path: "/" });
    cookies.remove("Address", { path: "/" });
    cookies.set("log", false, { path: "/" });
    window.location.href = "/";
  };

  componentDidMount() {
    if (cookies.get("FirstName")) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    // eslint-disable-next-line
    if (cookies.get("log") === "false" || cookies.get("log") == undefined) {
      return (
        <Navbar className="navbar border border-white ">
          <img src={logo} className="App-logo" alt="lol" />
          <Navbar.Brand className="text-light letrica">P&A</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
              <Nav.Link as={Link} className="text-light letrica" to="/">Menu</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Item>
              <Nav.Link as={Link} className="text-light letrica" to="/Login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link as={Link} className="text-light letrica" to="/Register">Registrate</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    // eslint-disable-next-line
    if (cookies.get("log") === "true") {
      return (
        <Navbar className="navbar border border-white ">
          <img src={logo} className="App-logo" alt="lol" />
          <Navbar.Brand className="text-light letrica">P&A</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
              <Nav.Link as={Link} className="text-light letrica" to="/">Menu</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Item>
              <Nav.Link as={Link} className="text-light letrica" to="/Carrito">Carrito</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link as={Link} className="text-light letrica" to="/" onClick={() => this.cerrarSesion()}>Cerrar sesion</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

export default NavigationBar;
