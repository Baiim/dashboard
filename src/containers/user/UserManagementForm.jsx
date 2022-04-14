import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { change, Field, reduxForm } from 'redux-form';
import Swal from 'sweetalert2';
import Button from 'reactstrap-button-loader';
import {
  required,
  emailValid,
  inputField,
  selectField,
  minLength8,
  passwordMatch
} from '@components/field/Field';
import PasswordField from '@components/field/PasswordField';
import { getRole } from '@actions/admin.action';
import { createData, readDetail, updateData } from '@actions/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { encryptAes } from '@helpers/handleCrypto';

const form = 'userForm';

const User = props => {
  const { handleSubmit, router } = props;
  const userId = router.query.id;

  const dispatch = useDispatch();
  const data = useSelector(state => state.user);
  const roles = useSelector(state => state.admin.roles);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (userId) {
      dispatch(readDetail(userId));
    }
    dispatch(getRole());
  }, []);

  useEffect(() => {
    if (data.dataDetail && userId) {
      dispatch(change(form, 'name', data.dataDetail.name));
      dispatch(change(form, 'role_id', data.dataDetail.role_id));
      dispatch(change(form, 'email', data.dataDetail.email));
      dispatch(change(form, 'password', data.dataDetail.password));
      dispatch(change(form, 'konfirmasi_password', data.dataDetail.password));
    }
    if (roles.length > 0) {
      const opt = roles.reduce((acc, data) => {
        acc.push({ label: data.name, value: data.id });
        return acc;
      }, []);
      setOptions(opt);
    }
  }, [data.dataDetail, roles]);

  const onSubmit = values => {
    if (values.password !== values.konfirmasi_password) {
      Swal.fire({
        title: 'Error',
        text: 'Password tidak sama!',
        icon: 'error'
      });
    } else {
      const submit = {
        name: values.name,
        email: values.email,
        password: encryptAes(values.password),
        role_id: values.role_id.value || values.role_id,
        status: true
      };
      dispatch(userId ? updateData(submit, userId) : createData(submit)).then(
        () => {
          router.push('/user-management');
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="wrapper-table">
        <h5 className="text-white mb-5">
          <a href="/user-management" className="text-secondary">
            List User Management /
          </a>{' '}
          {userId ? 'Edit' : 'Tambah'} Admin
        </h5>
        <div className="row">
          <div className="col-md-5 mr-5">
            <Field
              name="name"
              type="text"
              label="Username"
              placeholder="Masukkan Username"
              component={inputField}
              validate={[required]}
            />
            <Field
              name="role_id"
              label="Role"
              component={selectField}
              options={options}
              searchable={false}
              validate={[required]}
            />
            <Field
              name="email"
              type="email"
              label="Email"
              placeholder="Masukkan Email"
              component={inputField}
              validate={[required, emailValid]}
            />
          </div>
          <div className="col-md-5">
            <Field
              name="password"
              label="Password"
              placeholder="Masukkan Password"
              component={PasswordField}
              validate={[required, minLength8]}
            />
            <Field
              name="konfirmasi_password"
              label="Konfirmasi Password"
              placeholder="Masukkan Konfirmasi Password"
              component={PasswordField}
              validate={[required, passwordMatch]}
            />
          </div>
        </div>
        <Button
          type="submit"
          color="danger"
          className="mt-5"
          loading={data.isLoadingSubmit}
          style={{ padding: '0.6rem 3.5rem' }}
        >
          Kirim
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({ form })(withRouter(User));
