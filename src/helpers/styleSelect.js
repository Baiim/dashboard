export const transStyles = {
  control: provided => ({
    ...provided,
    width: 250,
    borderColor: '#E1E5E8',
    borderRadius: 8,
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#E1E5E8'
    }
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none'
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: '#435565',
    '&:hover': {
      color: '#435565'
    }
  })
};

export const statusStyles = {
  control: provided => ({
    ...provided,
    width: 175,
    borderColor: '#E1E5E8',
    borderRadius: 8,
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#E1E5E8'
    }
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none'
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: '#435565',
    '&:hover': {
      color: '#435565'
    }
  })
};
