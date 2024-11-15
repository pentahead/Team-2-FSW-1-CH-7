import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  ListGroup,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ScreenManufactures = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const [manufactures, setManufactures] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(null);

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["manufactures"],
    queryFn: () => getManufacture(),
    enabled: !!token,
  });

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    queryKey: ["manufactures", id],
    mutationFn: (id) => deleteManufacture(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["manufactures"]);
      toast.success("Data deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setManufactures(data);
    }
  }, [data, isSuccess]);

  // if (!token) {
  //   return (
  //     <Row className="mt-4">
  //       <Col>
  //         <h1 className="text-center">
  //           Please login first to get Manufacture data!
  //         </h1>
  //       </Col>
  //     </Row>
  //   );
  // }

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
              <h3 className="text-primary">Manufacture</h3>
              <h5 className="text-muted">Manage Manufacture</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateManufacture id={id} setId={setId} />
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
            {manufactures.length == 0 ? (
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

function CreateManufacture({ id, setId }) {
  const [manufactureName, setManufactureName] = useState("");
  const [manufactureRegion, setManufactureRegion] = useState("");
  const [year, setYear] = useState("");
  // const [onProses, setOnProses] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: manufactures, isPending: onProses } = useMutation({
    mutationFn: (body) => {
      return !id ? createManufacture(body) : updateManufacture(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manufactures"]);
      setManufactureName("");
      setManufactureRegion("");
      setYear("");
      setId(null);
      toast.success("Data berhasil disimpan.");
    },
    onError: (err) => {
      toast.error(`Terjadi kesalahan: ${err?.message || "Unknown error"}`);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const request = {
      manufactureName,
      manufactureRegion,
      year,
    };

    manufactures(request);
  };

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["manufactures", id],
    queryFn: () => getDetailManufacture(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      setManufactureName(data?.manufacture_name);
      setManufactureRegion(data?.manufacture_region);
      setYear(data?.year_establish);
    }
  }, [isSuccess, data, isError]);

  return (
    <Card>
      <Card.Header className="text-center">Create Manufacture</Card.Header>
      <Card.Body>
        {isLoading || onProses ? (
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
              <Button
                type="submit"
                variant="primary"
                disabled={onProses || isLoading}
              >
                {id ? "Update Manufacture" : "Create Manufacture"}
              </Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default ScreenManufactures;
