import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const OptionItem = ({ option }) => {
  return (
    <Col md={3}>
      <Card style={{ width: "18rem", height: "9rem", marginTop: "2rem" }}>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="text-center">{option?.option_name}</Card.Title>
          <Button
            style={{ width: "12rem" }}
            as={Link}
            href={`/options/${option?.id}`}
            variant="primary"
            className="mt-auto align-self-center"
          >
            Detail option
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

OptionItem.propTypes = {
  option: PropTypes.object,
};

export default OptionItem;
