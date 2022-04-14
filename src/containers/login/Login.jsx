import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { UncontrolledAlert } from 'reactstrap';
import Button from 'reactstrap-button-loader';
import { required, emailValid, inputGroupField } from '@components/field/Field';
import PasswordField from '@components/field/PasswordField';
import { loginUser } from '@actions/auth.action';
import { encryptAes } from '@helpers/handleCrypto';
import LoginLeft from './LoginLeft';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = value => {
    const { loginUser } = this.props;
    const form = {
      email: value.email,
      password: encryptAes(value.password)
    };
    loginUser(form);
  };

  render() {
    const { handleSubmit, data } = this.props;

    return (
      <div className="row m-0" style={{ backgroundColor: '#1F1C1C' }}>
        <div className="col-md-4 p-0">
          <LoginLeft />
        </div>
        <div className="col-md-8">
          <div className="d-flex justify-center h-100">
            <div className="w-50 m-auto">
              <div className="text-center">
                <img
                  src="/images/saham-rakyat.png"
                  alt=""
                  className="img-fluid"
                />
                <h2
                  className="font-weight-bold my-5"
                  style={{ color: '#D9D9D9' }}
                >
                  Silahkan Masuk
                </h2>
              </div>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                {data.errorMessage && (
                  <UncontrolledAlert
                    color="danger"
                    className="mt-3"
                    style={{
                      color: '#fff',
                      background: '#d64d37',
                      borderRadius: '5px'
                    }}
                  >
                    <p style={{ margin: '0.05rem 0' }}>{data.errorMessage}</p>
                  </UncontrolledAlert>
                )}
                <Field
                  name="email"
                  type="text"
                  placeholder="Email"
                  component={inputGroupField}
                  prepend={<img src="/images/icon/email.png" alt="" />}
                  validate={[required, emailValid]}
                />
                <Field
                  name="password"
                  placeholder="Password"
                  component={PasswordField}
                  validate={[required]}
                />
                <Button
                  type="submit"
                  color="danger"
                  className="font-weight-bold mt-3 mb-5 br-8 w-100"
                  style={{ padding: '0.75rem 0' }}
                  loading={data.isLoading}
                >
                  Masuk
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.auth
});

const mapDispatchToProps = {
  loginUser
};

export default reduxForm({ form: 'LoginForm' })(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
