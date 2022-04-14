export const userStatus = status => {
  let result = {
    color: '',
    label: ''
  };

  switch (status) {
    case true:
      result = {
        color: 'success',
        label: 'Aktif'
      };
      break;

    case false:
      result = {
        color: 'danger',
        label: 'Tidak Aktif'
      };
      break;

    default:
      break;
  }

  return result;
};

export const memberStatus = status => {
  let result = {
    color: '',
    label: ''
  };

  // TRUE, FALSE

  switch (status) {
    case true:
      result = {
        color: '#2FCA70',
        label: 'Aktif'
      };
      break;

    case false:
      result = {
        color: '#FF4344',
        label: 'Tidak Aktif'
      };
      break;

    default:
      break;
  }

  return result;
};

export const artikelStatus = status => {
  let result = {
    color: '',
    label: ''
  };

  // DRAFT, PUBLISHED

  switch (status) {
    case 'draf':
      result = {
        color: '#E2AA1E',
        label: 'Draft'
      };
      break;

    case 'publish':
      result = {
        color: '#2FCA70',
        label: 'Published'
      };
      break;

    default:
      break;
  }

  return result;
};
