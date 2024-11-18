/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ListGroup, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { deleteCar, getDetailCar } from "../../service/cars";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { MoonLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MyVerticallyCenteredModal = (props) => {
  const { id, setOpenForm, getCarData, setId } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => setId(null)}>
        <Modal.Title id="contained-modal-title-vcenter">Detail Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CarDetail
          id={id}
          setId={setId}
          setOpenForm={setOpenForm}
          onHide={props.onHide}
          getCarData={getCarData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
            setId(null);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
function CarDetail({ id, setOpenForm, onHide, setId, getCarData }) {
  const navigate = useNavigate();
  const [isNotFound, setIsNotFound] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  const queryClient = useQueryClient();

  const {
    data: carData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["carDetail", id],
    queryFn: () => getDetailCar(id),

    enabled: !!id && !!token,
  });

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    queryKey: ["carDetail", id],
    mutationFn: (id) => deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["carDetail"]);
      toast.success("Data deleted successfully");
      setId(null);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

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

  if (isNotFound) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Car is not found!</h1>
        </Col>
      </Row>
    );
  }

  const onDelete = async (event) => {
    event.preventDefault();
    onHide();

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
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            <Card.Img
              variant="top"
              src={carData?.image}
              alt={carData?.Models?.model_name}
            />
          </Card.Subtitle>
          <Card.Title>
            {carData?.Models?.model_name} -{" "}
            {carData?.Models?.Manufacture?.manufacture_name}
          </Card.Title>

          <dl className="row">
            <Row className="mb-3">
              <Col sm={3}>
                <dt className="font-weight-semibold">Transmission</dt>
              </Col>
              <Col sm={9}>
                <dd className="text-muted">
                  {carData?.Models?.Transmission?.transmission_name}
                </dd>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <dt className="font-weight-semibold">Capacity</dt>
              </Col>
              <Col sm={9}>
                <dd className="text-muted">
                  {" "}
                  {carData?.Models?.capacity || "Not specified"}
                </dd>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <dt className="font-weight-semibold">Plate</dt>
              </Col>
              <Col sm={9}>
                <dd className="text-muted"> {carData?.plate}</dd>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <dt className="font-weight-semibold">Rent per Day</dt>
              </Col>
              <Col sm={9}>
                <dd className="text-muted"> Rp {carData?.rentPerDay}</dd>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <dt className="font-weight-semibold">Year</dt>
              </Col>
              <Col sm={9}>
                <dd className="text-muted">{carData?.year}</dd>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <dt className="font-weight-semibold">Available At</dt>
              </Col>
              <Col sm={9}>
                <dd className="text-muted">
                  {new Date(carData?.availableAt).toLocaleDateString()}
                </dd>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <dt className="font-weight-semibold">Description</dt>
              </Col>
              <Col sm={9}>
                <dd className="text-muted">{carData?.description}</dd>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <dt className="font-weight-semibold">Availability</dt>
              </Col>
              <Col sm={9}>
                <dd className="text-muted">
                  {carData?.Available?.available_status}
                </dd>
              </Col>
            </Row>

            <Row>
              <Col sm={3}>
                <dt className="font-weight-semibold">Options</dt>
              </Col>
              <Col sm={9}>
                {carData?.Models?.modelOptions &&
                carData.Models.modelOptions.length > 0 ? (
                  <ListGroup>
                    {carData.Models.modelOptions.map((option, index) => (
                      <ListGroup.Item
                        className="d-flex justify-content-between align-items-center"
                        key={index}
                      >
                        <div className="d-flex align-items-center">
                          <span className="ml-3">
                            {option?.Options?.option_name}
                          </span>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <span>No options available</span>
                )}
              </Col>
            </Row>

            <Row>
              <Col sm={3}>
                <dt className="font-weight-semibold">Specifications</dt>
              </Col>
              <Col sm={9}>
                {carData?.Models?.modelSpecs &&
                carData.Models.modelSpecs.length > 0 ? (
                  <ListGroup>
                    {carData.Models.modelSpecs.map((spec, index) => (
                      <ListGroup.Item
                        className="d-flex justify-content-between align-items-center"
                        key={index}
                      >
                        <div className="d-flex align-items-center">
                          <span className="ml-3">{spec?.Specs?.spec_name}</span>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <span>No specifications available</span>
                )}
              </Col>
            </Row>

            {/* Tombol untuk Edit */}
            {token && location.pathname === "/admin/dashboard" && (
              <>
                <Card.Text>
                  <div className="d-grid gap-2 mt-2">
                    <Button
                      as={Link}
                      onClick={() => {
                        setOpenForm(true);
                        onHide();
                      }}
                      variant="primary"
                      size="md"
                    >
                      Edit car
                    </Button>
                  </div>
                </Card.Text>

                <Card.Text>
                  <div className="d-grid gap-2">
                    <Button onClick={onDelete} variant="danger" size="md">
                      Delete car
                    </Button>
                  </div>
                </Card.Text>
              </>
            )}
          </dl>
        </Card.Body>
      </Card>
    </div>
  );
}
export default MyVerticallyCenteredModal;
