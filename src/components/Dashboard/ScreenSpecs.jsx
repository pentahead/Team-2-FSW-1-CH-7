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
  getSpecs,
  getDetailSpec,
  createSpec,
  updateSpec,
  deleteSpec,
} from "../../service/specs";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

const ScreenSpecs = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [specs, setSpec] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(null);

  const getSpecData = async () => {
    setIsLoading(true);
    const result = await getSpecs();
    if (result.success) {
      setSpec(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      getSpecData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Spec data!</h1>
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
            const result = await deleteSpec(id);
            if (result?.success) {
              toast.success("Data deleted successfully");
              getSpecData();
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
              <h3 className="text-primary">Spec</h3>
              <h5 className="text-muted">Manage Spec</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateSpec onSpecCreated={getSpecData} id={id} setId={setId} />
        </Col>
        <Col xs={6}>
          <ListGroup as="ul">
            {specs.length === 0 ? (
              <h1>Specs not found!</h1>
            ) : (
              specs.map((specs, index) => (
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
                      <h6 className="mb-0 text-dark"> {specs?.spec_name}</h6>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          as={Link}
                          variant="primary"
                          size="md"
                          onClick={() => setId(specs.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, specs.id)}
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

function CreateSpec({ onSpecCreated, id, setId }) {
  const [specName, setSpecName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the form is being submitted

    const request = {
      specName,
    };

    const result = id
      ? await updateSpec(id, request)
      : await createSpec(request);

    setIsLoading(false); // Set loading to false after the request is complete

    if (result?.success) {
      toast.success("Data created successfully");
      onSpecCreated();
      setSpecName("");
      setId(null);
      return;
    } else {
      alert(result?.message);
    }

    toast.error(result?.message);
  };

  useEffect(() => {
    const fetchSpecDetail = async () => {
      if (id) {
        setIsLoading(true); // Set loading to true when fetching data
        const result = await getDetailSpec(id);
        setIsLoading(false); // Set loading to false after fetching is done
        if (result?.success) {
          setSpecName(result.data.spec_name);
        }
      }
    };

    fetchSpecDetail();
  }, [id]);

  return (
    <Card>
      <Card.Header className="text-center">Create Spec</Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="spec_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  value={specName}
                  onChange={(event) => setSpecName(event.target.value)}
                />
              </Col>
            </Form.Group>

            <div className="d-grid d-flex flex-row justify-content-end gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? "Update Specs" : "Create Specs"}
              </Button>
              {id && (
                <Button
                  onClick={() => {
                    setId(null);
                    onSpecCreated();
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

export default ScreenSpecs;
