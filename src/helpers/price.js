import NumberFormat from 'react-number-format';
import React from 'react';

export const formatterRp = price => (
  <NumberFormat
    value={Math.round(parseFloat(price, 10))}
    displayType="text"
    decimalSeparator=","
    decimalPrecision={0}
    thousandSeparator="."
    suffix=""
    prefix="Rp "
  />
);

export const formatterNumber = num =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
