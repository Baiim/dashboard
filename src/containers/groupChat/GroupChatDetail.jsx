/* eslint-disable camelcase */
/* eslint-disable global-require */
import React, { useEffect } from 'react';
import Button from 'reactstrap-button-loader';
import { readData } from '@actions/groupChat.action';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { get } from 'lodash';
import { formatterNumber } from '@helpers/price';

const GroupChatDetail = props => {
  const { Router } = props;
  const dispatch = useDispatch();
  const data = useSelector(state => state.groupChat.dataDetail);
  const id = get(Router, 'router.query.id', null);

  useEffect(() => {
    dispatch(readData(id));
  }, []);

  return (
    <div className="mt-2">
      <div className="col-5 mb-2 pb-4" style={{ color: 'white' }}>
        <h5>
          <a href="/group-chat" className="text-secondary">
            Group Chat /
          </a>{' '}
          {data?.name || '-'}
        </h5>
      </div>
      <Row className="px-3">
        <div className="col-9">
          <Row>
            <div className="col-3 d-flex justify-content-center">
              <img
                src={data?.image_url || require('@images/image-thumbnail.png')}
                alt="client"
                className="image-detail"
              />
            </div>
            <div className="col-9">
              <Row className="mb-3">
                <div className="col-4 text-secondary">Nama Group Chat</div>
                <div className="col-8 text-white">{data?.name || '-'}</div>
              </Row>
              <Row className="mb-3">
                <div className="col-4 text-secondary">Deskripsi</div>
                <div className="col-8 text-white">
                  {data?.description || '-'}
                </div>
              </Row>
              <Row className="mb-3">
                <div className="col-4 text-secondary">Harga / periode</div>
                <div className="col-8 text-white">
                  {data?.detail_prices.map((data, index) => (
                    <p className="mb-1">
                      Rp {formatterNumber(data.price)}
                      {' / '}
                      {index < 3 ? `${index + 1} Bulan` : '1 Tahun'}
                    </p>
                  ))}
                </div>
              </Row>
            </div>
          </Row>
        </div>
        <div className="col-3 mx-auto">
          <Button
            className="btn px-5 btn-danger"
            onClick={() => Router.push(`/group-chat/${id}/edit`)}
          >
            Ubah
          </Button>
        </div>
      </Row>
    </div>
  );
};

export default GroupChatDetail;
