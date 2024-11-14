import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const SpecItem = ({ spec }) => {
  return (
    <Col md={3}>
      <Card style={{ width: "18rem", height: "9rem", marginTop: "2rem" }}>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="text-center">{spec?.spec_name}</Card.Title>
          <Button
            style={{ width: "12rem" }}
            as={Link}
            href={`/specs/${spec?.id}`}
            variant="primary"
            className="mt-auto align-self-center"
          >
            Detail Spec
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

SpecItem.propTypes = {
  spec: PropTypes.object,
};

export default SpecItem;
