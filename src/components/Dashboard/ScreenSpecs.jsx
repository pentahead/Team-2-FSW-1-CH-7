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
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const ScreenSpecs = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [specs, setSpecs] = useState([]);
  const [id, setId] = useState(null);

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["specs"],
    queryFn: () => getSpecs(),
    enabled: !!token,
  });

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    queryKey: ["specs", id],
    mutationFn: (id) => deleteSpec(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["specs"]);
      toast.success("Data deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setSpecs(data);
    }
  }, [data, isSuccess]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Spec data!</h1>
        </Col>
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
              <h3 className="text-primary">Spec</h3>
              <h5 className="text-muted">Manage Spec</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateSpec id={id} setId={setId} />
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
            {specs.length === 0 ? (
              <h1>Specs not found!</h1>
            ) : (
              specs.map((Specs, index) => (
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
                      <h6 className="mb-0 text-dark"> {Specs?.spec_name}</h6>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          as={Link}
                          variant="primary"
                          size="md"
                          onClick={() => setId(Specs.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, Specs.id)}
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

function CreateSpec({ id, setId }) {
  const [specName, setSpecName] = useState("");
  const queryClient = useQueryClient();

  const { mutate: specs, isPending: onProses } = useMutation({
    mutationFn: (body) => (!id ? createSpec(body) : updateSpec(id, body)),
    onSuccess: () => {
      queryClient.invalidateQueries(["specs"]);
      setSpecName("");
      setId(null);
      toast.success("Data berhasil disimpan.");
    },
    onError: (err) => {
      toast.error(`Terjadi kesalahan: ${err?.message || "Unknown error"}`);
    },
  });

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["specs", id],
    queryFn: () => getDetailSpec(id),
    enabled: !!id,
  });

  useEffect(() => {
    if ((isSuccess, data)) {
      setSpecName(data?.spec_name);
    }
  }, [isSuccess, data]);

  const onSubmit = (event) => {
    event.preventDefault();
    const request = { specName };
    specs(request);
  };

  return (
    <Card>
      <Card.Header className="text-center">
        {id ? "Edit Spec" : "Create Spec"}
      </Card.Header>
      <Card.Body>
        {isLoading || onProses ? (
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

            <div className=" d-flex flex-row justify-content-end gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {id ? "Update Specs " : "Create Specs"}
              </Button>
              {id && (
                <Button
                  onClick={() => {
                    setId(null);
                    setSpecName("");
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
