import Swal from 'sweetalert2';

export default {
  handleError(message, title) {
    Swal.fire(title, message, 'error');
  },

  async handleSucces(message, type) {
    Swal.fire(`Success ${type} Data`, message, 'success');
  }
};
