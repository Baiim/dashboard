import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { get } from 'lodash';
import moment from 'moment';
import Button from 'reactstrap-button-loader';
import { Row, Col } from 'reactstrap';
import { required, inputField } from '@components/field/Field';
import FieldDropzoneImage from '@components/field/FieldDropzoneImage';
import DateField from '@components/field/DateField';
import TimeField from '@components/field/TimeField';
import { createData, updateData, readData } from '@actions/webinar.action';
import { setFile } from '@actions/file.action';

const form = 'WebinarForm';
const keys = [
  'title',
  'speaker',
  'link',
  'cost',
  'meeting_id',
  'passcode',
  'image_path'
];

const WebinarForm = props => {
  const { handleSubmit, Router, dispatch: dispatchForm } = props;
  const dispatch = useDispatch();

  const data = useSelector(state => state.webinar);
  const dataFile = useSelector(state => state.file);

  const detail = get(data, 'dataDetail');
  const id = get(Router, 'router.query.id', null);
  const isLoadingFile = get(dataFile, 'isUploadingFile.image_webinar');
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      dispatch(readData(id));
    }
  }, []);

  useEffect(() => {
    if (isEdit && detail) {
      keys.map(key => {
        dispatchForm(change(form, key, get(detail, key, null)));
        return null;
      });
      dispatch(
        setFile(
          {
            id: get(detail, 'image_id', null),
            temp_url: get(detail, 'image_path', null)
          },
          'image_webinar'
        )
      );
      dispatchForm(change(form, 'date', new Date(get(detail, 'date'))));
      const x = moment(get(detail, 'date')).format('HH:mm');
      dispatchForm(change(form, 'time', moment(x, 'hh:mm')));
    }
  }, [detail]);

  const onSubmit = value => {
    const date = `${moment(value.date).format('YYYY-MM-DD')} ${moment(
      value.time
    ).format('HH:mm')}`;

    const submit = {
      cost: parseInt(value.cost, 10),
      date: moment(date).format(),
      image_id: dataFile.file.image_webinar.id
    };

    Object.keys(value).map(key => {
      if (
        key !== 'time' &&
        key !== 'date' &&
        key !== 'image_path' &&
        key !== 'cost'
      ) {
        submit[key] = value[key];
      }
      return null;
    });

    dispatch(isEdit ? updateData(submit, id) : createData(submit)).then(() => {
      Router.push('/webinar');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="wrapper-table">
        <h5 className="text-white mb-5">
          <a href="/webinar" className="text-secondary">
            List Webinar /
          </a>{' '}
          {isEdit ? 'Edit' : 'Tambah'} Webinar
        </h5>
        <Row>
          <Col md="4">
            <Field
              name="title"
              type="text"
              label="Judul"
              placeholder="Masukkan judul"
              component={inputField}
              validate={[required]}
            />
            <Field
              name="speaker"
              type="text"
              label="Pembicara"
              placeholder="Masukkan pembicara"
              component={inputField}
              validate={[required]}
            />
            <Field
              name="image_path"
              label="Banner Webinar"
              component={FieldDropzoneImage}
              type="image_webinar"
              validate={[required]}
            />
          </Col>
          <Col md="4">
            <Field
              name="cost"
              type="text"
              label="Biaya"
              placeholder="Masukkan biaya"
              component={inputField}
              validate={[required]}
            />
            <Field
              name="link"
              type="text"
              label="Link"
              placeholder="Masukkan link"
              component={inputField}
              validate={[required]}
            />
            <Field
              name="meeting_id"
              type="text"
              label="Meeting ID"
              placeholder="Masukkan Meeting ID"
              component={inputField}
              validate={[required]}
            />
            <Field
              name="passcode"
              type="text"
              label="Passcode"
              placeholder="Masukkan Passcode"
              component={inputField}
              validate={[required]}
            />
            <label htmlFor="date" style={{ color: '#B2B2B2' }}>
              Waktu Pelaksanaan Webinar
            </label>
            <div className="row">
              <div className="col-6">
                <Field
                  name="date"
                  noLabel
                  component={DateField}
                  validate={[required]}
                />
              </div>
              <div className="col-5">
                <Field
                  name="time"
                  noLabel
                  component={TimeField}
                  validate={[required]}
                />
              </div>
            </div>
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

export default reduxForm({ form })(WebinarForm);
