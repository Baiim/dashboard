import React from 'react';
import loginBG from '@images/bg-login.png';

const LoginLeft = () => {
  return (
    <div
      className="d-flex"
      style={{
        height: '100vh',
        backgroundImage: `url(${loginBG})`,
        backgroundSize: '100% 100%'
      }}
    >
      <div className="mx-5 my-auto text-white">
        <h1 className="font-weight-bold mb-4">Selamat Datang Kembali!</h1>
        <p>Untuk tetap terhubung dengan kami, harap masuk dengan akun Anda.</p>
      </div>
    </div>
  );
};

export default LoginLeft;
