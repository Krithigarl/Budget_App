import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Container, Alert, Form } from 'react-bootstrap';
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      setMessage(response.data.message || 'Registration successful! Redirecting to login...');
      setFormData({ username: '', email: '', password: '' });      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        setError(data.error || Object.values(data)[0]);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="login-page">
      <Card className="login-card shadow-sm">
        <Card.Body>
      <h2 className="login-title">Register</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <button type="submit" className="login-submit-btn w-100" style={{ width: '100%', padding: '10px' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </Form.Group>
      </Form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Already have an account? <Link to="/login" style={{ color: 'blue', textDecoration: 'none' }}>Login here</Link>
      </p>
      </Card.Body>
      </Card>
    </Container>
  );
}
export default Register;