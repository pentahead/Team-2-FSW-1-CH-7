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
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const ScreenModels = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [models, setModels] = useState([]);
  const [id, setId] = useState(null);

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["models"],
    queryFn: () => getModels(),
    enabled: !!token,
  });

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    queryKey: ["models", id],
    mutationFn: (id) => deleteModel(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["models"]);
      toast.success("Data deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setModels(data);
    }
  }, [data, isSuccess, isError, token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Model data!</h1>
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
              <h3 className="text-primary">Model</h3>
              <h5 className="text-muted">Manage Models</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateModel id={id} setId={setId} />
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

function CreateModel({ id, setId }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [modelName, setModelName] = useState("");
  const [transmissionId, setTransmissionId] = useState("");
  const [capacity, setCapacity] = useState("");
  const [typeId, setTypeId] = useState("");
  const [manufactureId, setManufactureId] = useState("");
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { data: transmissionData } = useQuery({
    queryKey: ["transmission"],
    queryFn: () => getTransmission(),
    enabled: !!token,
  });

  const { data: typeData } = useQuery({
    queryKey: ["type"],
    queryFn: () => getType(),
    enabled: !!token,
  });

  const { data: manufactureData } = useQuery({
    queryKey: ["manufacture"],
    queryFn: () => getManufacture(),
    enabled: !!token,
  });

  const { data: dataSpecs } = useQuery({
    queryKey: ["specs"],
    queryFn: () => getSpecs(),
    enabled: !!token,
  });

  const { data: dataOption } = useQuery({
    queryKey: ["option"],
    queryFn: () => getOption(),
    enabled: !!token,
  });

  const transmissions = transmissionData || [];
  const types = typeData || [];
  const manufactures = manufactureData || [];
  const specs = dataSpecs || [];
  const options = dataOption || [];

  const { data: modelDetail, isSuccess: isDetailSuccess } = useQuery({
    queryKey: ["model", id],
    queryFn: () => getDetailModel(id),
    enabled: !!id && !!token,
  });

  useEffect(() => {
    if (isDetailSuccess && modelDetail) {
      setModelName(modelDetail.data?.model_name || "");
      setTransmissionId(modelDetail.data?.transmission_id?.toString() || "");
      setCapacity(modelDetail.data?.capacity?.toString() || "");
      setTypeId(modelDetail.data?.type_id?.toString() || "");
      setManufactureId(modelDetail.data?.manufacture_id?.toString() || "");

      const specIds =
        modelDetail.data?.modelSpecs?.map((spec) => spec.spec_id) || [];
      const optionIds =
        modelDetail.data?.modelOptions?.map((opt) => opt.option_id) || [];

      setSelectedSpecs(specIds);
      setSelectedOptions(optionIds);
    }
  }, [modelDetail, isDetailSuccess]);

  const { mutate: modelsCreate } = useMutation({
    mutationFn: (body) => {
      const request = {
        modelName: body.model_name,
        transmissionId: body.transmission_id,
        capacity: body.capacity,
        typeId: body.type_id,
        manufactureId: body.manufacture_id,
        optionIds: body.options,
        specIds: body.specs,
      };

      return !id ? createModel(request) : updateModel(id, request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["models"]);
      setModelName("");
      setTransmissionId("");
      setCapacity("");
      setTypeId("");
      setManufactureId("");
      setSelectedSpecs([]);
      setSelectedOptions([]);
      setId(null);
      toast.success("Data berhasil disimpan.");
    },
    onError: (err) => {
      toast.error(`Terjadi kesalahan: ${err?.message || "Unknown error"}`);
    },
  });

  const handleSpecChange = (e) => {
    const specId = parseInt(e.target.value);
    setSelectedSpecs((prev) =>
      e.target.checked ? [...prev, specId] : prev.filter((id) => id !== specId)
    );
  };

  const handleOptionChange = (e) => {
    const optionId = parseInt(e.target.value);
    setSelectedOptions((prev) =>
      e.target.checked
        ? [...prev, optionId]
        : prev.filter((id) => id !== optionId)
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !modelName ||
      !transmissionId ||
      !capacity ||
      !typeId ||
      !manufactureId
    ) {
      toast.error("Semua field harus diisi");
      return;
    }

    const request = {
      model_name: modelName,
      transmission_id: transmissionId,
      capacity: capacity,
      type_id: typeId,
      manufacture_id: manufactureId,
      options: selectedOptions,
      specs: selectedSpecs,
    };

    modelsCreate(request);
  };

  return (
    <Card>
      <Card.Header className="text-center">
        {id ? `Edit Model` : "Create Model"}
      </Card.Header>
      <Card.Body>
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
                onChange={(e) => setTransmissionId(e.target.value)}
                required
              >
                <option value="">Select Transmission</option>
                {transmissions.map((transmission) => (
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
                placeholder="Enter capacity"
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
                onChange={(e) => setTypeId(e.target.value)}
              >
                <option value="">Select Type</option>
                {types.map((type) => (
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
                onChange={(e) => setManufactureId(e.target.value)}
              >
                <option value="">Select Manufacture</option>
                {manufactures.map((manufacture) => (
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
              {specs.map((spec) => (
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
              {options.map((option) => (
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
            <Button type="submit" variant="primary">
              {id ? "Update Model" : "Create Model"}
            </Button>
            {id && (
              <Button
                onClick={() => {
                  setId(null);
                  setModelName("");
                  setTransmissionId("");
                  setCapacity("");
                  setTypeId("");
                  setManufactureId("");
                  setSelectedOptions([]);
                  setSelectedSpecs([]);
                }}
                variant="danger"
              >
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ScreenModels;
