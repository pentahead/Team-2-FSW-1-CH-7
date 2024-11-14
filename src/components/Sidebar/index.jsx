/* eslint-disable react/prop-types */
import {
  Container,
  Row,
  Col,
  Nav,
  Dropdown,
  Collapse,
  Image,
  Navbar,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { useCallback, useEffect, useState } from "react";
import { profile } from "../../service/auth";
import { useQuery } from "@tanstack/react-query";

function NavbarLocal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const handleLogout = useCallback(() => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/login" });
  }, [dispatch, navigate]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: token ? true : false,
  });

  const logout = (event) => {
    event.preventDefault();

    handleLogout();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    } else if (isError) {
      handleLogout();
    }
  }, [isSuccess, isError, data, dispatch, handleLogout]);

  return (
    <>
      <Navbar expand="lg" className="bg-whiteshadow-sm">
        <Container
          fluid
          className="d-flex flex-row justify-content-end  gap-2  "
        >
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav>
            <Nav.Link>
              <Image
                src={user?.profile_picture}
                fluid
                style={{
                  width: "30px",
                  height: "30px",
                  display: "inline-block",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              />
            </Nav.Link>
            <Dropdown as={ButtonGroup} className="border-0 me-5">
              <Button className="bg-white px-4 text-black border-0">
                {user?.name}
              </Button>

              <Dropdown.Toggle
                split
                // variant="success"
                id="dropdown-split-basic"
                className=" bg-white border-0 text-black"
              />

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

function Sidebar({
  openCars,
  setOpenCars,
  openTransmission,
  setOpenTransmission,
  openModel,
  setOpenModel,
  openManufacture,
  setOpenManufacture,
  openType,
  setOpenType,
  openAvailables, // konsisten dengan "openAvailables"
  setOpenAvailables, // konsisten dengan "setOpenAvailables"
  openSpec,
  setOpenSpec,
  openOptions,
  setOpenOptions,
  children,
}) {
  const handleClick = (setterFunction) => {
    setOpenCars(false);
    setOpenTransmission(false);
    setOpenModel(false);
    setOpenManufacture(false);
    setOpenCars(false);
    setOpenType(false);
    setOpenAvailables(false);
    setOpenSpec(false);
    setOpenOptions(false);
    setterFunction((prev) => !prev); // Toggle the state
  };

  return (
    <>
      <Container fluid>
        <Row className="flex-nowrap w-">
          <Col
            xs="auto"
            md={3}
            xl={2}
            className="bg-white shadow-sm px-0 mx-0 "
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-0 pt-0 text-black max-vh-100 m-0 p-0">
              <Nav
                className="flex-column mb-sm-auto align-items-center align-items-sm- w-100 m-0 p-0 m-0"
                id="menu"
              >
                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openCars ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenCars)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Cars
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openTransmission ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenTransmission)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Transmission
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openModel ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenModel)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Models
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openManufacture ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenManufacture)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Manufacturer
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openType ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenType)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Type
                    </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openAvailables ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenAvailables)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Availables
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openSpec ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenSpec)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Spec
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openOptions ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenOptions)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      options
                    </span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>

          <Col
            className="m-0 p-0   min-vh-100 "
            style={{ background: "#F4F5F7" }}
          >
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default function IndexSidebar({
  openCars,
  setOpenCars,
  openTransmission,
  setOpenTransmission,
  openModel,
  setOpenModel,
  openManufacture,
  setOpenManufacture,
  openType,
  setOpenType,
  openAvailables, // konsisten dengan "openAvailables"
  setOpenAvailables, // konsisten dengan "setOpenAvailables"
  openSpec,
  setOpenSpec,
  openOptions,
  setOpenOptions,
  children,
}) {
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            xs="auto"
            md={1}
            xl={1}
            className=" p-0"
            style={{ width: "3rem", background: "#0D28A6" }}
          >
            <div className="d-flex flex-column  align-items-center align-items-sm-start  text-black   min-vh-100 overflow-hidden  m-0 p-0 mt-3 pt-5 ">
              <Nav
                // variant="pills"
                className="flex-column mb-sm-auto align-items-center align-items-sm- w-100 m-0 p-0 m-0"
                id="menu"
              >
                <Nav.Item
                  as={Row}
                  className=" w-100  "
                  // style={{ background: "#CFD4ED" }}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0"
                  >
                    <i className="ms-3 ps-3 bi bi-house fs-5 fw-bold text-center"></i>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  as={Row}
                  className=" w-100  "
                  style={{ background: "#CFD4ED" }}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0"
                  >
                    <i className="ms-3 ps-3 bi bi-car-front-fill  fs-5 fw-bold text-center"></i>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          <Col className="p-0 m-0">
            <NavbarLocal />
            <Sidebar
              openCars={openCars}
              setOpenCars={setOpenCars}
              openTransmission={openTransmission}
              setOpenTransmission={setOpenTransmission}
              openModel={openModel}
              setOpenModel={setOpenModel}
              openManufacture={openManufacture}
              setOpenManufacture={setOpenManufacture}
              openType={openType}
              setOpenType={setOpenType}
              setOpenAvailables={setOpenAvailables} // Pastikan ini diteruskan ke layout
              setOpenSpec={setOpenSpec}
              setOpenOptions={setOpenOptions}
              openAvailables={openAvailables} // Pastikan ini diteruskan ke layout
              openSpec={openSpec}
              openOptions={openOptions}
            >
              {children}
            </Sidebar>
          </Col>
        </Row>
      </Container>
    </>
  );
}
