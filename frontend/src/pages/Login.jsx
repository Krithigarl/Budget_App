import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { saveTokens } from "../utils/auth";
function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
      const { access, refresh, user } = response.data;
      saveTokens(access, refresh, user);
      if (onLoginSuccess) onLoginSuccess(user);
      navigate("/analysis");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Login failed");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="login-page">
      <Card className="login-card shadow-sm">
        <Card.Body>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to manage your budget</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="Enter your username" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password"/>
            </Form.Group>
            <Button type="submit" className="login-submit-btn w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
          <p className="login-footer">
            Don't have an account?{" "}
            <Link to="/register">Register here</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Login;
