import { RemoveableLabel } from '@components/label/RemoveableLabel';
import React, { useState, useEffect } from 'react';

import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Select from 'react-select';

export const required = value => (value ? undefined : 'Wajib diisi');

export const emailValid = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value)
    ? 'Alamat email tidak valid'
    : undefined;

export const passwordMatch = (value, allValues) =>
  value !== allValues.password ? 'Kata sandi tidak cocok' : undefined;

export const onlyNumber = value => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  return onlyNums;
};

export const minLength = (min, value) =>
  value && value.length < min ? `Harus ${min} karakter atau lebih` : undefined;

export const maxLength = max => value =>
  value && value.length > max
    ? `Tidak boleh melebihi ${max} karakter`
    : undefined;

export const minLength8 = value => minLength(8, value);

export const minBaNumber = value =>
  value && value.length < 16 ? `Harus 13 angka` : undefined;
export const minNIKNumber = value =>
  value && value.length < 19 ? `Harus 16 karakter atau lebih` : undefined;

export function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return 0;
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Hanya karakter huruf dan angka'
    : undefined;

export const mustAlphaNumeric = value =>
  value && /^[a-z0-9_-]+$/i.test(value)
    ? 'Minimal harus karakter huruf dan angka'
    : undefined;

export const inputField = props => {
  const {
    input,
    type,
    label,
    className,
    classLabel,
    placeholder,
    required,
    disabled,
    meta: { touched, error, warning }
  } = props;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={input.name} className={classLabel}>
          {label}
          {required && <span className="form-error"> *</span>}
        </label>
      )}
      <input
        {...input}
        id={input.name}
        type={type}
        placeholder={placeholder}
        className={`form-control ${touched && error ? 'focus-error' : ''}`}
        disabled={disabled}
      />
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  );
};

export const inputGroupField = props => {
  const {
    input,
    type,
    label,
    prepend,
    append,
    className,
    classLabel,
    placeholder,
    required,
    disabled,
    meta: { touched, error, warning }
  } = props;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={input.name} className={classLabel}>
          {label}
          {required && <span className="form-error"> *</span>}
        </label>
      )}
      <div className={`input-group ${touched && error ? 'focus-error' : ''}`}>
        {prepend && (
          <div className="input-group-prepend">
            <span className="input-group-text" id={input.name}>
              {prepend}
            </span>
          </div>
        )}
        <input
          {...input}
          id={input.name}
          type={type}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby={input.name}
          className="form-control"
          disabled={disabled}
        />
        {append && (
          <div className="input-group-append">
            <span className="input-group-text" id={input.name}>
              {append}
            </span>
          </div>
        )}
      </div>
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  );
};

export const textAreaField = props => {
  const {
    input,
    label,
    placeholder,
    rows,
    required,
    disabled,
    meta: { touched, error, warning }
  } = props;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={input.name} className="font-weight-semibold">
          {label}
          {required && <span className="form-error"> *</span>}
        </label>
      )}
      <textarea
        {...input}
        id={input.name}
        placeholder={placeholder}
        rows={rows}
        className={`form-control ${touched && error ? 'focus-error' : ''}`}
        disabled={disabled}
      />
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  );
};

export const selectField = props => {
  const {
    input,
    label,
    options,
    placeholder,
    multiple,
    clearable,
    searchable,
    required,
    disabled,
    meta: { touched, error, warning }
  } = props;

  const initValue = (options, input) => {
    if (input.value) {
      if (typeof input.value === 'object') {
        return options.find(option => option.value === input.value.value);
      }
      return options.find(option => option.value === input.value);
    }
    return null;
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={input.name} className="font-weight-semibold">
          {label}
          {required && <span className="form-error"> *</span>}
        </label>
      )}
      <Select
        name={input.name}
        id={input.name}
        className={`select-field ${touched && error ? 'focus-error' : ''}`}
        classNamePrefix="select"
        options={options}
        value={initValue(options, input)}
        onChange={input.onChange}
        placeholder={placeholder}
        isMulti={multiple}
        isClearable={clearable}
        isSearchable={searchable}
        isDisabled={disabled}
      />
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  );
};

export const radioField = props => {
  const {
    input,
    label,
    className,
    classLabel,
    classInput,
    options,
    required,
    disabled,
    meta: { touched, error, warning }
  } = props;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={label} className="font-weight-semibold mb-2">
          {label}
          {required && <span className="form-error"> *</span>}
        </label>
      )}
      <div
        className={`form-control ${
          touched && error ? 'focus-error' : ''
        } ${classInput}`}
      >
        {options.map((opt, i) => {
          const key = i;
          return (
            <label
              className={`font-weight-normal ml-2 mb-0 ${classLabel}`}
              key={key}
            >
              <input
                name={input.name}
                type="radio"
                className="mr-2"
                value={opt.value}
                checked={opt.value === input.value}
                onChange={e => input.onChange(e.target.value)}
                disabled={disabled}
              />
              {opt.label}
            </label>
          );
        })}
      </div>
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  );
};

export const SearchSelectMultiValue = ({
  label,
  placeholder,
  searchData = [],
  onRemoveItem,
  onSelectSearchItem,
  onChange,
  onChangeText,
  required,
  input,
  meta: { touched, error, warning }
}) => {
  const [searchText, setSearchText] = useState('');
  const [labels, setLabels] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleSelectSearchItem = item => {
    setSearchText('');

    if (!labels?.filter(e => e.id === item.id).length) {
      const newItem = labels.concat(item);
      setLabels(newItem);

      onSelectSearchItem && onSelectSearchItem(item);
      onChange && onChange(newItem);
      input && input.onChange(newItem);
    }
  };

  const handleRemoveLabel = item => {
    let newValues = labels.filter(hashtag => hashtag.id !== item.id);
    setLabels(newValues);
    onRemoveItem && onRemoveItem(item);
    onChange && onChange(newValues);

    newValues = newValues.length === 0 ? '' : newValues;
    input.onChange(newValues);
  };

  const handleOnChangeSearchText = text => {
    setSearchText(text);
    onChangeText && onChangeText(text);
  };

  useEffect(() => {
    input.value && setLabels(input.value);
  }, [input.value]);

  return (
    <div
      className="form-group"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <label htmlFor={label} className="mb-2">
        {label}
        {required && <span className="form-error"> *</span>}
      </label>
      <ReactSearchAutocomplete
        styling={{
          boxShadow: 'none',
          borderRadius: '5px',
          height: '38px',
          border: '1px solid #adb5bd',
          zIndex: focus ? 999 : 1,
          position: 'fix'
        }}
        placeholder={placeholder}
        showIcon={false}
        inputSearchString={searchText}
        onSearch={handleOnChangeSearchText}
        onSelect={handleSelectSearchItem}
        items={searchData}
      />

      <div className="mt-2">
        {labels &&
          labels?.map(item => (
            <RemoveableLabel
              text={item.name}
              onRemove={() => handleRemoveLabel(item)}
              removable
            />
          ))}
      </div>
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  );
};
