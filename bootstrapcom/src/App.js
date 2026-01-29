import React from 'react';
import { Navbar, Nav, Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const brandStyle = {
    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
    minHeight: '100vh',
    paddingBottom: '50px'
  };

  const navStyle = {
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
  };

  return (
    <div style={brandStyle}>
      {/* 1. Navbar */}
      <Navbar variant="dark" expand="lg" style={navStyle} className="mb-5 shadow">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">UI Experiment</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              <Button variant="light" className="rounded-pill ms-lg-3 px-4 fw-bold text-primary">Sign In</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 2. Contact Form Card */}
      <Container className="d-flex justify-content-center">
        <Card className="shadow-lg border-0 p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px' }}>
          <Card.Body>
            <h3 className="text-center text-primary mb-4 fw-bold">Contact Us</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Full Name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" className="bg-light border-0" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" className="bg-light border-0" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold">Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="How can we help you?" className="bg-light border-0" />
              </Form.Group>

              <Button 
                style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', border: 'none' }} 
                className="w-100 py-2 rounded-pill fw-bold"
              >
                Send Message
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;