import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Button from 'reactstrap-button-loader';

class DeleteModal extends Component {
  state = {
    isLoading: false
  };

  render() {
    const { data, setDeleteModal, deleteData, fetchData } = this.props;

    return (
      <Modal isOpen={data.isModalDelete} toggle={() => setDeleteModal(false)}>
        <ModalBody className="text-center">
          <img src="/images/icon/delete.png" alt="" />
          <h4 className="w-50 mt-3 mx-auto">
            Apa anda yakin akan menghapus data ini?
          </h4>
        </ModalBody>
        <ModalFooter className="border-0 justify-content-center pt-0">
          <Button
            type="button"
            color="ghost"
            onClick={() => setDeleteModal(false)}
            style={{ width: 120, height: 50, marginRight: '1rem' }}
          >
            Batal
          </Button>
          <Button
            type="submit"
            color="danger"
            onClick={() => {
              this.setState({ isLoading: true });
              deleteData(data.id).then(
                () => {
                  this.setState({ isLoading: false });
                  setDeleteModal(false);
                  fetchData(data.params);
                },
                () => {
                  this.setState({ isLoading: false });
                  setDeleteModal(false);
                }
              );
            }}
            loading={this.state.isLoading}
            style={{ width: 120, height: 50 }}
          >
            Hapus
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteModal;
