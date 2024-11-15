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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ScreenTransmissions = () => {
  const { token } = useSelector((state) => state.auth);

  const [transmissions, setTransmissions] = useState([]);
  const [id, setId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["transmissions"],
    queryFn: () => getTransmission(),
    enabled: !!token,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setTransmissions(data);
    }
  }, [isSuccess, data]);

  const { mutate: deleting, isPending: onProses } = useMutation({
    queryKey: ["transmissions", id],
    mutationFn: (id) => deleteTransmission(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["transmissions"]);
      toast.success("Data deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

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
              <h3 className="text-primary">Transmission</h3>
              <h5 className="text-muted">Manage Transmission</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateTransmission id={id} setId={setId} />
        </Col>
        <Col xs={6}>
          {isLoading ||
            (onProses && (
              <Row
                className="mt-4 d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
              >
                <MoonLoader color="#1306ff" />
              </Row>
            ))}
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
  const queryClient = useQueryClient();

  const { mutate: transmissions, isPending: onProses } = useMutation({
    mutationFn: (body) => {
      return !id ? createTransmission(body) : updateTransmission(id, body);
    },
    onSuccess: () => {
      setTransmissionName("");
      setId(null);
      queryClient.invalidateQueries(["transmissions"]);
      toast.success("Data berhasil disimpan.");
    },
    onError: (err) => {
      toast.error(`Terjadi kesalahan: ${err?.message || "Unknown error"}`);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const request = {
      transmissionName,
    };

    transmissions(request);
  };

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["manufactures", id],
    queryFn: () => getDetailTransmission(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      setTransmissionName(data.transmission_name);
    }
  }, [isSuccess, data, isError]);

  return (
    <Card>
      <Card.Header className="text-center">Create Transmission</Card.Header>
      <Card.Body>
        {isLoading || onProses ? (
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
