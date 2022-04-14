const formatCurrency = input => {
  if (!input) {
    return `Rp 0`;
  }
  return `Rp ${input
    .toString()
    .replace(/Rp/g, '')
    .replace(/ {2}/g, '')
    .replace(/Rp /g, '')
    .replace(/\./g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const normalizeCurrency = val => {
  const result = parseInt(
    val
      .replace(/\./g, '')
      .replace(/Rp/g, '')
      .replace(/ /g, '') || 0,
    10
  );
  return result;
};

export { formatCurrency, normalizeCurrency };
