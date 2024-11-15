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
  getOption,
  getDetailOption,
  createOption,
  updateOption,
  deleteOption,
} from "../../service/option";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ScreenOptions = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [options, setOption] = useState([]);
  const [id, setId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["option"],
    queryFn: () => getOption(),
    enabled: !!token,
    refetchOnWindowFocus: true,
  });

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    queryKey: ["option", id],
    mutationFn: (id) => deleteOption(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["option"]);
      toast.success("Data deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOption(data);
    }
  }, [isSuccess, data]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get Option data!
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
              <h3 className="text-primary">Option</h3>
              <h5 className="text-muted">Manage Option</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateOption id={id} setId={setId} />
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
            {options.length === 0 ? (
              <h1>Options not found!</h1>
            ) : (
              options.map((options, index) => (
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
                        {options?.option_name}
                      </h6>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          as={Link}
                          variant="primary"
                          size="md"
                          onClick={() => setId(options.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, options.id)}
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

function CreateOption({ id, setId }) {
  const [optionName, setOptionName] = useState("");
  const queryClient = useQueryClient();
  const { mutate: option, isPending: onProses } = useMutation({
    mutationFn: (body) => {
      return !id ? createOption(body) : updateOption(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["option"]);
      setId(null);
      setOptionName("");
      toast.success("Data berhasil disimpan.");
    },
    onError: (err) => {
      toast.error(`Terjadi kesalahan: ${err?.message || "Unknown error"}`);
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      optionName,
    };

    option(request);
  };
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["option", id],
    queryFn: () => getDetailOption(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      setOptionName(data.option_name); 
    }
  }, [isSuccess, data, isError]);
  return (
    <Card>
      <Card.Header className="text-center">Create Option</Card.Header>
      <Card.Body>
        {isLoading || onProses ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="option_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  value={optionName}
                  onChange={(event) => setOptionName(event.target.value)}
                />
              </Col>
            </Form.Group>

            <div className=" d-flex flex-row justify-content-end gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {id ? "Update Option " : "Create Option"}
              </Button>
              {id && (
                <Button
                  onClick={() => {
                    setId(null);
                    setOptionName("");
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

export default ScreenOptions;
