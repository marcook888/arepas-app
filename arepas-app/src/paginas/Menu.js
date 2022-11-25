import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button, Container, Form, Card, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import { imagesUrl } from "../conexiones/urls";
import { useDispatch } from "react-redux";
import { shopitem } from "../actions/actions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { log , logout } from "../actions/actions";
import Cookies from "universal-cookie";
import "../App.css";


function Menu2() {
  //state functionality
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [XTotalCount] = useState(3);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");
  const cookies = new Cookies();

  let selector = useSelector((state) => state.logged.log);

  let id = cookies.get("id");
  let Email = cookies.get("Email");
  let Password = cookies.get("Email");
  let FirstName = cookies.get("FirstName");
  let LastName = cookies.get("LastName");
  let BirthofDate = cookies.get("BirthofDate");
  let RegisterDate = cookies.get("RegisterDate");
  let Address = cookies.get("Address");
  let PhoneNumber = cookies.get("PhoneNumber");

  useEffect(() => {
    loadUsersData(0, 3, 0);
    console.log(cookies.get('Error'))
    if(cookies.get('log') === "true"){
      console.log('xd');
      dispatch(
        log(
          id,
          Email,
          Password,
          FirstName,
          LastName,
          BirthofDate,
          RegisterDate,
          Address,
          PhoneNumber
        )
      );
    }else{
      dispatch(logout)
    }
  }, []);

  const loadUsersData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(
            `http://localhost:3000/arepas?q=${value}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3000/arepas?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "filter":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3000/arepas?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      default:
        return await axios
          .get(`http://localhost:3000/arepas?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    loadUsersData(0, 3, 0, "search");
  };

  const renderPagination = () => {
    if (data.length < 3 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <button
              className="btn btn-outline-light"
              onClick={() => loadUsersData(3, 6, 1, operation)}
            >
              Siguiente
            </button>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (
      currentPage < XTotalCount + XTotalCount &&
      data.length === XTotalCount
    ) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <button
              className="btn btn-outline-light"
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 3,
                  currentPage * 3,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Anterior
            </button>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <button
              className="btn btn-outline-light"
              onClick={() =>
                loadUsersData(
                  (currentPage + 1) * 3,
                  (currentPage + 2) * 3,
                  1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Siguiente
            </button>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <button
              className="btn btn-outline-light"
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 3,
                  currentPage * 3,
                  -1,
                  operation
                )
              }
            >
              Anterior
            </button>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return (
    <Container fluid>
      <h1 className="letrica text-white">!!!Arepas!!!</h1>
      <div className="border-bottom border border-white mx-auto"></div>
      <div className="pt-3">
        <Navbar expand="lg" bg="dark" variant="dark" className="rounded">
          <Container>
            <form
              style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
              }}
              className="d-flex input-group w-auto"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Busca un ingrediente... "
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <button type="submit" className="btn btn-outline-success">
                Buscar
              </button>
            </form>
          </Container>
        </Navbar>
      </div>
      <Row xs={3} md={3} className="g-4">
        {data.map((item) => (
          <Col key={item.id}>
            <Container>
              <Card>
                <Link to="/Details" state={{ Id: item.id }}>
                  <Card.Img
                    variant="top"
                    src={`${imagesUrl + item.Image}`}
                    className="img-thumbnail"
                  />
                </Link>
                <Card.Body className="description">
                  <Card.Title>{item.Name}</Card.Title>
                  <Card.Text>{item.Description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  {selector == true  && (
                    <Button
                    className="left"
                    variant="outline-danger"
                    onClick={() => dispatch(shopitem(item.id))}
                  >
                    carrito
                  </Button>
                  )}
                  
                  <Button className="left" variant="outline-success">
                    Ordenar por ${item.Price}!!
                  </Button>
                </Card.Footer>
              </Card>
            </Container>
          </Col>
        ))}
      </Row>

      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "250px",
          alignContent: "center",
        }}
      >
        {renderPagination()}
      </div>
    </Container>
  );
}

export default Menu2;
