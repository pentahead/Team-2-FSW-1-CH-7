import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const TypeItem = ({ type }) => {
  return (
    <Col md={3}>
      <Card style={{ width: "18rem", height: "9rem", marginTop: "2rem" }}>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="text-center">{type?.type_name}</Card.Title>
          <Button
            style={{ width: "12rem" }}
            as={Link}
            href={`/types/${type?.id}`}
            variant="primary"
            className="mt-auto align-self-center"
          >
            Detail type
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

TypeItem.propTypes = {
  type: PropTypes.object,
};

export default TypeItem;
