import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

export const RelatedHashtagsModal = ({ isOpen, toggle }) => {
  const { selectedStock } = useSelector(state => state.stock);

  return (
    <Modal
      isOpen={isOpen}
      centered
      toggle={toggle}
      modalClassName="rounded-pill"
    >
      <ModalHeader toggle={toggle} className="border-0">
        Related Hashtags
      </ModalHeader>
      <ModalBody>
        <Row md={4}>
          {selectedStock?.hashtags?.map(hashtag => (
            <Col className="mb-2">{hashtag}</Col>
          ))}
        </Row>
      </ModalBody>
    </Modal>
  );
};
