import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";

export const Route = createLazyFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [navigate, token]);

  return (
    <Row className="mt-5 d-flex justify-content-center">
  <Col md={6} className="d-flex justify-content-center">
    <Card className="bg-transparent rounded-4 shadow-lg p-4 position-relative d-flex flex-column justify-content-center align-items-center">
      <div className="text-center my-4">
        <h2 className="fw-bold">Profile</h2>
      </div>

      <Card.Img
        variant="top"
        src={user?.profile_picture}
        className="rounded-circle p-1 border border-4 border-primary"
        style={{ width: "20rem", height: "20rem" }}
      />

      <Card.Body className="text-center">
        <ListGroup variant="flush">
          <ListGroup.Item className="fw-semibold h4 text-center">
            {user?.name}
          </ListGroup.Item>
          <ListGroup.Item className="text-muted text-center">
            {user?.email}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  </Col>
</Row>
  );
}
