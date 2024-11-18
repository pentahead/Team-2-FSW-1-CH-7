import { Container, Col, Row, Button, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CarItem from "../Car";
import MyVerticallyCenteredModal from "../Modals";
import { getCars } from "../../service/cars";
import { MoonLoader } from "react-spinners";
import FormComponent from "./FormComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import FormComponent from "./FormComponent";

const ScreenCars = () => {
  const [modalShow, setModalShow] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [openForm, setOpenForm] = useState(false);

  const [cars, setCars] = useState([]);
  const [id, setId] = useState(null);
  const isEditMode = !!id;
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["car"],
    queryFn: () => getCars(),
    enabled: !!token,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setCars(data);
    }
  }, [isSuccess, data]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Car data!</h1>
        </Col>
      </Row>
    );
  }

  if (isLoading) {
    return (
      <Row
        className="mt-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <MoonLoader color="#1306ff" />
      </Row>
    );
  }
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h3 className="text-primary">Cars</h3>
                <h5 className="text-muted">Manage of Cars</h5>
              </div>
              <Button
                onClick={() => {
                  setOpenForm(true);
                  setId(null);
                }}
                variant="success"
                disabled={isEditMode}
                className="d-flex align-items-center"
              >
                <i
                  className="bi bi-plus-circle me-2"
                  style={{ fontSize: "1.2rem" }}
                ></i>{" "}
                Add New Car
              </Button>
            </div>

            {/* Category Filter Section */}
            <Row>
              <ListGroup horizontal className="px-3 gap-3 w-25">
                <ListGroup.Item action>All</ListGroup.Item>
                <ListGroup.Item action>Small</ListGroup.Item>
                <ListGroup.Item action>Medium</ListGroup.Item>
                <ListGroup.Item action>Large</ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Row>

        <Row className="mt-3">
          {!openForm ? (
            cars.length === 0 ? (
              <h1>Cars not found!</h1>
            ) : (
              <Row className="mt-3">
                {cars.map((car) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={car?.id}
                    className="mb-4"
                  >
                    <CarItem
                      modalConfig={{
                        setModalShow,
                        modalShow,
                      }}
                      setId={setId}
                      car={car}
                    />
                  </Col>
                ))}
              </Row>
            )
          ) : (
            <FormComponent
              setOpenForm={setOpenForm}
              id={id}
              setId={setId}
              getCarData={data}
            />
          )}
        </Row>
      </Container>

      
      <MyVerticallyCenteredModal
        show={modalShow}
        setOpenForm={setOpenForm}
        getCarData={cars}
        id={id}
        setId={setId}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </>
  );
};

export default ScreenCars;
