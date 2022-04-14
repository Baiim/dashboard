import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';
import { readDetail } from '@actions/article.action';

const ArtikelDetail = props => {
  const { Router, router } = props;
  const dispatch = useDispatch();
  const data = useSelector(state => state.article.dataDetail);
  const id = get(router, 'query.id', null);

  useEffect(() => {
    dispatch(readDetail(id));
  }, []);

  const datePublish = get(data, 'date_publish');

  return (
    <div className="wrapper-table">
      <h5 className="text-black mb-5">
        <a href="/article" className="text-secondary">
          Artikel
        </a>{' '}
        / {get(data, 'title')}
      </h5>
      <div className="card mt-4">
        <div className="card-body">
          <div className="w-60 mx-auto">
            <h3>{get(data, 'title')}</h3>
            <div className="d-flex align-items-center justify-content-between my-4">
              <div className="d-flex align-items-center">
                <img src="/images/icon/calendar.svg" alt="" width="20" />
                <small className="ml-1 mr-3">
                  {datePublish &&
                    moment(datePublish)
                      .locale('id')
                      .format('LL')}
                </small>
                <img src="/images/icon/published.svg" alt="" width="20" />
                <small className="ml-1">Published</small>
              </div>
              <div className="d-flex align-items-center">
                <img src="/images/icon/comment.svg" alt="" width="20" />
                <small className="ml-1 mr-2">
                  {get(data, 'comment_count')}
                </small>
              </div>
            </div>
            <div className="text-center">
              <img
                src={get(data, 'image_path')}
                alt=""
                className="img-fluid mb-4"
                style={{ maxHeight: 300 }}
              />
            </div>
            <div
              className="custom-dangerous"
              dangerouslySetInnerHTML={{ __html: get(data, 'description') }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtikelDetail;
