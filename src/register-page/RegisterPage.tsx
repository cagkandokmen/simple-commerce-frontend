import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert('Passwords do not match!');
      return;
    }
    alert(`User ${username} registered successfully!`);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRePassword">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;
