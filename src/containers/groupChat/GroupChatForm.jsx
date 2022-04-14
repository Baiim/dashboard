import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, change, reset } from 'redux-form';
import Router, { withRouter } from 'next/router';
import { get } from 'lodash';
import { Row, Col } from 'reactstrap';
import Button from 'reactstrap-button-loader';
import {
  required,
  inputField,
  textAreaField,
  inputGroupField
} from '@components/field/Field';
import FieldDropzoneImage from '@components/field/FieldDropzoneImage';
import { createData, updateData, readData } from '@actions/groupChat.action';
import { setFile } from '@actions/file.action';
import { formatCurrency, normalizeCurrency } from '@helpers/formMasker';

const form = 'groupChatForm';
const keys = ['name', 'description', 'image_url'];

const GroupChatForm = props => {
  const { handleSubmit, router, dispatch: dispatchForm } = props;
  const dispatch = useDispatch();

  const data = useSelector(state => state.groupChat);
  const dataFile = useSelector(state => state.file);
  const currentAdmin = useSelector(state => state.admin.dataCurrent);

  const id = get(router, 'query.id', null);
  const isEdit = !!id;

  useEffect(() => {
    isEdit && dispatch(readData(id));
  }, []);

  useEffect(() => {
    if (isEdit) {
      keys.map(key => {
        dispatchForm(change(form, key, get(data, `dataDetail.${key}`, null)));
        return null;
      });

      dispatchForm(
        change(
          form,
          '30days',
          get(data, 'dataDetail.detail_prices[0].price', null)
        )
      );
      dispatchForm(
        change(
          form,
          '90days',
          get(data, 'dataDetail.detail_prices[1].price', null)
        )
      );
      dispatchForm(
        change(
          form,
          '180days',
          get(data, 'dataDetail.detail_prices[2].price', null)
        )
      );
      dispatchForm(
        change(
          form,
          '365days',
          get(data, 'dataDetail.detail_prices[3].price', null)
        )
      );

      dispatchForm(
        setFile(
          {
            id: get(data, 'dataDetail.image_id', null),
            temp_url: get(data, 'dataDetail.image_url', null)
          },
          'group_chat'
        )
      );
    }
  }, [data.dataDetail]);

  const onSubmit = value => {
    const submit = {
      name: value.name,
      description: value.description,
      image_id: dataFile.file.group_chat?.id,
      admin_id: currentAdmin.id,
      replyable: true,
      status: 'active',
      detail_prices: [
        {
          days: 30,
          price: value['30days']
        },
        {
          days: 90,
          price: value['90days']
        },
        {
          days: 180,
          price: value['180days']
        },
        {
          days: 365,
          price: value['365days']
        }
      ]
    };

    dispatch(isEdit ? updateData(submit, id) : createData(submit)).then(() => {
      dispatchForm(reset(form));
      Router.push('/group-chat');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="wrapper-table">
        <h5 className="text-white mb-5">
          <a href="/group-chat" className="text-secondary">
            Group Chat /
          </a>{' '}
          {isEdit ? 'Edit' : 'Tambah'} Group Chat
        </h5>
        <Row>
          <Col md="4">
            <Field
              name="name"
              type="text"
              label="Nama Group Chat"
              placeholder="Masukkan nama group chat"
              component={inputField}
              validate={[required]}
            />
            <Field
              name="image_url"
              type="group_chat"
              label="Group Chat"
              component={FieldDropzoneImage}
            />
            <Field
              name="description"
              type="text"
              label="Deskripsi"
              rows={5}
              placeholder="Masukkan deskripsi"
              component={textAreaField}
              validate={[required]}
            />
          </Col>
          <Col md="4">
            <Field
              name="30days"
              type="text"
              label="Harga / Periode"
              prepend="1 Bulan"
              placeholder="Rp 0"
              component={inputGroupField}
              validate={[required]}
              format={formatCurrency}
              normalize={normalizeCurrency}
            />
            <Field
              name="90days"
              type="text"
              prepend="3 Bulan"
              placeholder="Rp 0"
              component={inputGroupField}
              validate={[required]}
              format={formatCurrency}
              normalize={normalizeCurrency}
            />
            <Field
              name="180days"
              type="text"
              prepend="6 Bulan"
              placeholder="Rp 0"
              component={inputGroupField}
              validate={[required]}
              format={formatCurrency}
              normalize={normalizeCurrency}
            />
            <Field
              name="365days"
              type="text"
              prepend="1 tahun"
              placeholder="Rp 0"
              component={inputGroupField}
              validate={[required]}
              format={formatCurrency}
              normalize={normalizeCurrency}
            />
          </Col>
        </Row>

        <Button
          type="submit"
          color="danger"
          className="mt-5 mb-3"
          loading={data.isLoadingSubmit}
          style={{ padding: '0.6rem 3.5rem' }}
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({ form })(withRouter(GroupChatForm));
