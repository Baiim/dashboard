import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { get } from 'lodash';
import { Field, reduxForm, change, reset } from 'redux-form';
import moment from 'moment';
import { Row, Col } from 'reactstrap';
import Button from 'reactstrap-button-loader';
import { createData, readDetail, updateData } from '@actions/article.action';
import {
  required,
  inputField,
  radioField,
  SearchSelectMultiValue
} from '@components/field/Field';
import DateField from '@components/field/DateField';
import FieldDropzone from '@components/field/FieldDropzone';
import DelayedTinyMce from '@components/field/DelayedTinyMce';
import TinyMce from '@components/field/TinyMce';
import { fetchData as fetchHashtagData } from '@actions/hashtag.action';
import { fetchData as fetchStockData } from '@actions/stock.action';

const form = 'artikelForm';

const ArtikelForm = props => {
  const { handleSubmit, router } = props;
  const dispatch = useDispatch();
  const data = useSelector(state => state.article);
  const dataFile = useSelector(state => state.file);
  const hashtag = useSelector(state => state.hashtag);
  const stock = useSelector(state => state.stock);

  const detail = get(data, 'dataDetail');
  const id = get(router, 'query.id', null);
  const isLoadingFile = get(dataFile, 'isUploadingFile.image_article');
  const isEdit = !!id;

  const [banner, setBanner] = useState(null);

  useEffect(() => {
    if (isEdit) {
      dispatch(readDetail(id));
    }
    dispatch(fetchHashtagData());
    dispatch(fetchStockData());
  }, []);

  useEffect(() => {
    if (isEdit && detail) {
      dispatch(change(form, 'title', get(detail, 'title')));
      dispatch(change(form, 'description', get(detail, 'description')));
      dispatch(change(form, 'date_publish', get(detail, 'date_publish')));
      dispatch(change(form, 'status', get(detail, 'status')));
      dispatch(change(form, 'hashtag', get(detail, 'hashtag')));
      dispatch(change(form, 'stock', get(detail, 'stock')));

      setBanner(get(detail, 'image_path'));
    }
  }, [data.dataDetail]);

  const onSubmit = values => {
    let imageId = null;

    if (dataFile.file.image_article) {
      imageId = dataFile.file.image_article.id;
    } else {
      imageId = get(detail, 'image_id');
    }
    const submit = {
      title: values.title,
      description: values.description,
      date_publish: moment(values.date_publish).format('YYYY-MM-DD'),
      image_id: imageId,
      status: values.status,
      hashtag: values.hashtag?.map(e => e.name),
      stock: values.stock?.map(e => e.name)
    };

    dispatch(isEdit ? updateData(submit, id) : createData(submit)).then(() => {
      Router.push('/article');
    });
  };

  const status = [
    { label: 'Publish', value: 'publish' },
    { label: 'Draft', value: 'draf' }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="wrapper-table">
        <h5 className="mb-5">
          <a href="/article/add" className="text-secondary">
            Artikel /
          </a>{' '}
          {isEdit ? 'Edit' : 'Tambah'} Artikel
        </h5>
        <Row>
          <Col md="9">
            <Field
              name="title"
              type="text"
              label="Judul Berita"
              component={inputField}
              placeholder="Tulis disini"
              validate={[required]}
            />
            <DelayedTinyMce waitBeforeShow={isEdit ? 3000 : 0}>
              <Suspense fallback="">
                <Field
                  name="description"
                  type="text"
                  label="Deskripsi"
                  component={TinyMce}
                  validate={[required]}
                />
              </Suspense>
            </DelayedTinyMce>
          </Col>
          <Col md="3">
            <Field
              name="date_publish"
              label="Tanggal Terbit"
              component={DateField}
              placeholder="Pilih Tanggal"
              validate={[required]}
            />
            {banner && (
              <div className="form-group">
                <label htmlFor="banner">Banner</label>
                <div className="text-center">
                  <img src={banner} alt="" style={{ maxHeight: 150 }} />
                </div>
              </div>
            )}
            <Field
              name="image_article"
              component={FieldDropzone}
              label={`${isEdit ? 'Ubah' : 'Unggah'} Banner`}
              onChange={val => setBanner(URL.createObjectURL(val))}
              validate={!banner && [required]}
            />
            <Field
              name="status"
              label="Status"
              component={radioField}
              options={status}
              classInput="d-flex align-items-center justify-content-center"
              classLabel="w-100 text-center"
              validate={[required]}
            />
            <Field
              name="hashtag"
              label="Hashtags"
              component={SearchSelectMultiValue}
              searchData={hashtag.data}
              onChangeText={text =>
                dispatch(fetchHashtagData({ search: text }))
              }
              classInput="d-flex align-items-center justify-content-center"
              classLabel="w-100 text-center"
              // validate={[required]}
              placeholder="Masukkan Hashtag"
            />
            <Field
              name="stock"
              label="Saham"
              component={SearchSelectMultiValue}
              searchData={stock.data}
              onChangeText={text => dispatch(fetchStockData({ search: text }))}
              classInput="d-flex align-items-center justify-content-center"
              classLabel="w-100 text-center"
              // validate={[required]}
              placeholder="Masukkan Saham"
            />
          </Col>
        </Row>

        <Button
          type="submit"
          color="danger"
          className="mt-5 mb-3"
          loading={data.isLoadingSubmit}
          disabled={isLoadingFile}
          style={{ padding: '0.6rem 3.5rem' }}
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({ form })(withRouter(ArtikelForm));
