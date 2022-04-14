import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

export const HashtagModal = ({ isOpen, toggle }) => {
  const { modalData } = useSelector(state => state.hashtag);

  return (
    <Modal
      isOpen={isOpen}
      centered
      toggle={toggle}
      modalClassName="rounded-pill"
    >
      <ModalHeader toggle={toggle} className="border-0">
        {modalData?.title}
      </ModalHeader>
      <ModalBody>
        <Row md={4}>
          {modalData?.items?.map(item => (
            <Col className="mb-2">{item.name}</Col>
          ))}
        </Row>
      </ModalBody>
    </Modal>
  );
};
