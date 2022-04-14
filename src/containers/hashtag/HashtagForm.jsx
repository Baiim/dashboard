import {
  createData,
  fetchData as fetchHashtagData,
  readData,
  updateData
} from '@actions/hashtag.action';
import { fetchData as fetchSectorData } from '@actions/sector.action';
import { fetchData as fetchStockData } from '@actions/stock.action';
import {
  inputField,
  required,
  SearchSelectMultiValue
} from '@components/field/Field';
import { get } from 'lodash';
import Router, { withRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Button from 'reactstrap-button-loader';
import { change, Field, reduxForm, reset } from 'redux-form';

const form = 'hashtagForm';
const keys = ['name', 'related_hashtag', 'sector_name', 'stock_name'];

const GroupChatForm = props => {
  const { handleSubmit, router, dispatch: dispatchForm } = props;
  const dispatch = useDispatch();

  const hashtag = useSelector(state => state.hashtag);
  const stock = useSelector(state => state.stock);
  const sector = useSelector(state => state.sector);

  const id = get(router, 'query.id', null);
  const isEdit = !!id;

  useEffect(() => {
    !hashtag.data.length && dispatch(fetchHashtagData());
    !stock.data.length && dispatch(fetchStockData());
    !sector.data.length && dispatch(fetchSectorData());
    isEdit && dispatch(readData(id));
  }, []);

  useEffect(() => {
    if (isEdit) {
      keys.map(key => {
        dispatchForm(
          change(form, key, get(hashtag, `dataDetail.${key}`, null))
        );
        return null;
      });
    }
  }, [hashtag.dataDetail?.id]);

  const onSubmit = value => {
    const submit = {
      name: value.name,
      related_hashtag: value.related_hashtag?.map(e => e.id),
      stock: value.stock_name?.map(e => e.id),
      sector: value.sector_name?.map(e => e.name)
    };
    dispatch(isEdit ? updateData(submit, id) : createData(submit)).then(() => {
      dispatchForm(reset(form));
      Router.push('/hashtag');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="wrapper-table">
        <h5 className="text-black mb-5">
          <a href="/hashtag" className="text-secondary">
            Hashtag /
          </a>{' '}
          {isEdit ? 'Edit' : 'Tambah'} Hashtag
        </h5>
        <Row>
          <Col md={4}>
            <Field
              name="name"
              type="text"
              label="Nama Hashtag"
              placeholder="Masukkan nama hashtag"
              required
              component={inputField}
              validate={[required]}
            />
          </Col>
        </Row>
        <div className="divider mb-4" />
        <Row>
          <Col md={4}>
            <Field
              name="related_hashtag"
              label="Related Hashtags"
              component={SearchSelectMultiValue}
              onChangeText={text =>
                dispatch(fetchHashtagData({ search: text }))
              }
              searchData={hashtag.data}
              placeholder="Masukkan Nama Related Hashtag"
              required
              validate={[required]}
            />
          </Col>
          <Col md={4}>
            <Field
              name="sector_name"
              label="Sector"
              component={SearchSelectMultiValue}
              onChangeText={text => dispatch(fetchSectorData({ search: text }))}
              searchData={sector.data}
              placeholder="Masukkan Nama Sector"
              required
              validate={[required]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Field
              name="stock_name"
              label="Saham"
              component={SearchSelectMultiValue}
              onChangeText={text => dispatch(fetchStockData({ search: text }))}
              searchData={stock.data}
              placeholder="Masukkan Nama saham"
              required
              validate={[required]}
            />
          </Col>
        </Row>

        <Button
          type="submit"
          color="danger"
          className="mt-5 mb-3"
          loading={hashtag.isLoadingSubmit}
          style={{ padding: '0.6rem 3.5rem' }}
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({ form })(withRouter(GroupChatForm));
