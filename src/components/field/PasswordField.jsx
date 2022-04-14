import React, { Component } from 'react';

class PasswordField extends Component {
  state = {
    type: 'password'
  };

  handleClick = () => {
    const { type } = this.state;

    if (type === 'password') {
      this.setState({ type: 'text' });
    } else {
      this.setState({ type: 'password' });
    }
  };

  render() {
    const { type } = this.state;
    const {
      input,
      label,
      className,
      classLabel,
      placeholder,
      required,
      disabled,
      meta: { touched, error, warning }
    } = this.props;

    return (
      <div className={`form-group ${className}`}>
        {label && (
          <label htmlFor={input.name} className={classLabel}>
            {label}
            {required && <span className="form-error"> *</span>}
          </label>
        )}
        <div className={`input-group ${touched && error ? 'focus-error' : ''}`}>
          <div className="input-group-prepend">
            <span className="input-group-text" id={input.name}>
              <img src="/images/icon/password.png" alt="" />
            </span>
          </div>
          <input
            {...input}
            id={input.name}
            type={type}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby={input.name}
            className={`form-control ${touched && error ? 'focus-error' : ''}`}
            disabled={disabled}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn bg-transparent"
              onClick={() => this.handleClick()}
              id={input.name}
            >
              <img src="/images/icon/eye.png" alt="" />
            </button>
          </div>
        </div>
        {touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span className="form-error">{warning}</span>))}
      </div>
    );
  }
}

export default PasswordField;
