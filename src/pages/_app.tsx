import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Provider } from 'react-redux';
import store from '@/store';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Home Essentials</title>
          <meta property="og:title" content="Home Essentials" key="title" />
          <meta
            name="description"
            content="Discover a wide range of household items to enhance your living
            space"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
