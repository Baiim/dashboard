import React, { useEffect } from 'react';
import Button from 'reactstrap-button-loader';
import { readData } from '@actions/webinar.action';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { get } from 'lodash';
import { formatterNumber } from '@helpers/price';

const ArtikelTanggapan = props => {
  const { Router } = props;
  const dispatch = useDispatch();
  const data = useSelector(state => state.webinar.dataDetail);
  const id = get(Router, 'router.query.id', null);

  useEffect(() => {
    dispatch(readData(id));
  }, []);

  return (
    <div className="mt-2">
      <div className="col-5 mb-2 pb-4" style={{ color: 'white' }}>
        <h5>
          <a href="/article" className="text-secondary">
            Artikel /
          </a>{' '}
          {data?.name || '-'}
        </h5>
        <h5>Tanggapan</h5>
      </div>
      <div className="card" style={{ backgroundColor: '#322e2e' }}>
        <Row>
          <div className="col-md-6">
            <div className="d-flex mt-2">
              <i className="far fa-comment-alt text-white px-3 py-1" />
              <p className="text-white font-weight-bold mb-2">
                Tanggapan (120)
              </p>
            </div>
          </div>
        </Row>
        <div className="px-3">
          <hr
            style={{
              border: '.10px solid #C4C4C4'
            }}
          />
        </div>
        <Row>
          <div className="col-md-12 d-flex">
            <div className="col-md-6">
              <p className="text-left text-white">Jane Cooper</p>
            </div>
            <div className="col-md-6">
              <p className="text-right text-white">12 May 2020</p>
            </div>
          </div>

          <div className="col-md-12 ">
            <p className="text-white text-justify px-3">
              It seems like every other week a new study comes out questioning
              long-held wisdom about food and nutrition. First fat was vilified;
              now it’s considered a part of a healthyet.
            </p>
          </div>
        </Row>
        <div className="px-3">
          <hr
            style={{
              border: '.10px solid #C4C4C4'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArtikelTanggapan;
