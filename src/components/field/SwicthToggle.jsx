import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';

const SwitchToggle = props => {
  const { label, defaultChecked, className, onChange } = props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChange = value => {
    setChecked(value);
    onChange(value);
  };

  return (
    <label className={`d-flex flex-column ${className}`}>
      <span className="font-weight-bold">{label}</span>
      <Switch onChange={handleChange} checked={checked} />
    </label>
  );
};

export default SwitchToggle;
