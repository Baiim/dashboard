import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

export const ArtikelModal = ({ isOpen, title, data, toggle }) => (
  <Modal isOpen={isOpen} centered toggle={toggle} modalClassName="rounded-pill">
    <ModalHeader toggle={toggle} className="border-0">
      {title}
    </ModalHeader>
    <ModalBody>
      <Row md={4}>
        {data?.map(item => (
          <Col className="mb-2">{item.name}</Col>
        ))}
      </Row>
    </ModalBody>
  </Modal>
);
