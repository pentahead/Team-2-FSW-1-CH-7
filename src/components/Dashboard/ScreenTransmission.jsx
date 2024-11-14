import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Form,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import {
  createTransmission,
  deleteTransmission,
  getTransmission,
  updateTransmission,
  getDetailTransmission,
} from "../../service/transmission";
import { confirmAlert } from "react-confirm-alert";

const ScreenTransmissions = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [transmissions, setTransmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const getTransmissionData = async () => {
    setIsLoading(true);
    const result = await getTransmission();
    if (result.success) {
      setTransmissions(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      getTransmissionData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get Transmission data!
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
            const result = await deleteTransmission(id);
            if (result?.success) {
              toast.success("Data deleted successfully");
              getTransmissionData();
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
              <h3 className="text-primary">Transmission</h3>
              <h5 className="text-muted">Manage Transmission</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateTransmission
            onTransmissionCreated={getTransmissionData}
            id={id}
            setId={setId}
          />
        </Col>
        <Col xs={6}>
          <ListGroup as="ul">
            {transmissions.length === 0 ? (
              <h1>Transmissions not found!</h1>
            ) : (
              transmissions.map((transmission, index) => (
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
                        {transmission?.transmission_name}
                      </h6>
                    </Col>

                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => setId(transmission.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, transmission.id)}
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

function CreateTransmission({ onTransmissionCreated, id, setId }) {
  const [transmissionName, setTransmissionName] = useState("");
  const [transmissionRegion, setTransmissionRegion] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const request = {
      transmissionName,
    };

    const result = id
      ? await updateTransmission(id, request)
      : await createTransmission(request);

    setIsLoading(false);

    if (result?.success) {
      toast.success("Data created successfully");
      onTransmissionCreated();
      setTransmissionName("");
      setId(null);
      return;
    } else {
      alert(result?.message);
    }

    toast.error(result?.message);
  };

  useEffect(() => {
    const fetchTransmissionDetail = async () => {
      if (id) {
        setIsLoading(true);
        const result = await getDetailTransmission(id);
        setIsLoading(false);
        if (result?.success) {
          setTransmissionName(result.data.transmission_name);
          setYear(result.data.year);
        }
      }
    };

    fetchTransmissionDetail();
  }, [id]);

  return (
    <Card>
      <Card.Header className="text-center">Create Transmission</Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="transmission_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  value={transmissionName}
                  onChange={(event) => {
                    setTransmissionName(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <div className=" d-flex flex-row justify-content-end gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {id ? "Update Transmissions " : "Create Transmissions"}
              </Button>
              {id && (
                <Button
                  onClick={() => {
                    setId(null);
                    onTransmissionCreated();
                  }}
                  // type="submit"
                  variant="danger"
                >
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default ScreenTransmissions;
