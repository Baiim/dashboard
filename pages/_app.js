/* eslint-disable react/react-in-jsx-scope */
import '@styles/fontawesome.min.css';
import '@styles/main.scss';
import '@styles/animate.min.css';
import '@styles/nprogress.css';
import '@styles/demo/demo.css';
import '@styles/demo/nucleo-icons-page-styles.css';

// import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { DefaultSeo } from 'next-seo';
import Router from 'next/router';
import NProgress from 'nprogress';
import { appWithTranslation } from '@helpers/i18n';
import { isAuth } from '@helpers/token';
import { initStore } from '../src/store/store';
// import { GET_ROLE } from '../src/store/reducers/admin.reducer';
// import authUsecase from '../src/app/usecases/auth.usecase';

NProgress.configure({ showSpinner: true });

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { originalUrl } = ctx.req || {};
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
      originalUrl
    };
  }

  componentDidMount() {
    const { router } = this.props;
    if (!isAuth()) {
      router.replace('/login');
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <DefaultSeo
          title="Saham Rakyat Dashboard"
          description="Saham Rakyat Dashboard"
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: '',
            site_name: ''
          }}
        />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default withRedux(initStore)(appWithTranslation(MyApp));
