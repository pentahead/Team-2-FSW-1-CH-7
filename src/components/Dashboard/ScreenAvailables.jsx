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

import { confirmAlert } from "react-confirm-alert";
import {
  createAvailable,
  deleteAvailable,
  updateAvailable,
  getDetailAvailable,
  getAvailables,
} from "../../service/availables";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ScreenAvailables = () => {
  const { token } = useSelector((state) => state.auth);

  const [availables, setAvailables] = useState([]);
  const [id, setId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["available"],
    queryFn: () => getAvailables(),
    enabled: !!token,
    refetchOnWindowFocus: true,
  });

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    queryKey: ["available", id],
    mutationFn: (id) => deleteAvailable(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["available"]);
      toast.success("Data deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setAvailables(data);
    }
  }, [isSuccess, data]);

  const onDelete = async (event, id) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            deleting(id);
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
              <h3 className="text-primary">Available</h3>
              <h5 className="text-muted">Manage Available</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateAvailable id={id} setId={setId} />
        </Col>
        <Col xs={6}>
          {isLoading ||
            (isDeleteProcessing && (
              <Row
                className="mt-4 d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
              >
                <MoonLoader color="#1306ff" />
              </Row>
            ))}
          <ListGroup as="ul">
            {availables.length === 0 ? (
              <h1>Availables not found!</h1>
            ) : (
              availables.map((available, index) => (
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
                        {available?.available_status}{" "}
                      </h6>
                    </Col>

                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => setId(available.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, available.id)}
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

function CreateAvailable({ id, setId }) {
  const [availableStatus, setAvailableStatus] = useState(""); // Ganti dengan field yang sesuai

  const queryClient = useQueryClient();

  const { mutate: available, isPending: onProses } = useMutation({
    mutationFn: (body) => {
      return !id ? createAvailable(body) : updateAvailable(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["available"]);
      setId(null);
      setAvailableStatus(""); // Reset field
      toast.success("Data berhasil disimpan.");
    },
    onError: (err) => {
      toast.error(`Terjadi kesalahan: ${err?.message || "Unknown error"}`);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const request = {
      availableStatus,
    };

    available(request);
  };

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["available", id],
    queryFn: () => getDetailAvailable(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      setAvailableStatus(data.available_status);
    }
  }, [isSuccess, data, isError]);

  return (
    <Card>
      <Card.Header className="text-center">Create Available</Card.Header>
      <Card.Body>
        {isLoading || onProses ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="available_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Available Name"
                  required
                  value={availableStatus}
                  onChange={(event) => {
                    setAvailableStatus(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <div className="d-flex flex-row justify-content-end gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {id ? "Update Available" : "Create Available"}
              </Button>
              {id && (
                <Button
                  onClick={() => {
                    setId(null);
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

export default ScreenAvailables;
