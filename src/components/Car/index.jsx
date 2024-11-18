import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const CarItem = ({ modalConfig, setId, car }) => {
  return (
    <Col md={3}>
      <Card style={{ width: "18rem", marginTop: "2rem", height: "35rem" }}>
        <Card.Img
          variant="top"
          className=""
          style={{
            width: "100%",
            height: "10rem",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          src={car?.image}
          alt={car?.Models?.model_name}
        />
        <Card.Body className="d-flex flex-column justify-content-between p-3">
          <Card.Title>
            {car?.Models?.model_name} -{" "}
            {car?.Models?.Manufacture?.manufacture_name}
          </Card.Title>
          <Card.Text>
            <strong>Transmission:</strong>{" "}
            {car?.Models?.Transmission?.transmission_name}
          </Card.Text>
          <Card.Text>
            <strong>Type:</strong> {car?.Models?.Type?.type_name}
          </Card.Text>
          <Card.Text>
            <strong>Capacity:</strong>{" "}
            {car?.Models?.capacity || "Not specified"}
          </Card.Text>
          <Card.Text>
            <strong>Plate:</strong> {car?.plate}
          </Card.Text>
          <Card.Text>
            <strong>Rent per Day:</strong> Rp {car?.rentPerDay}
          </Card.Text>
          <Card.Text>
            <strong>Year:</strong> {car?.year}
          </Card.Text>
          <Card.Text>
            <strong>Available At:</strong>{" "}
            {new Date(car?.availableAt).toLocaleDateString()}
          </Card.Text>

          <Button
            style={{ width: "15rem" }}
            // to={/cars/${car?.id}} // Gunakan to untuk navigasi Link
            onClick={() => {
              modalConfig.setModalShow(true);
              setId(car?.id);
            }}
            variant="primary"
            className="mt-auto align-self-center"
          >
            Detail Car
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

CarItem.propTypes = {
  modalConfig: PropTypes.shape({
    setModalShow: PropTypes.func.isRequired,
    modalShow: PropTypes.bool.isRequired,
  }).isRequired,
  setId: PropTypes.func.isRequired,
  car: PropTypes.object.isRequired,
};

export default CarItem;
