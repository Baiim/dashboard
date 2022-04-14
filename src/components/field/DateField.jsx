import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class DateField extends Component {
  state = {};

  render() {
    const {
      input,
      label,
      required,
      readOnly,
      disabled,
      meta: { touched, error, warning }
    } = this.props;

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={input.name}>
            {label}
            {required && <span className="text-danger"> *</span>}
          </label>
        )}
        <div className="d-flex align-items-center form-control ">
          <img src="/images/icon/calendar.svg" alt="" width="16" />
          <DatePicker
            {...input}
            onBlur={input.value}
            selected={input.value ? moment(input.value)._d : null}
            dateFormat="dd/MM/yyyy"
            onChange={date => input.onChange(date)}
            placeholderText="Tanggal"
            className="bg-transparent ml-2"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            readOnly={readOnly}
            disabled={disabled}
          />
        </div>
        {touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span className="form-error">{warning}</span>))}
      </div>
    );
  }
}

export default DateField;
