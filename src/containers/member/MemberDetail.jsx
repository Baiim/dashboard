import { readData } from '@actions/member.action';
import { withRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MemberDetail = props => {
  const { router } = props;
  const dispatch = useDispatch();
  const data = useSelector(state => state.member);
  const detail = data.dataDetail;

  useEffect(() => {
    dispatch(readData(router.query.id));
  }, []);

  return (
    detail && (
      <div className="wrapper-table">
        <div className="d-flex align-items-center justify-content-between w-100 mb-4">
          <h5 className="mb-0 text-muted">
            <a href="/member" className="text-secondary">
              Daftar Member
            </a>{' '}
            / <span className="font-weight-semibold">{detail.name}</span>
          </h5>
          {/* <button
          className="btn btn-danger font-weight-semibold br-8 px-4 py-2"
          onClick={() => Router.push(`member/${router.query.id}/detail`)}
        >
          Ubah
        </button> */}
        </div>
        <div className="d-flex pt-5">
          <div className="mr-3" style={{ width: 200 }}>
            <img
              src={detail.profile_photo_path || '/images/404.png'}
              alt=""
              className="img-fluid"
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="ml-4">
            <div className="d-flex mb-3">
              <div className="text-muted" style={{ width: 200 }}>
                Nama Member
              </div>
              <span>{detail.name}</span>
            </div>
            <div className="d-flex mb-3">
              <div className="text-muted" style={{ width: 200 }}>
                Email
              </div>
              <span>{detail.email}</span>
            </div>
            <div className="d-flex">
              <div className="text-muted" style={{ width: 200 }}>
                Status
              </div>
              <span>{detail.status ? 'Aktif' : 'Tidak aktif'}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default withRouter(MemberDetail);
