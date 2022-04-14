/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class TimeField extends Component {
  state = {};

  render() {
    const {
      input,
      readOnly,
      disabled,
      meta: { touched, error, warning }
    } = this.props;

    return (
      <div className="form-group row">
        <div className="d-flex align-items-center form-control">
          <img src="/images/icon/jam.svg" alt="" width="16" />
          <DatePicker
            {...input}
            onBlur={input.value}
            selected={input.value ? moment(input.value)._d : null}
            dateFormat="HH:mm"
            onChange={date => input.onChange(date)}
            placeholderText="Jam"
            className="form-control bg-transparent"
            showTimeSelect
            showTimeSelectOnly
            // timeIntervals={1}
            // timeFormat="HH:mm"
            // timeCaption="Time"
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

export default TimeField;
