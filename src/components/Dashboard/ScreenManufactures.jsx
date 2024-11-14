import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  createManufacture,
  deleteManufacture,
  getDetailManufacture,
  getManufacture,
  updateManufacture,
} from "../../service/manufacture";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

const ScreenManufactures = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [manufactures, setManufactures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(null);

  const getManufactureData = async () => {
    setIsLoading(true);
    const result = await getManufacture();
    if (result.success) {
      setManufactures(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      getManufactureData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get Manufacture data!
          </h1>
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

  const onDelete = async (event, id) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteManufacture(id);
            if (result?.success) {
              toast.success("Data deleted successfully");
              getManufactureData();
              return;
            }

            toast.error(result?.message);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Container className="mt-2">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="text-primary">Manufacture</h3>
              <h5 className="text-muted">Manage Manufacture</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateManufacture
            onManufactureCreated={getManufactureData}
            id={id}
            setId={setId}
          />
        </Col>
        <Col xs={6}>
          <ListGroup as="ul">
            {manufactures.length === 0 ? (
              <h1>Manufactures not found!</h1>
            ) : (
              manufactures.map((manufacture, index) => (
                <ListGroup.Item
                  as="li"
                  key={index}
                  className="py-3 border-bottom"
                >
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <span>{index + 1}</span>
                    </Col>
                    <Col>
                      <h6 className="mb-0 text-dark">
                        {" "}
                        {manufacture?.manufacture_name}
                      </h6>
                    </Col>
                    <Col>
                      <h6 className="mb-0 text-dark">
                        {" "}
                        {manufacture?.manufacture_region}
                      </h6>
                    </Col>
                    <Col>
                      <h6 className="mb-0 text-dark">
                        {manufacture?.year_establish}
                      </h6>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          as={Link}
                          variant="primary"
                          size="md"
                          onClick={() => setId(manufacture.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, manufacture.id)}
                          variant="danger"
                          size="md"
                        >
                          Delete
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

function CreateManufacture({ onManufactureCreated, id, setId }) {
  const [manufactureName, setManufactureName] = useState("");
  const [manufactureRegion, setManufactureRegion] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the form is being submitted

    const request = {
      manufactureName,
      manufactureRegion,
      year,
    };

    const result = id
      ? await updateManufacture(id, request)
      : await createManufacture(request);

    setIsLoading(false); // Set loading to false after the request is complete

    if (result?.success) {
      toast.success("Data created successfully");
      onManufactureCreated();
      setManufactureName("");
      setManufactureRegion("");
      setYear("");
      setId(null);
      return;
    } else {
      alert(result?.message);
    }

    toast.error(result?.message);
  };

  useEffect(() => {
    const fetchManufactureDetail = async () => {
      if (id) {
        setIsLoading(true); // Set loading to true when fetching data
        const result = await getDetailManufacture(id);
        setIsLoading(false); // Set loading to false after fetching is done
        if (result?.success) {
          setManufactureName(result.data.manufacture_name);
          setManufactureRegion(result.data.manufacture_region);
          setYear(result.data.year_establish);
        }
      }
    };

    fetchManufactureDetail();
  }, [id]);

  return (
    <Card>
      <Card.Header className="text-center">Create Manufacture</Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="manufacture_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  value={manufactureName}
                  onChange={(event) => setManufactureName(event.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="manufacture_region"
            >
              <Form.Label column sm={3}>
                Manufacture region
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Manufacture region"
                  required
                  value={manufactureRegion}
                  onChange={(event) => setManufactureRegion(event.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="year">
              <Form.Label column sm={3}>
                Year
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="number"
                  placeholder="Year"
                  required
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                />
              </Col>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading
                  ? id
                    ? "Updating..."
                    : "Creating..."
                  : id
                    ? "Update Manufacture"
                    : "Create Manufacture"}
              </Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default ScreenManufactures;
