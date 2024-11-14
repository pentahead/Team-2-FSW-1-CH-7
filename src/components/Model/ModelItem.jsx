import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const ModelItem = ({ model }) => {
  return (
    <Col md={3}>
      <Card style={{ width: "18rem", marginTop: "2rem" }}>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{model?.model_name}</Card.Title>
          <Card.Text>{model?.Transmission?.transmission_name}</Card.Text>
          <Card.Text>{model?.capacity}</Card.Text>
          <Card.Text>{model?.Type?.type_name}</Card.Text>
          <Card.Text>{model?.Manufacture?.manufacture_name}</Card.Text>
          <Button
            style={{ width: "15rem" }}
            as={Link}
            href={`/models/${model?.id}`}
            variant="primary"
            className="mt-auto align-self-center"
          >
            Detail Model
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

ModelItem.propTypes = {
  model: PropTypes.object,
};

export default ModelItem;
