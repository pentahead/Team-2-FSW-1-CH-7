import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/slices/auth"; // Import setUser action
import { login, googleLogin } from "../service/auth";
import { Container } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { token } = useSelector((state) => state.auth);

  if (token) {
    navigate({ to: "/" });
  }

  const { mutate: loginUser } = useMutation({
    mutationFn: (body) => {
      return login(body);
    },
    onSuccess: (data) => {
      dispatch(setToken(data?.token));

      navigate({ to: "/" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  // Mutation for Google login
  const { mutate: googleLoginUser } = useMutation({
    mutationFn: (accessToken) => googleLogin(accessToken),
    onSuccess: (data) => {
      dispatch(setToken(data?.token));
      navigate({ to: "/" });
    },
    onError: (err) => {
      toast.error(err.message || "Google login failed");
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser({ email, password });
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLoginUser(tokenResponse.access_token);
    },
    onError: (err) => {
      toast.error("Google login error");
      console.error(err);
    },
  });

  return (
    <section className="d-flex z-1 bg-light  justify-content-center align-items-center vh-100 bg-login position-relative overflow-hidden">
      <Container>
        <Row className="justify-content-center position-relative">
          <Col
            md={6}
            lg={4}
            style={{
              backdropFilter: "blur(10px)", // Gunakan camelCase untuk backdropFilter
              backgroundColor: "rgba(255, 255, 255, 0.7)", // Gunakan camelCase untuk backgroundColor
              borderRadius: "0.5rem", // Sesuaikan ukuran border-radius jika diperlukan
            }}
            className="bg-trasnparent rounded-4 shadow-lg p-4 position-relative"
          >
            <Button variant="" as={Link} to="/" className="position-absolute ">
              <i className="bi bi-arrow-left fw-bold text-black fs-3"></i>
            </Button>

            <div className="text-center mt-4">
              <h2 className="fw-bold">Login</h2>
            </div>

            <Form onSubmit={onSubmit} className="z-3 p-5">
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100 mt-3">
                Login
              </Button>
              <div className="d-grid gap-2">
                <Button onClick={handleGoogleLogin} variant="primary">
                  Login with Google
                </Button>
              </div>
            </Form>
          </Col>
          <div className="decoration position-absolute top-50 z-n1 start-100  translate-middle">
            <img src="img/car.png" alt="Decoration" className="img-fluid" />
          </div>
        </Row>
      </Container>
    </section>
  );
}
