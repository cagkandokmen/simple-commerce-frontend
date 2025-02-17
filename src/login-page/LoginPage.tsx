// src/LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useProfile } from '../context/ProfileContext.tsx';

const LoginPage: React.FC = () => {
  const [usernameInput, setUsernameInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const { setUsername } = useProfile();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(usernameInput || 'Guest');
    navigate('/main'); 
  };

  const handleRegister = () => {
    navigate('/register'); // Redirect to RegisterPage
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Sign In
            </Button>
            <Button variant="secondary" className="w-100" onClick={handleRegister}>
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
