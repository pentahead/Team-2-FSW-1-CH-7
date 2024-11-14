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
  createModel,
  deleteModel,
  getDetailModel,
  getModels,
  updateModel,
} from "../../service/models";

import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { getTransmission } from "../../service/transmission";
import { getType } from "../../service/type";
import { getManufacture } from "../../service/manufacture";
import { getSpecs } from "../../service/specs";
import { getOption } from "../../service/option";

const ScreenModels = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(null);

  const getModelData = async () => {
    setIsLoading(true);
    const result = await getModels();
    if (result.success) {
      setModels(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      getModelData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Model data!</h1>
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
            const result = await deleteModel(id);
            if (result?.success) {
              toast.success("Data deleted successfully");
              getModelData();
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
              <h3 className="text-primary">Model</h3>
              <h5 className="text-muted">Manage Models</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateModel onModelCreated={getModelData} id={id} setId={setId} />
        </Col>
        <Col xs={6}>
          <ListGroup as="ul">
            {models.length === 0 ? (
              <h1>Models not found!</h1>
            ) : (
              models.map((model, index) => (
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
                      <h6 className="mb-0 text-dark"> {model?.model_name}</h6>
                    </Col>
                    <Col>
                      <h6 className="mb-0 text-dark">
                        {model?.Type?.type_name}
                      </h6>
                    </Col>
                    <Col>
                      <h6 className="mb-0 text-dark">
                        {model?.Manufacture?.manufacture_name}
                      </h6>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          as={Link}
                          variant="primary"
                          size="md"
                          onClick={() => setId(model.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, model.id)}
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

function CreateModel({ onModelCreated, id, setId }) {
  const navigate = useNavigate();

  const [modelName, setModelName] = useState("");
  const [Transmission, setTransmission] = useState([]);
  const [transmissionId, setTransmissionId] = useState(0);
  const [capacity, setCapacity] = useState("");
  const [Type, setType] = useState([]);
  const [typeId, setTypeId] = useState(0);
  const [Manufacture, setManufacture] = useState([]);
  const [manufactureId, setManufactureId] = useState(0);
  const [Spec, setSpec] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [Option, setOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [
        transmissionResult,
        typeResult,
        manufactureResult,
        specResult,
        optionResult,
      ] = await Promise.all([
        getTransmission(),
        getType(),
        getManufacture(),
        getSpecs(),
        getOption(),
      ]);
      if (transmissionResult?.success)
        setTransmission(transmissionResult?.data);
      if (typeResult?.success) setType(typeResult?.data);
      if (manufactureResult?.success) setManufacture(manufactureResult?.data);
      if (specResult?.success) setSpec(specResult?.data);
      if (optionResult?.success) setOption(optionResult?.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      const getDetailModelData = async (id) => {
        if (id) {
          setIsLoading(true); // Set loading to true when fetching data
          const result = await getDetailModel(id);
          if (result?.success) {
            setIsLoading(false); // Set loading to false after fetching is done
            if (result?.success) {
              setModelName(result.data?.model_name);
              setTransmissionId(result.data?.transmission_id);
              setCapacity(result.data?.capacity);
              setTypeId(result.data?.type_id);
              setManufactureId(result.data?.manufacture_id);
              setSelectedOptions(result.data?.option_id || []);
              setSelectedSpecs(result.data?.spec_id || []);
              setIsNotFound(false);
            }
          }
        }
      };
      getDetailModelData(id);
    }
  }, [id]);

  const handleSpecChange = (event) => {
    const specId = parseInt(event.target.value, 10);
    setSelectedSpecs((prevSpecs) =>
      prevSpecs.includes(specId)
        ? prevSpecs.filter((id) => id !== specId)
        : [...prevSpecs, specId]
    );
  };

  const handleOptionChange = (event) => {
    const optionId = parseInt(event.target.value, 10);
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(optionId)
        ? prevOptions.filter((id) => id !== optionId)
        : [...prevOptions, optionId]
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const request = {
      modelName,
      transmissionId: parseInt(transmissionId, 10),
      capacity,
      typeId: parseInt(typeId, 10),
      manufactureId: parseInt(manufactureId, 10),
      specIds: selectedSpecs,
      optionIds: selectedOptions,
    };
    const result = id
      ? await updateModel(id, request)
      : await createModel(request);
    setIsLoading(false); // Set loading to false after the request is complete

    if (result?.success) {
      toast.success("Data created successfully");
      onModelCreated();
      setModelName("");
      setTransmissionId("");
      setCapacity("");
      setTypeId("");
      setManufactureId("");
      setSelectedOptions("");
      setSelectedSpecs("");
      setId(null);
      return;
    } else {
      alert(result?.message);
    }
    toast.error(result?.message);
  };

  return (
    <Card>
      <Card.Header className="text-center">Create or Edit Model</Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="model_name">
              <Form.Label column sm={3}>
                Model Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Model Name"
                  required
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="transmission_id">
              <Form.Label column sm={3}>
                Transmission
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  value={transmissionId}
                  onChange={(e) =>
                    setTransmissionId(parseInt(e.target.value, 10))
                  }
                >
                  <option value="" disabled>
                    Select Transmission
                  </option>
                  {Transmission.map((transmission) => (
                    <option key={transmission.id} value={transmission.id}>
                      {transmission.transmission_name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="capacity">
              <Form.Label column sm={3}>
                Capacity
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="number"
                  placeholder="Capacity"
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="type_id">
              <Form.Label column sm={3}>
                Type
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  value={typeId}
                  onChange={(e) => setTypeId(parseInt(e.target.value, 10))}
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {Type.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type_name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="manufacture_id">
              <Form.Label column sm={3}>
                Manufacture
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  value={manufactureId}
                  onChange={(e) =>
                    setManufactureId(parseInt(e.target.value, 10))
                  }
                >
                  <option value="" disabled>
                    Select Manufacture
                  </option>
                  {Manufacture.map((manufacture) => (
                    <option key={manufacture.id} value={manufacture.id}>
                      {manufacture.manufacture_name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="spec_id">
              <Form.Label column sm={3}>
                Specs
              </Form.Label>
              <Col sm="9">
                {Spec.map((spec) => (
                  <Form.Check
                    type="checkbox"
                    key={spec.id}
                    label={spec.spec_name}
                    value={spec.id}
                    checked={selectedSpecs.includes(spec.id)}
                    onChange={handleSpecChange}
                  />
                ))}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="option_id">
              <Form.Label column sm={3}>
                Options
              </Form.Label>
              <Col sm="9">
                {Option.map((option) => (
                  <Form.Check
                    type="checkbox"
                    key={option.id}
                    label={option.option_name}
                    value={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onChange={handleOptionChange}
                  />
                ))}
              </Col>
            </Form.Group>

            <div className="d-grid d-flex flex-row justify-content-end gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? "Update Models" : "Create Model"}
              </Button>
              {id && (
                <Button
                  onClick={() => {
                    setId(null);
                    onModelCreated();
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

export default ScreenModels;
