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
  createType,
  deleteType,
  getType,
  updateType,
  getDetailType,
} from "../../service/type"; // ganti dengan service yang sesuai
import { confirmAlert } from "react-confirm-alert";

const ScreenTypes = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const getTypeData = async () => {
    setIsLoading(true);
    const result = await getType(); // ganti dengan API yang sesuai
    if (result.success) {
      setTypes(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      getTypeData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Type data!</h1>
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
            const result = await deleteType(id); // ganti dengan API yang sesuai
            if (result?.success) {
              toast.success("Data deleted successfully");
              getTypeData();
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
              <h3 className="text-primary">Type</h3>
              <h5 className="text-muted">Manage Type</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateType onTypeCreated={getTypeData} id={id} setId={setId} />
        </Col>
        <Col xs={6}>
          <ListGroup as="ul">
            {types.length === 0 ? (
              <h1>Types not found!</h1>
            ) : (
              types.map((type, index) => (
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
                        {type?.type_name} {/* Ganti dengan field yang sesuai */}
                      </h6>
                    </Col>

                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => setId(type.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, type.id)}
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

function CreateType({ onTypeCreated, id, setId }) {
  const [typeName, setTypeName] = useState(""); // Ganti dengan field yang sesuai
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const request = {
      typeName, // Ganti dengan field yang sesuai
    };

    const result = id
      ? await updateType(id, request) // ganti dengan API yang sesuai
      : await createType(request); // ganti dengan API yang sesuai

    setIsLoading(false);

    if (result?.success) {
      toast.success("Data created successfully");
      onTypeCreated();
      setTypeName(""); // Reset field
      setId(null);
      return;
    } else {
      alert(result?.message);
    }

    toast.error(result?.message);
  };

  useEffect(() => {
    const fetchTypeDetail = async () => {
      if (id) {
        setIsLoading(true);
        const result = await getDetailType(id); // ganti dengan API yang sesuai
        setIsLoading(false);
        if (result?.success) {
          setTypeName(result.data.type_name); // Ganti dengan field yang sesuai
        }
      }
    };

    fetchTypeDetail();
  }, [id]);

  return (
    <Card>
      <Card.Header className="text-center">Create Type</Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="type_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Type Name"
                  required
                  value={typeName}
                  onChange={(event) => {
                    setTypeName(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <div className="d-grid d-flex flex-row justify-content-end gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {id ? "Update Type" : "Create Type"}
              </Button>
              {id && (
                <Button
                  onClick={() => {
                    setId(null);
                    onTypeCreated();
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

export default ScreenTypes;
