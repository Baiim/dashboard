import { createData, readData, updateData } from '@actions/faq.action';
import { required, textAreaField } from '@components/field/Field';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Input, Label } from 'reactstrap';
import Button from 'reactstrap-button-loader';
import { change, Field, reduxForm, reset } from 'redux-form';

const form = 'FaqForm';
const keys = ['question', 'answer'];

const Faq = props => {
  const { handleSubmit, Router } = props;
  const dispatch = useDispatch();
  const data = useSelector(state => state.faq);
  const id = get(Router, 'router.query.id', null);
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      dispatch(readData(id));
    }
  }, []);

  useEffect(() => {
    isEdit &&
      keys.map(key =>
        dispatch(change(form, key, get(data, `dataDetail.${key}`, null)))
      );
  }, [data.dataDetail]);

  const onSubmit = value => {
    const submit = {
      question: value.question,
      answer: value.answer
    };
    dispatch(isEdit ? updateData(submit, id) : createData(submit)).then(() => {
      dispatch(reset(form));
      Router.push('/faq');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="wrapper-table">
        <h5 className="mb-5">
          <a href="/faq" className="text-secondary">
            FAQ /
          </a>{' '}
          {isEdit ? 'Edit' : 'Tambah'} FAQ
        </h5>
        <div className="w-75">
          <Field
            name="question"
            type="text"
            label="Pertanyaan"
            placeholder="Tulis disini ..."
            rows="5"
            component={textAreaField}
            validate={[required]}
          />
          <Field
            name="answer"
            type="text"
            label="Jawaban"
            rows="5"
            placeholder="Tulis disini ..."
            component={textAreaField}
            validate={[required]}
          />
          <div className="form-group">
            <label htmlFor="category_topic">Kategori Topik</label>
            <ReactSearchAutocomplete
              styling={{
                boxShadow: 'none',
                borderRadius: '5px',
                zIndex: 999,
                height: '38px',
                border: '1px solid #adb5bd'
              }}
              // placeholder={placeholder}
              // showIcon={false}
              // inputSearchString={searchText}
              // onSearch={setSearchText}
              // onSelect={handleSelectSearchItem}
              // items={searchData}
            />
          </div>
          <div className="form-group" style={{ marginLeft: 20 }}>
            <Label check>
              <Input type="checkbox" /> Check me out
            </Label>
          </div>
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
      </div>
    </form>
  );
};

export default reduxForm({ form })(Faq);
