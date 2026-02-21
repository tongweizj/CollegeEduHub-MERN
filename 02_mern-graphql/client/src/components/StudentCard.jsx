import React from 'react';
import { Container, Card } from 'react-bootstrap';

const StudentCard = ({ title, children, maxWidth = "700px" }) => {
  return (
    <Container className="mt-5" style={{ maxWidth }}>
      <Card className="border-0">
        <Card.Body className="p-0">
          {title && <h2 className="mb-4 text-left">{title}</h2>}
          {children}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentCard;