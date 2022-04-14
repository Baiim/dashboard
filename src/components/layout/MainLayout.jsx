import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

/* Components */
import NavLeft from '../navbars/NavLeft';

function MainLayout(mainProps) {
  const { children, activeLink } = mainProps;

  return (
    <Container fluid className="wrapper">
      <Row>
        <Col className="wrapper-left">
          <NavLeft activeLink={activeLink} />
        </Col>
        <Col className="wrapper-content">{children}</Col>
      </Row>
    </Container>
  );
}

export default connect(state => state)(MainLayout);
